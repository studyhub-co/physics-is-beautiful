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
           question={{uuid : this.props.question}}/>
            <select value={this.props.vectorCheckType} onChange={this.props.onVectorCheckTypeChanged}>
              <option value="full">Check answer for full vector match</option>
              <option value="angle">Only check angle</option>
              <option value="magnitude">Only check magnitude</option>
            </select>
          {this.props.allowNull &&
            <div>
                <a href="" onClick={e => {e.preventDefault(); this.props.onSetNull()}}>Clear (set to null vector)</a>
              </div>
          }
      </div>)    
  }
}
