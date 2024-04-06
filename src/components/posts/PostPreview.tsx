import Link from "next/link";
import CoverImage from "./CoverImage";
import DateFormatter from "./DateFormatter";
import { Tags } from "./Tags";


type Props = {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  coverImage: string;
  tags: string
};

export function PostPreview({
  title,
  date,
  excerpt,
  coverImage,
  slug,
  tags
}: Props) {
  return (
    <div>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>
      <h3 className="text-xl font-semibold mb-3 leading-snug">
        <Link
          href={`/posts/${slug}`}
          className="hover:underline"
        >
          {title}
        </Link>
      </h3>
      <div className="mb-4">
        <DateFormatter dateString={date} />
      </div>
      <Tags tags={tags} />
      <p className="leading-relaxed mb-4">{excerpt}</p>
    </div>
  );
}