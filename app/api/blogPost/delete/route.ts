
import BlogPost from '@/app/lib/models/blogPost';
import { connect } from '@/app/lib/mongodb/mongoose';
import { currentUser } from '@clerk/nextjs/server';

export const DELETE = async (req) => {
  const user = await currentUser();
  if (!user) return new Response("Bad request", {status: 400})
  try {
    await connect();
    const data = await req?.json();
    if (
      !user.publicMetadata.isAdmin ||
      user.publicMetadata.userMongoId !== data.userId
    ) {
      return new Response('Unauthorized', { status: 401 });
    }
    await BlogPost.findByIdAndDelete(data.postId);
    return new Response('Post deleted', { status: 200 });
  } catch (error) {
    console.log('Error deleting post:', error);
    return new Response('Error deleting post', { status: 500 });
  }
};