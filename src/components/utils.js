function getTextNodesIn(elem, opt_fnFilter) {
  var textNodes = [];
  if (elem) {
    for (var nodes = elem.childNodes, i = nodes.length; i--;) {
      var node = nodes[i], nodeType = node.nodeType;
      if (nodeType == 3) {
        if (!opt_fnFilter || opt_fnFilter(node, elem)) {
          textNodes.push(node);
        }
      }
      else if (nodeType == 1 || nodeType == 9 || nodeType == 11) {
        textNodes = textNodes.concat(getTextNodesIn(node, opt_fnFilter));
      }
    }
  }
  return textNodes;
}


function getAllParents(ele) {
  var nodes = [];
  nodes.push(ele.nodeName);
  while (ele.parentNode) {
    nodes.unshift(ele.parentNode.nodeName);
    ele = ele.parentNode;
  }
  return nodes
}

function deepCopy(obj) {
  const copy = JSON.parse(JSON.stringify(obj));
  return copy
}


var utils = {
  deepCopy,
  getAllParents,
  getTextNodesIn,
}

export default utils
