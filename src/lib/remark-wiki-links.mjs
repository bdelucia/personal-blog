/**
 * Remark plugin to transform [[wiki-links]] into anchor tags
 * [[Tag]] -> <a href="/tags/tag">Tag</a>
 */

function remarkWikiLinks() {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      const wikiLinkRegex = /\[\[([^\]]+)\]\]/g;
      const value = node.value;
      
      if (!wikiLinkRegex.test(value)) {
        return;
      }
      
      // Reset regex
      wikiLinkRegex.lastIndex = 0;
      
      const children = [];
      let lastIndex = 0;
      let match;
      
      while ((match = wikiLinkRegex.exec(value)) !== null) {
        // Add text before the match
        if (match.index > lastIndex) {
          children.push({
            type: 'text',
            value: value.slice(lastIndex, match.index),
          });
        }
        
        // Add the link
        const tag = match[1];
        children.push({
          type: 'link',
          url: `/tags/${tag.toLowerCase()}`,
          children: [{ type: 'text', value: tag }],
          data: {
            hProperties: { class: 'wiki-link' },
          },
        });
        
        lastIndex = match.index + match[0].length;
      }
      
      // Add remaining text
      if (lastIndex < value.length) {
        children.push({
          type: 'text',
          value: value.slice(lastIndex),
        });
      }
      
      // Replace the node with new children
      if (children.length > 0) {
        parent.children.splice(index, 1, ...children);
        return index + children.length;
      }
    });
  };
}

// Simple tree visitor function (no external dependency)
function visit(tree, type, visitor) {
  function traverse(node, index, parent) {
    if (node.type === type) {
      const result = visitor(node, index, parent);
      if (typeof result === 'number') {
        return result;
      }
    }
    
    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        const result = traverse(node.children[i], i, node);
        if (typeof result === 'number') {
          i = result - 1; // Adjust for the loop increment
        }
      }
    }
  }
  
  traverse(tree, null, null);
}

export default remarkWikiLinks;
