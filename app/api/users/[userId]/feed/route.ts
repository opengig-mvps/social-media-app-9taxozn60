import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = parseInt(params.userId, 10);
    if (isNaN(userId)) {
      return NextResponse.json({ success: false, message: 'Invalid user ID' }, { status: 400 });
    }

    const followingUsers = await prisma.follow.findMany({
      where: { followerId: userId },
      select: {
        followingId: true,
      },
    });

    const followingUserIds = followingUsers.map((follow) => follow.followingId);

    const posts = await prisma.post.findMany({
      where: {
        authorId: { in: followingUserIds },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                username: true,
              },
            },
          },
        },
      },
    });

    const formattedPosts = posts.map((post) => ({
      id: post.id,
      author: post.author,
      content: post.content,
      comments: post.comments.map((comment) => ({
        id: comment.id,
        author: comment.author,
        content: comment.content,
        createdAt: comment.createdAt.toISOString(),
      })),
      createdAt: post.createdAt.toISOString(),
    }));

    return NextResponse.json({
      success: true,
      message: 'Feed fetched successfully!',
      data: formattedPosts,
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error fetching feed:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}