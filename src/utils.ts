import createElement from 'dom-create-element-query-selector/cjs'

const hasId = (token: string): boolean => {
  return token.includes('#')
}

const isChainer = (token: string): boolean => {
  return token === '>'
}

const isPseudo = (token: string): boolean => {
  return token.endsWith('::before') || token.endsWith('::after')
}

export const isSinglyResolvable = (selectorText: string): boolean => {
  const tokens = selectorText.split(' ')
  return tokens.every((token) => hasId(token) || isChainer(token))
}

export const createElementFromQuery = (query: string) => {
  // TODO: Allow creating pseudo elements without declaring host before
  const elementSelectors = query.split(' ')
    .filter((token) => hasId(token) && !isPseudo(token))

  let parent = document.body
  elementSelectors.forEach((selector) => {
    const existingElement = parent.querySelector(selector) as HTMLElement
    if (existingElement) {
      parent = existingElement
      return
    }

    const element = createElement(selector)
    parent.appendChild(element)
    parent = element
  })
}
