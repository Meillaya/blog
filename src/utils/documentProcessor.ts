import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';

export async function processMarkdown(content: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeKatex)
    .use(rehypeStringify)
    .process(content);

  return String(result);
}

export function extractFootnotes(content: string) {
  const footnoteRegex = /\[\^(\d+)\]:\s*([\s\S]*?)(?=\n\n|\n\[\^|$)/g;
  const footnotes = [];
  let match;

  while ((match = footnoteRegex.exec(content)) !== null) {
    footnotes.push({
      id: match[1],
      content: match[2].trim(),
      type: detectFootnoteType(match[2])
    });
  }

  return footnotes;
}

function detectFootnoteType(content: string) {
  if (content.startsWith('![')) return 'image';
  if (content.startsWith('```')) return 'code';
  if (content.includes('$$')) return 'math';
  return 'text';
}