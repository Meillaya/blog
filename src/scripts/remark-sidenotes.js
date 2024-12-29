// scripts/remark-sidenotes.js
import { visit } from 'unist-util-visit';
import { h } from 'hastscript';

function remarkSidenotes() {
  console.log("remarkSidenotes plugin is running!");
  return (tree) => {
    console.log("visit function is running!");
    visit(tree, 'paragraph', (node) => {
       console.log("Visiting a paragraph node");
      const children = [];
      let currentText = '';

      for (const child of node.children) {
        if (child.type === 'text') {
          const parts = child.value.split(/(\(\([^)]+\)\))/g);
          for (const part of parts) {
            if (part.startsWith('((') && part.endsWith('))')) {
              const sidenoteContent = part.slice(2, -2);
                console.log("Found a sidenote:", sidenoteContent);
              children.push(
                h('span.sidenote-wrapper', [
                  h('a.sidenote-ref', { href: '#', role: 'doc-noteref', 'aria-describedby': `sn-1` }, '*'),
                  h('span.sidenote', { id: `sn-1`, role: 'doc-endnote' }, sidenoteContent),
                ])
              );
            } else {
              currentText += part;
            }
          }
        } else {
          children.push(child);
        }
      }
      node.children = children.length > 0 ? children : [h('text', currentText)];
    });
  };
}

export default remarkSidenotes;