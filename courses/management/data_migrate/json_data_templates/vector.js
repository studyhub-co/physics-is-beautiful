const mockData = {
  question: {
    content: {
      text: '{{question_text}}',
      evaluatedMathText: '',
      image: '',
      hint: '',
    },
    type: 'base',
  },
  answer: {
    content: {
      text: '',
      evaluatedMathText: '',
      image: '',
      hint: '',
    },
    type: 'base',
  },
  questionTextOnly: false,
  questionVectorIsNull: false,
  hiddenFields: {
    answerVectors: [],
    answer: {
      content: {
        text: '',
        evaluatedMathText: '',
        image: '',
        hint: '',
      },
      type: 'base',
    },
  },
  questionVectors: [
    // {
    //   angle: 0,
    //   xComponent: 0,
    //   yComponent: 0,
    //   magnitude: 0,
    // },
  ],
  answerVectors: [
    // {
    //   angle: 0,
    //   xComponent: 0,
    //   yComponent: 0,
    //   magnitude: 0,
    // },
  ],
  answerVectorIsNull: false,
  answerTextOnly: false,
  answerNullableVector: false,
  answerToCheck: 10,
}
