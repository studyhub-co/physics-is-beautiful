import React from 'react';

import {MQEditableLabel} from './mqlabel'


export class MathematicalExpressionAnswer extends React.Component {
  render() {
    return (
      <div>
        <div className="col-md-1 module-accessible-block">
          <MQEditableLabel value={this.props.representation} onChange={this.props.onRepresentationChange}/>
        </div>
      </div>)    
  }
}
