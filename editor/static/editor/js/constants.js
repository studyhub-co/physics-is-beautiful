export const AnswerTypes = Object.freeze({
    UNDEFINED : 0,
    MULTIPLE_CHOICE : 100,
    MULTISELECT_CHOICE : 110,
    VECTOR : 20,
    NULLABLE_VECTOR : 30,
    MATHEMATICAL_EXPRESSION : 50,
    VECTOR_COMPONENTS : 60,
    UNIT_CONVERSION :  70});
    

export const AnswerTypeLabels = {
    [AnswerTypes.UNDEFINED] : 'Please select',
    [AnswerTypes.MULTIPLE_CHOICE] : 'Multiple choices',
    [AnswerTypes.MULTISELECT_CHOICE] : 'Mutiple choices with more than one correct choice',
    [AnswerTypes.VECTOR] : 'Vector',
    [AnswerTypes.NULLABLE_VECTOR] : 'Nullable vector',
    [AnswerTypes.MATHEMATICAL_EXPRESSION] : 'Mathematical expression',
    [AnswerTypes.VECTOR_COMPONENTS] : 'Vector components',
    [AnswerTypes.UNIT_CONVERSION] :  'Unit conversion'  
}
