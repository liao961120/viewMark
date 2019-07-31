function getPNodes(elem) {
    var pElements = []
    var nodes = elem.childNodes;
    for (var i=0, i=nodes.length; i--;) {
        var node = nodes[0], nodeName = node.nodeName;
        if (nodeName == 'P')
            pElements.push(node)
        else if (nodeName == "P")
            nodes = nodes.concat(getPNodes(node));
    }
    return nodes
}

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

var utils = {
    getPNodes,
    getAllParents,
    getTextNodesIn
}

export default utils
