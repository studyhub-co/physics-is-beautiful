import React from 'react'
import PropTypes from 'prop-types'

export class ClassroomCard extends React.Component {
  render () {
    var className = 'classroom-card'

    return (
      <div className={className}>
        <div>{this.props.classroom.teacher.first_name} - {this.props.classroom.name}</div>
        <div>{this.props.classroom.curriculum.name}</div>
        <div>Students photos list</div>
        <div>{this.props.classroom.count_students} student{this.props.classroom.count_students === 1 ? null : 's'}</div>
      </div>
    )
  }
}

ClassroomCard.propTypes = {
  classroom: PropTypes.object
}
