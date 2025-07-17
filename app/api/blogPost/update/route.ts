
import BlogPost from '@/app/lib/models/blogPost';
import { connect } from '@/app/lib/mongodb/mongoose';
import { currentUser } from '@clerk/nextjs/server';
import type { NextRequest } from 'next/server';


export const PUT = async (req: NextRequest) => {
  const user = await currentUser();
  try {
    await connect();
    const data = await req.json();

    if (
      !user ||
      user.publicMetadata.userMongoId !== data.userMongoId ||
      user.publicMetadata.isAdmin !== true
    ) {
      return new Response('Unauthorized', {
        status: 401,
      });
    }

    const newPost = await BlogPost.findByIdAndUpdate(
      data.postId,
      {
        $set: {
          title: data.title,
          content: data.content,
          category: data.category,
        },
      },
      { new: true }
    );

    return new Response(JSON.stringify(newPost), {
      status: 200,
    });
  } catch (error) {
    console.log('Error creating post:', error);
    return new Response('Error creating post', {
      status: 500,
    });
  }
};