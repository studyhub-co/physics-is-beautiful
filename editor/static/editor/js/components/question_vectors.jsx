import React from 'react';
import {VectorCanvas, CanvasVector, NullVector} from 'vector_canvas'

const VECTOR_COLORS = [
  'red',
  'blue',
  'green',
  'yellow'
]

  
export class QuestionVectors extends React.Component {

  render() {
    var objects=[];
    for (var i in this.props.vectors) {
      var v
      var pointer = {
        x: VectorCanvas.calcVectorXStart(this.props.vectors[i].x_component),
        y: VectorCanvas.calcVectorYStart(this.props.vectors[i].y_component)
      }
      var endPointer = {
        x: pointer['x'] + VectorCanvas.calcCanvasMagnitude(this.props.vectors[i].x_component),
        y: pointer['y'] - VectorCanvas.calcCanvasMagnitude(this.props.vectors[i].y_component)
      }
      
      v = new CanvasVector(null, pointer, VECTOR_COLORS[i % VECTOR_COLORS.length]);
      v.complete(endPointer)
      objects.push(v)
    } 
    
    return (
      <div className="question-vectors">
        <a className="question-vectors-clear" onClick={e=>{e.preventDefault(); this.props.onClearClick()}}><span className="glyphicon glyphicon-remove"/> clear</a>
        <VectorCanvas
           clear={true}             
           objects={objects}
           allowInput={true}
           updateAnswer={ans => this.props.onVectorChanged(ans[1].vector.x_component, ans[1].vector.y_component)}
          question={{uuid : this.props.question}}
          />
      </div>)    
  }
}
