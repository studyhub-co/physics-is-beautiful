import React from 'react'
import { VectorAnswer } from './vector'
import { MathematicalExpressionAnswer } from './math_expression'
import { UnitConversionAnswer } from './unit_conversion'
import { MultipleAnswer } from './multiple'
import { MultiSelectAnswer } from './multiselect'

export class Answer extends React.Component {
  render () {
    var Component
    var options = {}
    switch (this.props.question.answer_type) {
      case 'VECTOR':
      case 'NULLABLE_VECTOR':
        Component = VectorAnswer
        break
      case 'VECTOR_COMPONENTS':
        options['vectorComponentButtons'] = true
      case 'MATHEMATICAL_EXPRESSION':
        Component = MathematicalExpressionAnswer
        break
      case 'UNIT_CONVERSION':
        Component = UnitConversionAnswer
        break
      case 'MULTISELECT_CHOICE':
        Component = MultiSelectAnswer
        break
      case 'MULTIPLE_CHOICE':
        Component = MultipleAnswer
        break

      default:
        return (
          <div className='col-md-6 text-center'>
            <div className='bounding-box'>
              <h1>Unrecognized answer type: {this.props.question.answer_type}.</h1>
            </div>
          </div>
        )
      }

      return (
        <div className='col-md-6 text-center'>
          <Component {...this.props} {...options} />
        </div>
      )
  }
}