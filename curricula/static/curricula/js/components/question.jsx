import React from 'react'
// import RMathJax from 'react-mathjax'
// import ReactHover from 'react-hover'
// import {Vector, VectorCanvas, CanvasVector, CanvasText} from '../vector_canvas'
// import {Text, Expression} from '../app'
import { VectorCanvas, CanvasVector, CanvasText } from '../vector_canvas'
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

          var kVector = (endPoint.y - point.y)/(endPoint.x - point.x)

          vectorsPoints.push({ startPoint: {x: point.x, y: point.y },
                               endPoint: {x: endPoint.x, y: endPoint.y },
                               kVector: kVector,
                               b: (endPoint.y - kVector * endPoint.x),
                               x0: (endPoint.y + point.y)/2,
                               y0: (endPoint.x + point.x)/2
                            })
        }

        vectors.push(cVector)
      }
      if (this.props.question.vectors.length == 2){
        // add labels
        for (var i = 0; i < vectorsPoints.length; i++) {
          var x0 = vectorsPoints[i].x0
          var y0 = vectorsPoints[i].y0
          if(vectorsPoints[i].endPoint.x != vectorsPoints[i].startPoint.x){
            // vectorAngle = Math.atan((vectorsPoints[i].endPoint.y - vectorsPoints[i].startPoint.y)/
            //                      (vectorsPoints[i].endPoint.x - vectorsPoints[i].startPoint.x))
            kVector = (vectorsPoints[i].endPoint.y-vectorsPoints[i].startPoint.y)/
              (vectorsPoints[i].endPoint.x - vectorsPoints[i].startPoint.x)
          }
          // vectorAngle = vectorAngle*180/3.14159

          var kPerpVector
          // perpendicular
          if (kVector != 0) {
            kPerpVector = -1 / kVector
          } else { kPerpVector = 1 }

          var bPerp = y0 - kPerpVector *x0

          var diffOnLine = 10

          var dist

          if (i == 0){
            // point x0, y0
            // line vectorsPoints[1]
            dist = Math.abs(y0 - vectorsPoints[1].kVector * x0 - vectorsPoints[1].b) /
                        Math.sqrt(Math.pow(vectorsPoints[1].kVector, 2)+1)
          } else if (i == 1) {
            dist = Math.abs(y0 - vectorsPoints[0].kVector * x0 - vectorsPoints[0].b) /
                        Math.sqrt(Math.pow(vectorsPoints[0].kVector, 2)+1)
          }

          if(dist < 20){
            diffOnLine += 20
          }

          var Xr1 = Math.sqrt(Math.pow(diffOnLine,2)/(1+Math.pow(kPerpVector,2))) + x0
          var Xr2 = x0 - Math.sqrt(Math.pow(diffOnLine,2)/(1+Math.pow(kPerpVector,2)))

          var Yr1 = kPerpVector*Xr1 + bPerp
          var Yr2 = kPerpVector*Xr2 + bPerp

          var color = "red"
          var text = "A"
          if ( i == 1 ) {
            color = "blue"
            text = "B"
          }
          var topx, topy
          topx = Xr1
          topy = Yr1

          var text = new CanvasText(null, {top: topx, left: topy}, text, {fill: color})
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
          updateAnswer={this.props.updateAnswer}
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
