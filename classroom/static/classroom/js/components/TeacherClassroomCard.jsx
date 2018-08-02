import React from 'react'
import PropTypes from 'prop-types'

export class TeacherClassroomCard extends React.Component {
  render () {
    var className = 'classroom-card'

    return (
      <div className={className}>
        <div onClick={() => { this.props.onTitleClick(this.props.baseUrl + '/' + this.props.classroom.uuid + '/teacher/') }}>
          {this.props.classroom.teacher.display_name}'s Classroom - {this.props.classroom.name}</div>
        <div>{this.props.classroom.curriculum.name}</div>
        <div>Students photos list</div>
        <div>{this.props.classroom.count_students} student{this.props.classroom.count_students === 1 ? null : 's'}</div>
      </div>
    )
  }
}

TeacherClassroomCard.propTypes = {
  classroom: PropTypes.object.isRequired,
  onTitleClick: PropTypes.func.isRequired,
  baseUrl: PropTypes.string.isRequired
}
