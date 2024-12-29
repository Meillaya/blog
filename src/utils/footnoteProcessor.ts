interface Footnote {
  id: string;
  content: string;
  type: 'text' | 'image' | 'code' | 'math';
}

export function processFootnotes(content: string): Footnote[] {
  const footnoteRegex = /\[\^(\d+)\]:\s*([\s\S]*?)(?=\n\n|\n\[\^|$)/g;
  const footnotes: Footnote[] = [];
  let match;

  while ((match = footnoteRegex.exec(content)) !== null) {
    const [, id, content] = match;
    footnotes.push({
      id,
      content: content.trim(),
      type: detectFootnoteType(content)
    });
  }

  return footnotes;
}

function detectFootnoteType(content: string): Footnote['type'] {
  if (content.startsWith('![')) return 'image';
  if (content.startsWith('```')) return 'code';
  if (content.includes('$$')) return 'math';
  return 'text';
}