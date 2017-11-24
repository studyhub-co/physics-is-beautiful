import React from 'react'
import {VectorAnswer, TextAnswer, MathematicalExpressionAnswer, DefaultAnswer} from './rights_answers'
import {Text, Expression} from '../../../app'
import {Vector} from '../../../vector_canvas'

export class Answer extends React.Component {
  render () {
    var Component
    switch (this.props.answer.constructor) {
      case Vector:
        Component = VectorAnswer
        break
      case Text:
        Component = TextAnswer
        break
      case Expression:
        Component = MathematicalExpressionAnswer
        break
      default:
        Component = DefaultAnswer
        break
    }
    return <Component {...this.props} />
  }
}
