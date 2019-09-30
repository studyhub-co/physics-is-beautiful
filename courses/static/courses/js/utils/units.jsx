const quantityUnitRe = /^\s*([\d\.,]+)\\*\s*([\w/]+)\s*$/

export function validateQuantityUnit (value) {
  return quantityUnitRe.test(value)
}

export function splitQuantityUnit (value) {
  var match = value.match(quantityUnitRe)
  return match.slice(1, 3)
}
