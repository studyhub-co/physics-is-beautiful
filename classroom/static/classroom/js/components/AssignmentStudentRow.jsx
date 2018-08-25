import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {Row, Col, Image} from 'react-bootstrap'
import * as assignmentCreators from '../actions/assignment'

class AssignmentStudentRow extends React.Component {
  constructor (props) {
    super(props)
    this.onLessonClick = this.onLessonClick.bind(this)
  }

  onLessonClick (lesson) {
    if (lesson.lesson_type === 'GAME') {
      window.location.href = '/curriculum/games/' + lesson.uuid + '/' + lesson.game_slug
    } else {
      window.location.href = '/curriculum/lessons/' + lesson.uuid
    }
  }

  componentWillMount () {
    if (!this.props.assignment.completed_on && !this.props.assignment.delayed_on) {
      // load lessons list
      this.props.assignmentActions.assignmentFetchStudentLessonsList(this.props.classrroom_uuid, this.props.assignment.uuid)
    }
  }

  render () {
    var className = 'student-classroom-row'

    var dueDateTime = null

    var textColorClassName = 'green-text'
    if (!this.props.assignment.completed_on && !this.props.assignment.delayed_on) {
      if (new Date(this.props.assignment.due_on) < new Date()) {
        textColorClassName = 'red-text'
      } else {
        textColorClassName = 'gray-text'
      }
    } else if (this.props.assignment.delayed_on) {
      textColorClassName = 'yellow-text'
    }

    if (this.props.assignment.due_on) {
      dueDateTime = new Date(this.props.assignment.due_on).toLocaleDateString() + ' ' + new Date(this.props.assignment.due_on).toLocaleTimeString()
    }

    return (
      <Row className={className}>
        <Col sm={12} md={12}>
          <Row>
            <Col sm={1} md={1}>
              <div className={'gray-text small-text'}>
                {this.props.assignment && this.props.assignment.image
                  ? <Image
                    responsive
                    src={this.props.assignment.image}
                    circle />
                  : null}
              </div>
            </Col>
            <Col sm={4} md={4}>
              { this.props.assignment.completed_on || this.props.assignment.delayed_on // TODO check start date
                ? <div className={'blue-title'}>{this.props.assignment.name}</div>
                : <div className={'blue-title pointer'} onClick={this.props.onTitleClick}>{this.props.assignment.name}</div>
              }
              <div className={'gray-text small-text'}>
                {this.props.assignment.count_lessons} lesson{this.props.assignment.count_lessons > 1 ? 's' : null}
              </div>
            </Col>
            <Col sm={4} md={4} className={'vcenter'}>
              { this.props.assignment.completed_on &&
                new Date(this.props.assignment.due_on) > new Date(this.props.assignment.completed_on)
                ? <div className={textColorClassName}>Completed</div>
                : null }
              { this.props.assignment.delayed_on
                ? <div className={textColorClassName}>Completed late</div>
                : null }
              { !this.props.assignment.completed_on && !this.props.assignment.delayed_on
                ? <div>
                  {new Date(this.props.assignment.due_on) > new Date()
                    ? <div className={textColorClassName}>Due:&nbsp;{dueDateTime}</div> : null }
                  {new Date(this.props.assignment.due_on) < new Date()
                    ? <div className={textColorClassName}>Past due:&nbsp;{dueDateTime}</div> : null }
                </div> : null }

            </Col>
            <Col sm={2} md={2} className={'vcenter'}>
              <div className={textColorClassName}>
                {this.props.assignment.count_completed_lessons} / {this.props.assignment.count_lessons}
              </div>
            </Col>
            <Col sm={1} md={1} className={'vcenter'}>
              { textColorClassName === 'green-text'
                ? <span className='glyphicon glyphicon-ok-sign' style={{color: 'green', fontSize: '3rem'}} /> : null }
              { textColorClassName === 'red-text'
                ? <span className='glyphicon glyphicon-exclamation-sign' style={{color: 'red', fontSize: '3rem'}} /> : null }
              { textColorClassName === 'yellow-text'
                ? <span className='glyphicon glyphicon-time yellow-text' style={{fontSize: '3rem'}} /> : null }
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={12}>
              { this.props.assignmentsStudentLessonsList && this.props.assignmentsStudentLessonsList[this.props.assignment.uuid]
                ? this.props.assignmentsStudentLessonsList[this.props.assignment.uuid].map(function (lesson, i) {
                  return <span
                    className={'basic-card'}
                    style={{width: '20rem', height: '15rem', cursor: 'pointer'}}
                    onClick={() => { this.onLessonClick(lesson) }} key={i}>
                    <Image
                      responsive
                      src={lesson.image}
                      width={'80%'}
                      rounded
                      style={{display: 'inline-block', top: '0', height: '80%'}}
                    />
                    <div>
                      {lesson.name}
                    </div>
                  </span>
                }, this) : null}
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

AssignmentStudentRow.propTypes = {
  assignment: PropTypes.object.isRequired,
  onTitleClick: PropTypes.func,
  assignmentsStudentLessonsList: PropTypes.object,
  classrroom_uuid: PropTypes.string.isRequired,
  assignmentActions: PropTypes.shape({
    assignmentFetchStudentLessonsList: PropTypes.func.isRequired
  }).isRequired
}

const mapStateToProps = (state) => {
  return {
    assignmentsStudentLessonsList: state.assignment.assignmentsStudentLessonsList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    assignmentActions: bindActionCreators(assignmentCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentStudentRow)
export { AssignmentStudentRow as AssignmentStudentRowNotConnected }
