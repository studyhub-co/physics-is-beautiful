export function angleToVector(angle) {
    var x,y;
    x = Math.cos(angle* (Math.PI / 180))
    y = Math.sin(angle* (Math.PI / 180))
    var almostZero = 0.0000001
    var norm = Math.min(Math.max(Math.abs(x), almostZero),
                        Math.max(Math.abs(y), almostZero))
    if (norm > almostZero) {
      x = x / norm
      y = y / norm
    }
    return [x,y]
}    

export function vectorToAngle(x,y) {
    if (x == null || y == null)
	return null;
    var a = Math.atan2(y, x) / Math.PI * 180
    if (a < 0)
	a = a + 360
    return a;
}


const quantityUnitRe = /^\s*([\d\.,]+)\\*\s*([\w/]+)\s*$/;

export function validateQuantityUnit(value) {
    return quantityUnitRe.test(value);
}

export function splitQuantityUnit(value) {
    var match = value.match(quantityUnitRe)
    return  match.slice(1,3)
}
