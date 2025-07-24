import Link from "next/link";
import { Post } from "../post/[slug]/page";
import Image from "next/image";

export default function PostCard({ post }: { post: Post }) {
  return (
    <>
      <div className="group relative w-full border border-gray-900 hover:border-2 h-[400px] overflow-hidden rounded-lg sm:w-[350px] transition-all">
        <Link href={`/post/${post.slug}`}>
          <div className="pt-6 flex items-center justify-center">
            <Image
              className="rounded-l"
              width={250}
              height={200}
              src={"http://localhost:5035" + post.image}
              alt={""}
            />
          </div>
        </Link>
        <div className="p-3 flex flex-col gap-2">
          <p className="text-lg font-semibold line-clamp-2">{post.title}</p>
          <span className="italic text-sm">{post.category}</span>
          <Link
            href={`/post/${post.slug}`}
            className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2"
          >
            Read article
          </Link>
        </div>
      </div>
    </>
  );
}
