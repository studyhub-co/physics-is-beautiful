import React from 'react'

import { Col } from 'react-bootstrap'

export class AddCurriculumButton extends React.Component {
  render () {
    return (
      <Col
        sm={2}
        md={2}
        className='curriculum-card'
        onClick={this.props.onClick}
        style={{'cursor': 'pointer', 'borderStyle': 'dashed', 'display': 'grid'}}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          fontSize: '1.7rem',
          color: 'gray',
          alignItems: 'center',
          height: '100%'}}>
          + Create another curriculum from scratch
        </div>
      </Col>
    )
  }
}
