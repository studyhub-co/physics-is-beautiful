import React from 'react'
import {VectorCanvas, CanvasVector, CanvasText} from 'vector_canvas'

export class VectorAnswer extends React.Component {
  constructor () {
    super()
    this.state = {clear: false}
    this.unanswered = true
  }

  componentDidMount () {
    this.reset()
  }

  componentWillReceiveProps (newProps) {
     if (newProps.question.uuid !== this.props.question.uuid) {
       // reset answer
       this.reset()
    }
  }

  reset () {
    this.props.updateAnswer(null)
  }

  componentDidUpdate () {
    if (this.props.answer || this.props.question.is_correct) {
      this.unanswered = false
    } else if (!this.unanswered) {
      this.unanswered = true
      this.setState({clear: true}) // FIXME do not use setState in  componentDidUpdate
    }
    if (this.state.clear) {
      this.setState({clear: false}) // FIXME do not use setState in  componentDidUpdate
    }
  }

  render () {
    // Right now we only support Vector problems for single answer.
    var allowInput = true
    var isNullAnswer = false
    var isNotNullAnswer = false
    var objects = []

    if (this.props.answer && !this.props.question.is_correct) {
      // if answer is not null vector
      if (this.props.answer['x'] != 0 || this.props.answer['y'] != 0) {

        if(!this.props.question.response.vector.x_component && !this.props.question.response.vector.y_component){
          // user gave wrong answer
          isNotNullAnswer = true
        }

        allowInput = false
        var pointer = {
          x: VectorCanvas.calcVectorXStart(this.props.answer.x),
          y: VectorCanvas.calcVectorYStart(this.props.answer.y)
        }
        var endPointer = {
          x: pointer['x'] + VectorCanvas.calcCanvasMagnitude(this.props.answer.x),
          y: pointer['y'] - VectorCanvas.calcCanvasMagnitude(this.props.answer.y)
        }
        var vector = new CanvasVector(null, pointer, 'green')
        vector.complete(endPointer)
        var textPoint = {
          left: endPointer.x - VectorCanvas.calcCanvasMagnitude(.65) + this.props.answer.x,
          top: endPointer.y - this.props.answer.y - VectorCanvas.calcCanvasMagnitude(1)
        }
        var text = new CanvasText(null, textPoint, 'correct\nsolution')
        objects.push(vector)
        objects.push(text)
      } else {
        isNullAnswer = true
      }
    }
    var allowNull = false
    if (this.props.question.answer_type == 'NULLABLE_VECTOR') {
      allowNull = true
    }
    // var continueBtn = <ContinueButton continueClick={this.props.continueAction} hidden={this.props.answer === null} />
    return (
      <div className='bounding-box'>
        <VectorCanvas {...this.props}
          // continueBtn={continueBtn}
          isNullAnswer={isNullAnswer}
          isNotNullAnswer={isNotNullAnswer}
          allowInput={allowInput}
          // manualCheck={true} TODO seems it not used, remove?
          updateAnswer={this.props.updateAnswer}
          objects={objects}
          allowNull={allowNull}
          clear={this.state.clear}
        />
      </div>
    )
  }
}
VectorAnswer.propTypes = {
  updateAnswer: React.PropTypes.func.isRequired
}
