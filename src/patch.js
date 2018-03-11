export function patch(parent, oldNode, newNode) {
  return patchElement(parent, parent.children[0], oldNode, newNode)
}

function setElementProp(element, name, value, oldValue) {
  if (name === "key") {
  } else if (name === "style") {
    for (var i in Object.assign({}, oldValue, (value = value || {}))) {
      element[name][i] = value[i] != null ? value[i] : ""
    }
  } else {
    var empty = null == value || false === value

    if (name in element) {
      try {
        element[name] = null == value ? "" : value
      } catch (_) { }
    } else if (!empty && typeof value !== "function") {
      element.setAttribute(name, value === true ? "" : value)
    }

    if (empty) {
      element.removeAttribute(name)
    }
  }
}

function createElement(node, isSVG) {
  if (typeof node === "string") {
    var element = document.createTextNode(node)
  } else {
    var element = (isSVG = isSVG || "svg" === node.type)
      ? document.createElementNS("http://www.w3.org/2000/svg", node.type)
      : document.createElement(node.type)

    for (var i = 0; i < node.children.length; i++) {
      element.appendChild(createElement(node.children[i], isSVG))
    }

    for (var i in node.props) {
      setElementProp(element, i, node.props[i])
    }
  }
  return element
}

function updateElement(element, oldProps, props) {
  for (var i in Object.assign({}, oldProps, props)) {
    var oldValue = "value" === i || "checked" === i ? element[i] : oldProps ? oldProps[i] : null

    if (props[i] !== oldValue) {
      setElementProp(element, i, props[i], oldValue)
    }
  }
}

function removeChildren(element, node, props) {
  if ((props = node.props)) {
    for (var i = 0; i < node.children.length; i++) {
      removeChildren(element.childNodes[i], node.children[i])
    }
  }
  return element
}

function removeElement(parent, element, node) {
  parent.removeChild(removeChildren(element, node))
}

function patchElement(parent, element, oldNode, node, isSVG, nextSibling) {
  if (oldNode == null) {
    element = parent.insertBefore(createElement(node, isSVG), element)
  } else if (node.type != oldNode.type) {
    const oldElement = element
    element = parent.insertBefore(createElement(node, isSVG), oldElement)
    removeElement(parent, oldElement, oldNode)
  } else {
    updateElement(element, oldNode.props, node.props)

    isSVG = isSVG || node.type === "svg"
    let childNodes = []
      ; (element.childNodes || []).forEach(element => childNodes.push(element))
    let oldNodeIdex = 0
    if (node.children && node.children.length > 0) {
      for (var i = 0; i < node.children.length; i++) {
        if (oldNode.children && oldNodeIdex <= oldNode.children.length &&
          (node.children[i].type && node.children[i].type === oldNode.children[oldNodeIdex].type ||
            (!node.children[i].type && node.children[i] === oldNode.children[oldNodeIdex]))
        ) {
          patchElement(element, childNodes[oldNodeIdex], oldNode.children[oldNodeIdex], node.children[i], isSVG)
          oldNodeIdex++
        } else {
          let newChild = element.insertBefore(
            createElement(node.children[i], isSVG),
            childNodes[oldNodeIdex]
          )
          patchElement(element, newChild, {}, node.children[i], isSVG)
        }
      }
    }
    for (var i = oldNodeIdex; i < childNodes.length; i++) {
      removeElement(element, childNodes[i], oldNode.children ? oldNode.children[i] || {} : {})
    }
  }
  return element
}