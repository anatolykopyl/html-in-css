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

const getPositionInParent = (token: string): number | null => {
  if (token.endsWith(':first-child')) return 1
  if (token.includes(':nth-child(')) {
    const matches = token.match(/\d+/)
    if (!matches) throw new Error(':nth-child without number')
    return parseInt(matches[matches.length - 1])
  }

  return null
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
    const positionInParent = getPositionInParent(selector)
    console.log(selector, positionInParent)

    if (positionInParent !== null) {
      parent.insertBefore(element, parent.childNodes[positionInParent - 1])
    } else {
      parent.appendChild(element)
    }

    parent = element
  })
}
