import React from 'react'
import PropTypes from 'prop-types'

export class TeacherStudentAssignmentRow extends React.Component {
  // Row to swon user inside assignment view
  render () {
    var className = 'classroom-row pointer'

    return (
      <div className={className}>
      {/*<div className={className} onClick={() => this.props.onStudentClick()}>*/}
        {/*<span className={'blue-title'}>{this.props.student.display_name}</span>*/}
        <br />
        Here is wiil be studend assignment statistics
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

TeacherStudentAssignmentRow.propTypes = {
  // student: PropTypes.object,
  // onStudentClick: PropTypes.func.isRequired
}
