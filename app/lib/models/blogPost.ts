import mongoose from "mongoose";
const blogPostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
      type: String,
      default: 'uncategorized',
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
},
    { timestamps: true }
);
const BlogPost = mongoose.models.BlogPost || mongoose.model('blogPost', blogPostSchema);
export default BlogPost;