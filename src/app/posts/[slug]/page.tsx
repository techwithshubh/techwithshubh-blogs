import CoverImage from "@/components/posts/CoverImage";
import DateFormatter from "@/components/posts/DateFormatter";
import PostBody from "@/components/posts/PostBody";
import { Tags } from "@/components/posts/Tags";
import markdownToHtml from "@/lib/markdownToHtml";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";

type Params = {
  params: {
    slug: string;
  };
};

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

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
