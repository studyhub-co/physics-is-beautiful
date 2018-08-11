import React from 'react'
import PropTypes from 'prop-types'

export class TeacherStudentCard extends React.Component {
  // Card to show user in classroom students list
  // Card to swon user inside assignment view
  render () {
    var className = 'classroom-card pointer'
    console.log(this.props)
    return (
      <div className={className} onClick={() => this.props.onStudentClick()}>
        <span className={'blue-title'}>{this.props.student.display_name}</span>
        <br />
        <br />
        <div className={'gray-text'}>
          <span className={'green-completed-box'}>
            <span title={'Completed'} className='glyphicon glyphicon-ok' />&nbsp; 1
          </span>
          <span className={'red-missed-box'}>
            <span title={'Missed'} className='glyphicon glyphicon-remove' />&nbsp; -
          </span>
        </div>
      </div>
    )
  }
}

TeacherStudentCard.propTypes = {
  student: PropTypes.object,
  onStudentClick: PropTypes.func.isRequired
}
