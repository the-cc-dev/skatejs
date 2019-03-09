import makeNodeList from './make-node-list';

let parser;

export default function parse(html) {
  if (!parser) {
    parser = document.createElement('div');
  }
  parser.innerHTML = html;
  return makeNodeList(parser.childNodes);
}
