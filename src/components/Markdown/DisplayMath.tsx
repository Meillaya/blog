import React from 'react';
import katex from 'katex';

interface Props {
  math: string;
}

export const DisplayMath: React.FC<Props> = ({ math }) => {
  const html = katex.renderToString(math, {
    displayMode: true,
    throwOnError: false,
  });

  return (
    <div 
      className="math-display" 
      dangerouslySetInnerHTML={{ __html: html }} 
    />
  );
};