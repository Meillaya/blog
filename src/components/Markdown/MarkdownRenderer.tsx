import React from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';

interface Props {
  content: string;
}

export const MarkdownRenderer: React.FC<Props> = ({ content }) => {
  const [html, setHtml] = React.useState('');

  React.useEffect(() => {
    unified()
      .use(remarkParse)
      .use(remarkMath)
      .use(remarkRehype)
      .use(rehypeKatex)
      .use(rehypeStringify)
      .process(content)
      .then((file) => {
        setHtml(String(file));
      });
  }, [content]);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};