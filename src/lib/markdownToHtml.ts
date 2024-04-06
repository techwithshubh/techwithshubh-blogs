import { remark } from "remark";
import parse from "remark-parse";
import html from "remark-html";

export default async function markdownToHtml(markdown: string) {
  const result = await remark().use(parse).use(html).process(markdown);
  return result.toString();
}
