export type Post = {
  slug: string;
  title: string;
  date: string;
  coverImage?:string;
  excerpt: string;
  content: string;
  category: string;
  tags:string
};