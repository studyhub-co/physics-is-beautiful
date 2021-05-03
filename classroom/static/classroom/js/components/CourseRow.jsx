import React from 'react'
import PropTypes from 'prop-types'

export class CourseRow extends React.Component {
  render () {
    var className = 'curriculum-card'
    if (this.props.selectedUuid === this.props.course.uuid) {
      className += ' selected-curriculum-card'
    }

    return (
      <div className={className}>
        <span><img style={{maxHeight: '4rem', maxWidth: '10rem', paddingRight: '1rem'}} src={this.props.course.image} /></span>
        <span style={{color: 'rgb(8, 209, 255)'}}>{ this.props.course.name }</span>
        <span style={{color: 'rgb(121, 121, 121)'}}> by {this.props.course.author.display_name}</span>
      </div>
    )
  }
}

CourseRow.propTypes = {
  course: PropTypes.object,
  selectedUuid: PropTypes.string
}
