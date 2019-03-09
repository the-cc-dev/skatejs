export function reParentOne(refNode, newHost) {
  Object.defineProperty(refNode, 'parentNode', {
    configurable: true,
    value: newHost
  });
  return refNode;
}

export function reParentAll(nodeList, newHost) {
  return nodeList.map(n => reParentOne(n, newHost));
}
