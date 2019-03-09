const { SHOW_ELEMENT } = NodeFilter;

export default function createTreeWalker(root) {
  return document.createTreeWalker(root, SHOW_ELEMENT);
}
