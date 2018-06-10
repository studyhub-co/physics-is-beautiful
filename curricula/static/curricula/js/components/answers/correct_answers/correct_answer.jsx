import React from 'react'
import {VectorAnswer, TextAnswer, UnitConversionAnswer,
  MathematicalExpressionAnswer, DefaultAnswer,
  UnitConversion } from './correct_answers'
import {Expression} from '../../../app' // TODO move to correct_answers.jsx
import {Vector} from 'vector_canvas'

export class Answer extends React.Component {
  render () {
    var Component
    switch (this.props.answer.constructor) {
      case Vector:
        Component = VectorAnswer
        break
      // case Text:
      //   Component = TextAnswer // Todo remove
        break
      case Expression:
        Component = MathematicalExpressionAnswer
        break
      case UnitConversion:
        Component = UnitConversionAnswer
        break
      default:
        Component = DefaultAnswer
        break
    }
    return <Component {...this.props} />
  }
}
