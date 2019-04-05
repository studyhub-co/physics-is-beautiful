import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import AssignmentStudentRow from '../../components/AssignmentStudentRow'

import { push } from 'connected-react-router'

import { Container, Row, Col, Modal, Button } from 'react-bootstrap'

import { BASE_URL } from '../../utils/config'

import * as classroomCreators from '../../actions/classroom'
import * as assignmentCreators from '../../actions/assignment'

class StudentClassroomView extends React.Component {
  constructor (props) {
    super(props)
    this.handleLeaveClassromModal = this.handleLeaveClassromModal.bind(this)
    this.leaveClassroom = this.leaveClassroom.bind(this)

    this.state = { showLeaveClassroomModal: false }
  }

  componentWillMount () {
    this.props.classroomActions.classroomFetchStudentClassroom(this.props.match.params['uuid'])
    this.props.assignmentActions.assignmentFetchAssignmentList(this.props.match.params['uuid'])
  }

  onAssignmentTitleClick (assignment) {
    // redirect to first uncompleted lesson
    this.props.assignmentActions.assignmentFetchFirstUncompletedLesson(this.props.match.params['uuid'], assignment.uuid)
  }

  componentWillReceiveProps (props) {
    if (!this.props.uncompletedLesson && props.uncompletedLesson) {
      if (props.uncompletedLesson.lesson_type === 'GAME') {
        window.location.href = '/curriculum/games/' + props.uncompletedLesson.uuid + '/' + props.uncompletedLesson.game_slug
      } else {
        window.location.href = '/curriculum/lessons/' + props.uncompletedLesson.uuid
      }
    }
  }

  leaveClassroom () {
    this.props.classroomActions.classroomLeaveStudentClassroom(this.props.classroomStudent)
  }

  handleLeaveClassromModal () {
    this.setState({ showLeaveClassroomModal: !this.state.showLeaveClassroomModal })
  }

  render () {
    return (
      <Container fluid>
        { this.props.classroomStudent
          ? <div className={'student-classroom-row'}>
            <Row>
              <Col sm={10} md={10}>
                <span className={'blue-title'}>{this.props.classroomStudent.name}</span>
              </Col>
              <Col sm={2} md={2}>
                <span onClick={() => this.props.dispatch(push(BASE_URL))} className={'gray-link blue-on-hover'}>Assignments</span>
              </Col>
            </Row>
            <Modal container={this} show={this.state.showLeaveClassroomModal} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Confirm leaving</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to permanently leave this classroom?
              </Modal.Body>
              <Modal.Footer>
                <button className={'classroom-common-button'} onClick={this.leaveClassroom}>Leave</button>
                &nbsp;
                <Button onClick={this.handleLeaveClassromModal}>Close</Button>
              </Modal.Footer>
            </Modal>
            { this.props.assignmentsList
              ? this.props.assignmentsList.map(function (assignment, i) {
                return <AssignmentStudentRow
                  // isTeacher={Boolean(false)}
                  classrroom_uuid={this.props.match.params['uuid']}
                  assignment={assignment}
                  onTitleClick={() => { this.onAssignmentTitleClick(assignment) }}
                  key={i} />
              }, this) : null}
            <Row>
              <Col sm={10} md={10} />
              <Col sm={2} md={2}>
                <span onClick={this.handleLeaveClassromModal} className={'gray-link'}>Leave classroom</span>
              </Col>
            </Row></div>
          : null }

      </Container>)
  }
}

StudentClassroomView.propTypes = {
  classroomActions: PropTypes.shape({
    classroomFetchStudentClassroom: PropTypes.func.isRequired,
    classroomLeaveStudentClassroom: PropTypes.func.isRequired
  }).isRequired,
  assignmentActions: PropTypes.shape({
    assignmentFetchAssignmentList: PropTypes.func.isRequired,
    assignmentFetchFirstUncompletedLesson: PropTypes.func.isRequired
  }).isRequired,
  // classroom: PropTypes.object,
  assignmentsList: PropTypes.array,
  uncompletedLesson: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    classroomStudent: state.classroom.classroomStudentClassroom,
    assignmentsList: state.assignment.assignmentsList,
    uncompletedLesson: state.assignment.uncompletedLesson
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    classroomActions: bindActionCreators(classroomCreators, dispatch),
    assignmentActions: bindActionCreators(assignmentCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentClassroomView)
export { StudentClassroomView as StudentViewNotConnected }
