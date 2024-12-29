import React, { useEffect, useState } from 'react';
import './Footnotes.css';

interface Footnote {
  id: string;
  content: React.ReactNode;
  type: 'text' | 'image' | 'code' | 'math';
}

export const FootnoteContainer: React.FC<{ footnotes: Footnote[] }> = ({ footnotes }) => {
  const [activeFootnote, setActiveFootnote] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveFootnote(entry.target.id.replace('ref-', ''));
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('[data-footnote-ref]').forEach(ref => {
      observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <aside className="footnotes-container">
      {footnotes.map(footnote => (
        <div
          key={footnote.id}
          className={`footnote ${activeFootnote === footnote.id ? 'active' : ''}`}
        >
          {footnote.content}
        </div>
      ))}
    </aside>
  );
};