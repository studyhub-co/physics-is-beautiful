import React from 'react'
import {SingleVectorAnswer} from './single_answers/single_vector_answer'
import {SingleMathematicalExpressionAnswer} from './single_answers/single_math_expression_answer'

export class SingleAnswer extends React.Component {
  render () {
    var Component
    var options = {}
    switch (this.props.question.answer_type) {
      case 'VECTOR':
      case 'NULLABLE_VECTOR':
        Component = SingleVectorAnswer
        break
      case 'VECTOR_COMPONENTS':
        options['xHat'] = true
        options['yHat'] = true
      case 'MATHEMATICAL_EXPRESSION':
        Component = SingleMathematicalExpressionAnswer
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
