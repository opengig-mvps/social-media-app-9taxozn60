import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type PostRequestBody = {
  content: string;
};

export async function PATCH(
  request: Request,
  { params }: { params: { userId: string; postId: string } }
) {
  try {
    const userId = parseInt(params.userId, 10);
    const postId = parseInt(params.postId, 10);

    if (isNaN(userId) || isNaN(postId)) {
      return NextResponse.json({ success: false, message: 'Invalid user ID or post ID' }, { status: 400 });
    }

    const body: PostRequestBody = await request.json();
    const { content } = body;

    if (!content) {
      return NextResponse.json({ success: false, message: 'Content is required' }, { status: 400 });
    }

    const post = await prisma.post.findFirst({
      where: { id: postId, authorId: userId },
    });

    if (!post) {
      return NextResponse.json({ success: false, message: 'Post not found or does not belong to user' }, { status: 404 });
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { content },
    });

    return NextResponse.json({
      success: true,
      message: 'Post updated successfully!',
      data: {
        id: updatedPost.id,
        content: updatedPost.content,
        authorId: updatedPost.authorId,
        createdAt: updatedPost.createdAt,
        updatedAt: updatedPost.updatedAt,
      },
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error updating post:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}