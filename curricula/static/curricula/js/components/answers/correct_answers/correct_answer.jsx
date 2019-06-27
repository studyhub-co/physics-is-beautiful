import React from 'react'
import {VectorAnswer, TextAnswer, UnitConversionAnswer,
  MathematicalExpressionAnswer, DefaultAnswer,
  UnitConversion, MySQL, MySQLAnswer } from './correct_answers'
import {Text, Expression} from '../../../app' // TODO move to correct_answers.jsx
import {Vector} from 'vector_canvas'

export class Answer extends React.Component {
  render () {
    var Component
    switch (this.props.answer.constructor) {
      case Vector:
        Component = VectorAnswer
        break
      case Expression:
        Component = MathematicalExpressionAnswer
        break
      case UnitConversion:
        Component = UnitConversionAnswer
        break
      case MySQL:
        Component = MySQLAnswer
        break
      case Text:
        Component = TextAnswer
        break
      default:
        Component = DefaultAnswer
        break
    }
    return <Component {...this.props} />
  }
}
