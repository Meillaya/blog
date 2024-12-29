import React from 'react';
import { MarkdownRenderer } from '../Markdown/MarkdownRenderer';

interface Props {
  content: string;
  type: 'text' | 'image' | 'code' | 'math';
}

export const FootnoteContent: React.FC<Props> = ({ content, type }) => {
  switch (type) {
    case 'image':
      return <img src={content} alt="" className="footnote-image" />;
    case 'code':
      return (
        <pre className="footnote-code">
          <code>{content}</code>
        </pre>
      );
    case 'math':
      return <div className="footnote-math math-display">{content}</div>;
    default:
      return <MarkdownRenderer content={content} />;
  }
};