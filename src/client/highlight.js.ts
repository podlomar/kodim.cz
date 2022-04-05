import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';

hljs.registerLanguage('javascript', javascript);
// @TODO: register HTML, CSS, Python

export const applyHighlightJs = () => {
  hljs.highlightAll();
};
