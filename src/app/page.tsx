import { getAllPosts } from "@/lib/posts";
import { PostPreview } from "./components/posts/PostPreview";
import { Post } from "@/interfaces/post";

export default function Home() {
  const allPosts: Post[] = getAllPosts();

  return (
    <>
      <section className="bg-black">
        <div className="p-8 md:p-12 lg:px-16 lg:py-32">
          <div className="mx-auto max-w-screen-lg text-center">
            <h2 className="text-4xl font-bold text-white md:text-3xl">
              Elevate your skills with expert guidance in Web Dev Mastery, Cloud
              Architecture Excellence, and Cutting-Edge Generative AI.
            </h2>

            <p className="hidden text-white sm:mt-4 sm:block">
              Stay ahead in the digital game! Subscribe now to unlock a weekly
              treasure trove of Web Dev mastery, Cloud Architect insights, and
              AI innovation - your roadmap to success in the ever-evolving tech
              landscape!
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-xl">
            <form action="#" className="sm:flex sm:gap-4">
              <div className="sm:flex-1">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full rounded-md border-gray-200 bg-white p-3 text-gray-700 shadow-sm transition focus:border-white focus:outline-none focus:ring focus:ring-yellow-400"
                />
              </div>

              <button
                type="submit"
                className="group mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-pastal-green px-5 py-3 transition focus:outline-none focus:ring focus:ring-yellow-400 sm:mt-0 sm:w-auto"
              >
                <span className="text-sm font-medium text-black">
                  {" "}
                  Subscribe{" "}
                </span>

                <svg
                  className="size-5 rtl:rotate-180 fill-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </section>
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
