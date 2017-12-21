django.uc_calculate_lhs_number = function (lhsNumber, lhsUnit, rhsUnit) {
  lhsNumber = lhsNumber.replace(/\^{\s*(\S+)\s*}/, '^($1)') // fix for math.parser()
  var parser = math.parser();
  try {
    var lhsNumber = parser.eval(lhsNumber)
  } catch (e) {
    return null;
  } // catch SyntaxError

  // var lhsQty = Qty.parse(lhsNumber + lhsUnit);
  //
  // // lhs nubmer toBase ratio
  // var lhsRatio = lhsQty / lhsQty.toBase();
  //
  // var rhsQty = Qty.parse(rhsUnit); // 1 m

  var convert = Qty.swiftConverter(lhsUnit, rhsUnit); // Configures converter
  return convert(lhsNumber)
}