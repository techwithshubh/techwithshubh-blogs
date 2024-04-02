import { getAllPosts } from "@/lib/posts";
import { PostPreview } from "../components/posts/PostPreview";
import { Post } from "@/interfaces/post";
import { Subscription } from "../components/Subscription";

export default function Home() {
  const allPosts: Post[] = getAllPosts();

  return (
    <>
      <Subscription />
      <section className="bg-white">
        <div className="mx-auto py-12 max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <p className="font-medium text-lg">
            I create <span className="text-soft-blue">courses</span>,{" "}
            <span className="text-soft-blue">resources</span>, and{" "}
            <span className="text-soft-blue">articles </span>
            delving into advanced web development and Gen AI concepts. From
            deciphering the{" "}
            <span className="text-soft-blue">12 Factor App</span> to mastering
            Frontend and Backend system design, uncovering{" "}
            <span className="text-soft-blue">Cloud Design Patterns</span>, and
            exploring{" "}
            <span className="text-soft-blue">RAG in Generative AI</span>, join
            me in pushing the boundaries of tech.
          </p>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-bold text-2xl">Recent articles and posts</h2>
          <a href="#" className="text-soft-blue flex items-center gap-1">
            <span>view all</span>
            <svg
              className="h-4 w-4 fill-soft-blue"
              xmlns="http://www.w3.org/2000/svg"
              id="Outline"
              viewBox="0 0 24 24"
              width="512"
              height="512"
            >
              <path d="M18,12h0a2,2,0,0,0-.59-1.4l-4.29-4.3a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L15,11H5a1,1,0,0,0,0,2H15l-3.29,3.29a1,1,0,0,0,1.41,1.42l4.29-4.3A2,2,0,0,0,18,12Z" />
            </svg>
          </a>
          <div className="py-4 sm:py-6 lg-py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
              {allPosts.map((post: Post) => (
                <PostPreview
                  key={post.slug}
                  title={post.title}
                  date={post.date}
                  slug={post.slug}
                  coverImage={post.coverImage || ""}
                  excerpt={post.excerpt}
                  tags={ post.tags }
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
