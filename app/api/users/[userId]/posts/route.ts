import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Define the type for the request body
type PostRequestBody = {
  content: string;
};

// Define the POST method handler for creating a new post
export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    // Validate and parse the userId parameter
    const userId = parseInt(params.userId, 10);
    if (isNaN(userId)) {
      return NextResponse.json({ success: false, message: 'Invalid user ID' }, { status: 400 });
    }

    // Parse the request body
    const body: PostRequestBody = await request.json();

    // Validate the content field
    const { content } = body;
    if (!content) {
      return NextResponse.json({ success: false, message: 'Content cannot be empty' }, { status: 400 });
    }

    // Create a new post associated with the user
    const post = await prisma.post.create({
      data: {
        content,
        authorId: userId,
      },
    });

    // Send a success response with the newly created post object
    return NextResponse.json({
      success: true,
      message: 'Post created successfully!',
      data: {
        id: post.id,
        content: post.content,
        authorId: post.authorId,
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString(),
      },
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating post:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}