import React from 'react';

import {MQEditableLabel} from './mqlabel'


export class VectorComponentsAnswer extends React.Component {
  render() {
    return (
      <div className="vector-components-answer">
        <MQEditableLabel value={this.props.representation} onChange={this.props.onRepresentationChange}
                         buttons={['\\hat{x}', '\\hat{y}', '1', '2', '3', '4', '+', '-']}
                         />
      </div>)    
  }
}
