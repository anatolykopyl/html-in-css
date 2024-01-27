import {CssNode, parse, walk} from 'css-tree'

export const createElement = (selector: string): HTMLElement => {
  const ast = parse(selector, {
    context: 'selectorList'
  })

  if (ast.type !== 'SelectorList') throw new Error('Expected a css selector')

  let tagName: string = 'div'
  let className: string | null = null
  let idName: string | null = null
  let attributes: Record<string, string> = {}

  walk(ast, {
    enter: function(node: CssNode) {
      if (node.type === 'SelectorList') return

      if (node.type === 'TypeSelector') {
        tagName = node.name
      }
      if (node.type === 'ClassSelector') {
        className = node.name
      }
      if (node.type === 'IdSelector') {
        idName = node.name
      }
      if (node.type === 'AttributeSelector' && node.matcher === '=') {
        if (node.value?.type === 'String') {
          attributes[node.name.name] = node.value.value
        }
      }
    }
  })

  const element = document.createElement(tagName)
  if (className) {
    element.setAttribute('class', className)
  }
  if (idName) {
    element.setAttribute('id', idName)
  }
  for (let attribute in attributes) {
    element.setAttribute(attribute, attributes[attribute])
  }

  return element
}
