import React from 'react'
import PropTypes from 'prop-types'

import { FaUser } from 'react-icons/fa'
import { Image } from 'react-bootstrap'

export class TeacherClassroomCard extends React.Component {
  render () {
    var className = 'classroom-card'
    var studentsProfileUrlMask = this.props.baseUrl + '/' + this.props.classroom.uuid + '/students/'
    return (
      <div className={className}>
        <div onClick={() => { this.props.onTitleClick(this.props.baseUrl + '/' + this.props.classroom.uuid + '/') }}>
          {this.props.classroom.name}</div>
        <div>{this.props.classroom.curriculum.name}</div>
        <div>{this.props.classroom.less_students
          ? <div style={{textAlign: 'left', padding: '1.5rem'}}>
            { this.props.classroom.less_students.map(function (student, i) {
              return <span
                key={i}
                style={{paddingRight: '1rem', paddingBottom: '1rem', display: 'inline-block', cursor: 'pointer'}}
                onClick={() => { this.props.onTitleClick(studentsProfileUrlMask + student.username) }}>
                {student.avatar_url ? <Image
                  src={student.avatar_url}
                  title={student.display_name}
                  style={{width: '4rem'}}
                  rounded
                />
                  : <span
                    onClick={() => { this.props.onTitleClick(studentsProfileUrlMask + student.username) }}
                    title={student.display_name}
                    style={{width: '4rem'}}>
                    <FaUser
                      style={{
                      fontSize: '3rem',
                      lineHeight: '0',
                      top: '1rem'}}
                    />
                    {/*<span*/}
                      {/*className='glyphicon glyphicon-user'*/}
                      {/*style={{*/}
                        {/*fontSize: '3rem',*/}
                        {/*lineHeight: '0',*/}
                        {/*top: '1rem'}}*/}
                    {/*/>*/}
                  </span>}
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
