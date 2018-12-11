import nodeMap from '../util/node-map';

export default function (src, tar, data) {
  const { name } = data;
  nodeMap[src.__id].removeAttribute(name);
}
