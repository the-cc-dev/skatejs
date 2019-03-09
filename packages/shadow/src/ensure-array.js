export default function ensureArray(refNode) {
  return refNode instanceof DocumentFragment
    ? Array.from(refNode.childNodes)
    : [refNode];
}
