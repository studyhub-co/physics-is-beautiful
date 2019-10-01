import React from 'react'

import { Col } from 'react-bootstrap'
import PropTypes from 'prop-types'

export default class AddCourseButton extends React.Component {
  render () {
    return (
      <Col
        sm={2}
        md={2}
        className='course-card'
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
          + Create another course from scratch
        </div>
      </Col>
    )
  }
}

AddCourseButton.propTypes = {
  onClick: PropTypes.func.isRequired
}
