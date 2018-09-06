import React from 'react'
import PropTypes from 'prop-types'

import { Image } from 'react-bootstrap'

export class TeacherClassroomCard extends React.Component {
  render () {
    var className = 'classroom-card'
    var studentsProfileUrlMask = this.props.baseUrl + '/' + this.props.classroom.uuid + '/teacher/students/'
    return (
      <div className={className}>
        <div onClick={() => { this.props.onTitleClick(this.props.baseUrl + '/' + this.props.classroom.uuid + '/teacher/') }}>
          {this.props.classroom.name}</div>
        <div>{this.props.classroom.curriculum.name}</div>
        <div>{this.props.classroom.less_students
          ? <div style={{textAlign: 'left', padding: '1.5rem'}}>
            { this.props.classroom.less_students.map(function (student, i) {
              return <span
                key={i}
                style={{paddingRight: '1rem', paddingBottom: '1rem', display: 'inline-block', cursor: 'pointer'}}
                onClick={() => { this.props.onTitleClick(studentsProfileUrlMask + student.username) }}>
                <Image
                  src={student.gravatar_url}
                  title={student.display_name}
                  style={{width: '4rem'}}
                  rounded
                />
              </span>
            }, this)}
          </div> : null }
        </div>
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
