import React from 'react';

import {Thumbnail} from './thumbnail'

export class CurriculumThumbnail extends React.Component {
  render() {
    return (
      <div className="col-md-1 module-accessible-block" onClick={this.props.onClick}>
        <div className="thumbnail section-thumbnail">
          <Thumbnail image={this.props.image}/>
        </div>
        <div>{this.props.name}</div>
      </div>
    )
  }
}
