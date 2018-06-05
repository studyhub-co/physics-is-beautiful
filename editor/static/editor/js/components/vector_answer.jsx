import React from 'react';
import {VectorCanvas, CanvasVector, NullVector} from 'vector_canvas'


export class VectorAnswer extends React.Component {

  render() {
    var v, objects;
    if (this.props.x_component != null) {
      var pointer = {
        x: VectorCanvas.calcVectorXStart(this.props.x_component),
        y: VectorCanvas.calcVectorYStart(this.props.y_component)
      }
      var endPointer = {
        x: pointer['x'] + VectorCanvas.calcCanvasMagnitude(this.props.x_component),
        y: pointer['y'] - VectorCanvas.calcCanvasMagnitude(this.props.y_component)
      }
      
      v = new CanvasVector(null, pointer, 'green');
      v.complete(endPointer)
      objects = [v]
    } 
    
    return (
      <div>
        <VectorCanvas
           clear={true}             
           objects={objects}
           allowInput={true}
           updateAnswer={ans => this.props.onVectorChanged(ans[1].vector.x_component, ans[1].vector.y_component)}
          question={{uuid : this.props.question}}
          />
        <input type="checkbox" checked={this.props.angleOnly} onChange={(e) => {this.props.onAngleOnlyChanged(e.target.checked)}}/> Only check angle
          {this.props.allowNull &&
            <a onClick={e => {e.preventDefault(); this.props.onSetNull()}}>Clear (set to null vector)</a>
          }
      </div>)    
  }
}
