import React from 'react';

import {MQEditableLabel} from './mqlabel'


export class MathematicalExpressionAnswer extends React.Component {
  render() {
    return (
        <div className="module-accessible-block mathematical-expression">
          <MQEditableLabel value={this.props.representation} onChange={this.props.onRepresentationChange}/>
        </div>)    
  }
}
