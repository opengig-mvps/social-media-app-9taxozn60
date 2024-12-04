import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Define the type for the request body
type CommentRequestBody = {
  content: string;
};

// Define the POST method handler for creating a comment
export async function POST(
  request: Request,
  { params }: { params: { postId: string } }
) {
  try {
    // Validate and parse the postId parameter
    const postId = parseInt(params.postId, 10);
    if (isNaN(postId)) {
      return NextResponse.json({ success: false, message: 'Invalid post ID' }, { status: 400 });
    }

    // Parse the request body
    const body: CommentRequestBody = await request.json();

    // Validate required fields
    const { content } = body;
    if (!content) {
      return NextResponse.json({ success: false, message: 'Content is required' }, { status: 400 });
    }

    // Assume the user is authenticated and we have the userId
    const userId = 1; // Replace with actual userId from authentication context

    // Create the comment
    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        authorId: userId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },
    });

    // Send a success response with the new comment details
    return NextResponse.json({
      success: true,
      message: 'Comment posted successfully!',
      data: {
        id: comment.id,
        author: {
          id: comment.author.id,
          name: comment.author.name,
          username: comment.author.username,
        },
        content: comment.content,
        createdAt: comment.createdAt.toISOString(),
      },
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating comment:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}