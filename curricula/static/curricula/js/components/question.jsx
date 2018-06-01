import React from 'react'
// import RMathJax from 'react-mathjax'
// import ReactHover from 'react-hover'
// import {Vector, VectorCanvas, CanvasVector, CanvasText} from '../vector_canvas'
// import {Text, Expression} from '../app'
import { VectorCanvas, CanvasVector, CanvasText } from 'vector_canvas'
import { DEFAULT_MATHJAX_OPTIONS } from '../constants'
import { Hint } from './utils/hint'
import { Answer } from './answers/answer'


/* global MathJax */

var VECTOR_COLORS = [
  'red',
  'blue',
  'green',
  'yellow'
]

export class Question extends React.Component {

  shouldComponentUpdate(nextProps, nextState){
    // reload for hint
    if (nextProps.question.uuid == this.props.question.uuid &&
      this.state && nextProps.question.hintCollapsed !== this.state.hintCollapsed){
       return true
    }

    if (nextProps['shouldUpdate']
      || nextProps.question.uuid !== this.props.question.uuid
      || nextProps.correct_answer !== this.props.correct_answer) {
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
    this.setState({'hintCollapsed': this.props.question.hintCollapsed})
  }

  componentDidUpdate () {
    MathJax.Hub.Config(DEFAULT_MATHJAX_OPTIONS);
    MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
    if (this.state && this.props.question.hintCollapsed != this.state.hintCollapsed) {
      this.setState({'hintCollapsed': this.props.question.hintCollapsed})
    }
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
      var vectorsPoints = []
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

        if (this.props.question.vectors.length == 2){

          var kVector
          var vectorAngle
          if (endPoint.x != point.x) {
               kVector = (endPoint.y - point.y) / (endPoint.x - point.x)
            	 vectorAngle = Math.atan((endPoint.y - point.y)/
                    (endPoint.x - point.x))
          } else { kVector = 1}

          var lambda = 1.85
          var x75 = (point.x + lambda*endPoint.x)/(1+lambda)
          var y75 = (point.y + lambda*endPoint.y)/(1+lambda)

          vectorsPoints.push({ startPoint: {x: point.x, y: point.y },
                               endPoint: {x: endPoint.x, y: endPoint.y },
                               kVector: kVector,
                               vectorAngle: vectorAngle,
                               b: (endPoint.y - kVector * endPoint.x),
                               x0: x75,
                               y0: y75
                               // x0: (endPoint.x + point.x)/2,
                               // y0: (endPoint.y + point.y)/2
                            })
        }

        vectors.push(cVector)
      }
      if (this.props.question.vectors.length == 2){
        // add labels
        for (var i = 0; i < vectorsPoints.length; i++) {
          var x0 = vectorsPoints[i].x0
          var y0 = vectorsPoints[i].y0

          var kVector = vectorsPoints[i].kVector
          var vectorAngle = vectorsPoints[i].vectorAngle*180/3.14159

          var kPerpVector
          // perpendicular
          if (kVector != 0) {
            kPerpVector = -1 / kVector
          }

          var diffFromLine

          var dist

          if (vectorAngle <= 0){
            if (i == 0)
            {
              diffFromLine = 30
            } else if (i == 1) {
              diffFromLine = 10
            }
          }
          else {
            if (i == 0)
            {
              diffFromLine = 20
            } else if (i == 1) {
              diffFromLine = 20
            }
          }

          if(typeof kPerpVector != 'undefined') {
            var Xr1 = Math.sqrt(Math.pow(diffFromLine, 2) / (1 + Math.pow(kPerpVector, 2))) + x0
            var Xr2 = x0 - Math.sqrt(Math.pow(diffFromLine, 2) / (1 + Math.pow(kPerpVector, 2)))

             var bPerp = y0 - kPerpVector * x0
             var Yr1 = kPerpVector*Xr1 + bPerp
             var Yr2 = kPerpVector*Xr2 + bPerp

          } else { // vector is x axis

            var Xr1 = x0
            var Xr2 = x0

            var Yr1 = y0 - diffFromLine
            var Yr2 = y0 - diffFromLine

          }

          var color = 'red'
          var text = 'A'
          if ( i == 1 ) {
            color = 'blue'
            text = 'B'
          }
          var topx, topy

          if (vectorAngle <= 0) {
            if (i == 0) {
              topx = Xr2
              topy = Yr2
            } else if (i == 1) {
              topx = Xr1
              topy = Yr1
            }
          } else {
            if (i == 0) {
              topx = Xr1
              topy = Yr1
            } else if (i == 1) {
              topx = Xr2
              topy = Yr2
            }
          }

          var text = new CanvasText(null, {top: topy, left: topx}, text, {fill: color})
          vectors.push(text)
        }
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
    // var answerField = ''
    // if (this.props.question.answer_type == 'MULTIPLE_CHOICE') {
    //   answerField =
    //     <MultipleAnswer
    //       question={this.props.question}
    //       answer={this.props.correct_answer}
    //       // continueAction={this.props.continueAction}
    //       updateAnswer={this.props.updateAnswer}
    //       correct={this.props.correct}
    //     />
    // }
    // else if (this.props.question.answer_type == 'MULTISELECT_CHOICE') {
    //   answerField =
    //     <MultiSelectAnswer
    //       question={this.props.question}
    //       answer={this.props.correct_answer}
    //       continueAction={this.props.continueAction}
    //       updateAnswer={this.props.updateAnswer}
    //       correct={this.props.correct}
    //     />
    // }
    // else { //default
    var answerField =
        <Answer
          question={this.props.question}
          answer={this.props.correct_answer}
          continueAction={this.props.continueAction}
          updateAnswer={this.props.updateAnswer}
          correct={this.props.correct}
        />
    // }
    // if (this.props.question.question_type == 'SINGLE_ANSWER') {
    //   answerField =
    //     <SingleAnswer
    //       question={this.props.question}
    //       answer={this.props.correct_answer}
    //       // continueAction={this.props.continueAction}
    //       updateAnswer={this.props.updateAnswer}
    //       correct={this.props.correct}
    //     />
    // } else if (this.props.question.question_type == 'MULTIPLE_CHOICE') {
    //   answerField =
    //     <MultipleAnswer
    //       question={this.props.question}
    //       answer={this.props.correct_answer}
    //       // continueAction={this.props.continueAction}
    //       updateAnswer={this.props.updateAnswer}
    //       correct={this.props.correct}
    //     />
    // }
    // else if (this.props.question.question_type == 'MULTISELECT_CHOICE') {
    //   answerField =
    //     <MultiSelectAnswer
    //       question={this.props.question}
    //       answer={this.props.correct_answer}
    //       continueAction={this.props.continueAction}
    //       updateAnswer={this.props.updateAnswer}
    //       correct={this.props.correct}
    //     />
    // }
    function createMarkup (text) {
      return {__html: text}
    }
    return (
      <div className='question'>
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
