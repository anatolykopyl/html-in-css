import createElement from 'dom-create-element-query-selector/cjs'

const hasId = (token: string): boolean => {
  return token.includes('#')
}

const isChainer = (token: string): boolean => {
  return token === '>'
}

export const isSinglyResolvable = (selectorText: string): boolean => {
  const tokens = selectorText.split(' ')
  return tokens.every((token) => hasId(token) || isChainer(token))
}

export const createElementFromQuery = (query: string) => {
  const elementSelectors = query.split(' ').filter(hasId)

  let parent = document.body
  elementSelectors.forEach((selector) => {
    const element = createElement(selector)
    parent.appendChild(element)
    parent = element
  })
}
