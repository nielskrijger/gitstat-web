import marked from 'marked';

const renderer = new marked.Renderer();
const linkRenderer = renderer.link;

// Ensure link opens in a new tab
renderer.link = (href, title, text): string => {
  const html = linkRenderer.call(renderer, href, title, text);
  return html.replace(/^<a /, '<a target="_blank" rel="nofollow noreferrer" ');
};

export default (markdown: string): string => {
  return marked(markdown, { renderer });
};
