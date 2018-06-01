import React from 'react';
import {VectorCanvas, CanvasVector} from 'vector_canvas'


export class VectorAnswer extends React.Component {

  render() {
    var pointer = {
      x: VectorCanvas.calcVectorXStart(this.props.x_component),
      y: VectorCanvas.calcVectorYStart(this.props.y_component)
    }
    var endPointer = {
      x: pointer['x'] + VectorCanvas.calcCanvasMagnitude(this.props.x_component),
      y: pointer['y'] - VectorCanvas.calcCanvasMagnitude(this.props.y_component)
    }
    
    var v = new CanvasVector(null, pointer, 'green');
    v.complete(endPointer)
    
    return (
      <div>
        <div className="col-md-1 module-accessible-block">
          <VectorCanvas
             clear={true}
             objects={[v]}
             allowInput={true}
             updateAnswer={ans => this.props.onVectorChanged(ans[1].vector.x_component, ans[1].vector.y_component)}
             question={{uuid : this.props.question}}
             />
        </div>
        <input type="checkbox" checked={this.props.angleOnly} onChange={(e) => {this.props.onAngleOnlyChanged(e.target.checked)}}/> Only check angle
      </div>)    
  }
}
