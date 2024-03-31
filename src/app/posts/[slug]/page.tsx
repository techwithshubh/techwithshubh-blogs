import CoverImage from "@/app/components/posts/CoverImage";
import DateFormatter from "@/app/components/posts/DateFormatter";
import PostBody from "@/app/components/posts/PostBody";
import { Tags } from "@/app/components/posts/Tags";
import markdownToHtml from "@/lib/markdownToHtml";
import { getPostBySlug } from "@/lib/posts";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { notFound } from "next/navigation";


export default async function Post({ params }: Params) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
      <article>
        <h1 className="text-2xl font-semibold">{post.title}</h1>
        <div className="mb-4">
          <DateFormatter dateString={post.date} />
        </div>
        <Tags tags={post.tags} />
        <div className="">
            <PostBody content={content} />
        </div>
      </article>
    </div>
  );
}
