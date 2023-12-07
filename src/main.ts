import { isSinglyResolvable, createElementFromQuery } from "./utils"

Array.from(document.styleSheets).forEach((styleSheet) => {
  Array.from(styleSheet.cssRules).forEach(rule => {
    if (!(rule instanceof CSSStyleRule)) return
    if (!isSinglyResolvable(rule.selectorText)) return

    createElementFromQuery(rule.selectorText)
  })
})
