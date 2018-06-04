export const AnswerTypes = Object.freeze({
    UNDEFINED : 0,
    MULTIPLE_CHOICE : 100,
    MULTISELECT_CHOICE : 110,
    VECTOR : 20,
    NULLABLE_VECTOR : 30,
    MATHEMATICAL_EXPRESSION : 50,
    VECTOR_COMPONENTS : 60,
    UNIT_CONVERSION :  70});
    

export const AnswerTypeLabels = Object.freeze({
    [AnswerTypes.UNDEFINED] : 'Please select',
    [AnswerTypes.MULTIPLE_CHOICE] : 'Multiple choices',
    [AnswerTypes.MULTISELECT_CHOICE] : 'Mutiple choices with more than one correct choice',
    [AnswerTypes.VECTOR] : 'Vector',
    [AnswerTypes.NULLABLE_VECTOR] : 'Nullable vector',
    [AnswerTypes.MATHEMATICAL_EXPRESSION] : 'Mathematical expression',
    [AnswerTypes.VECTOR_COMPONENTS] : 'Vector components',
    [AnswerTypes.UNIT_CONVERSION] :  'Unit conversion'  
})

export const UnitConversionTypes = Object.freeze({
    LEFT_SIDE_BLANK : 10,
    RIGHT_SIDE_BLANK : 20,
    ALL_SIDES_BLANK : 30
})

export const UnitConversionTypeLabels = Object.freeze({
    [UnitConversionTypes.LEFT_SIDE_BLANK] : 'Left side blank',
    [UnitConversionTypes.RIGHT_SIDE_BLANK] : 'Right side blank',
    [UnitConversionTypes.ALL_SIDES_BLANK] : 'Both sides blank'
   
})
