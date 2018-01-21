import React from 'react'
// import RMathJax from 'react-mathjax'
// import ReactHover from 'react-hover'
// import {Vector, VectorCanvas, CanvasVector, CanvasText} from '../vector_canvas'
// import {Text, Expression} from '../app'
import {VectorCanvas, CanvasVector} from '../vector_canvas'
import {DEFAULT_MATHJAX_OPTIONS} from '../constants'
import {Hint} from './utils/hint'
import { SingleAnswer } from './answers/single_answer'
import { MultipleAnswer } from './answers/multiple_answer'

/* global MathJax */

var VECTOR_COLORS = [
  'red',
  'blue',
  'green',
  'yellow'
]

export class Question extends React.Component {

  shouldComponentUpdate(nextProps, nextState){
    if (nextProps['shouldUpdate']
      || nextProps.question.uuid !== this.props.question.uuid
      || nextProps.correct_answer !== this.props.correct_answer ){
      return true
    } else {
      return false
    }
  }

  componentDidMount () {
    MathJax.Hub.Config(DEFAULT_MATHJAX_OPTIONS);
    MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
    window.onbeforeunload = function() {
      return 'Changes you made may not be saved.';
    }
  }

  componentDidUpdate () {
    MathJax.Hub.Config(DEFAULT_MATHJAX_OPTIONS);
    MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
  }

  render () {
    var image = ''
    if (this.props.question.image) {
      image = (
        <div className='thumbnail question-thumbnail'>
          <img src={this.props.question.image} />
        </div>
      )
    }
    var vector = ''
    if (this.props.question.vectors.length) {
      var vectors = []
      for (var i = 0; i < this.props.question.vectors.length; i++) {
        var iVector = this.props.question.vectors[i];
        var point = {
          x: VectorCanvas.calcVectorXStart(iVector.x_component),
          y: VectorCanvas.calcVectorYStart(iVector.y_component)
        }
        var endPoint = {
          x: point.x + VectorCanvas.calcCanvasMagnitude(iVector.x_component),
          y: point.y - VectorCanvas.calcCanvasMagnitude(iVector.y_component)
        }
        var cVector = new CanvasVector(null, point, VECTOR_COLORS[i])
        cVector.complete(endPoint)
        vectors.push(cVector)
      }
      vector = (
        <VectorCanvas objects={vectors} />
      )
    }
    var hint = ''
    if (this.props.question.hint) {
      hint = <Hint hint={this.props.question.hint} hintCollapsed={this.props.question.hintCollapsed} onClick={this.props.hintClick} />
      {/*<div className = 'hintDiv'>*/}
      {/*<div className='hintButton'>*/}
      {/*<a href='#demo' data-toggle='collapse'>hint</a>*/}
      {/*</div>*/}
      {/*<div id='demo' className='collapse'>*/}
      {/*{this.props.question.hint}*/}
      {/*</div>*/}
      {/*</div>;*/}
    }
    var answerField = ''
    if (this.props.question.question_type == 'SINGLE_ANSWER') {
      answerField =
        <SingleAnswer
          question={this.props.question}
          answer={this.props.correct_answer}
          // continueAction={this.props.continueAction}
          updateAnswer={this.props.updateAnswer}
          correct={this.props.correct}
        />
    } else if (this.props.question.question_type == 'MULTIPLE_CHOICE') {
      answerField =
        <MultipleAnswer
          question={this.props.question}
          answer={this.props.correct_answer}
          // continueAction={this.props.continueAction}
          correct={this.props.correct}
        />
    }
    function createMarkup (text) {
      return {__html: text}
    }
    return (
      <div className='question' id='ajaxDiv'>
        <div className='row'>
          <div className='col-md-6 text-center'>
            <div className='bounding-box'>
              <h1 id='ajaxDiv' dangerouslySetInnerHTML={createMarkup(this.props.question.text)} />
              {hint}
              {image}
              {vector}
            </div>
          </div>
          {answerField}
        </div>
      </div>
    )
  }
}
