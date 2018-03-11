import { patch } from "./patch"

export function app(selector, view, initProps) {
  const rootElement = document.querySelector(selector || 'body')
  let node = view(initProps)
  patch(rootElement, null, node)
  return props => patch(rootElement, node, (node = view(props)))
}
export function h(type, props, ...stack) {
  const children = (stack || []).reduce(addChild, [])
  props = props || {}
  return typeof type === "string" ? { type, props, children } : type(props, children)
}

function addChild(acc, node) {
  if (Array.isArray(node)) {
    acc = node.reduce(addChild, acc)
  } else if (null == node || true === node || false === node) {
  } else {
    acc.push(typeof node === "number" ? node + "" : node)
  }
  return acc
}
