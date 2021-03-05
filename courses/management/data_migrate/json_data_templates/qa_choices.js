{
  question: {
    content: {
      text: 'Enter question text',
      evaluatedMathText: '',
      image: '',
      hint: '',
    },
    type: 'base',
  },
  choices: [
    {
      content: {
        image: '',
        text: '1st choice',
      },
      selected: true,
      hiddenFields: { selected: false },
      type: 'base',
      uuid: uuidV4(),
      position: 0,
      reactionResult: 'none',
    },
    {
      content: {
        image: '',
        text: '2nd choice',
      },
      selected: false,
      hiddenFields: { selected: false },
      type: 'base',
      uuid: uuidV4(),
      position: 1,
      reactionResult: 'none',
    },
  ],
  multiSelectMode: false,
}
