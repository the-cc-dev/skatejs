export default function makeNodeList(nodeList = []) {
  if (nodeList instanceof NodeList) {
    nodeList = Array.from(nodeList);
  }
  nodeList.item = function(index) {
    return this[index];
  };
  return nodeList;
}
