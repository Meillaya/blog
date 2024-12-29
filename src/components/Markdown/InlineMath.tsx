import React from 'react';
import katex from 'katex';

interface Props {
  math: string;
}

export const InlineMath: React.FC<Props> = ({ math }) => {
  const html = katex.renderToString(math, {
    displayMode: false,
    throwOnError: false,
  });

  return (
    <span 
      className="math-inline" 
      dangerouslySetInnerHTML={{ __html: html }} 
    />
  );
};