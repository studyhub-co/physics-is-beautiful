import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { push } from 'connected-react-router'

import * as assignmentCreators from '../../actions/assignment'
import * as tabsCreators from '../../actions/tab'

import { EditAssignmentView } from '../index'
import { Grid, Row, Col, Image, Modal, Dropdown, Glyphicon, MenuItem} from 'react-bootstrap'
import { BASE_URL } from '../../utils/config'
import history from '../../history'
import { TeacherStudentAssignmentRow } from '../../components/TeacherStudentAssignmentRow'

export class AssignmentTeacherView extends React.Component {
  constructor (props) {
    super(props)
    this.handleEditAssignmentModal = this.handleEditAssignmentModal.bind(this)
    this.handleSettingsClick = this.handleSettingsClick.bind(this)

    this.state = {
      showEditAssigment: false
    }
  }

  componentWillMount () {
    this.props.tabActions.changeSelectedTab('teacher', 'tab', true)
    this.props.tabActions.changeTeacherClassroomSelectedTab('assignments', 'teacherClassroomTab')
    this.props.assignmentActions.assignmentFetchAssignment(this.props.match.params['uuid'], this.props.match.params['assigmentUuid'])
  }

  handleEditAssignmentModal () {
    this.setState({
      showEditAssigment: !this.state.showEditAssigment
    })
  }

  handleSettingsClick (e) {
    if (e === 'edit') {
      this.handleEditAssignmentModal()
    } else if (e === 'delete') {
      this.props.assignmentActions.assignmentDeleteAssignment(
        this.props.match.params['uuid'],
        this.props.match.params['assigmentUuid'],
        true,
        () => { this.props.dispatch(push(BASE_URL + this.props.match.params['uuid'] + '/teacher/')) }
      )
    }
  }

  render () {
    var className = 'assignment-teacher-card'
    var dateText = ''
    if (this.props.assignment) {
      dateText = 'Assigned on ' + new Date(this.props.assignment.due_on).toLocaleDateString() + ' ' +
                new Date(this.props.assignment.due_on).toLocaleTimeString() +
                ' and due on ' + new Date(this.props.assignment.start_on).toLocaleDateString() + ' ' +
                new Date(this.props.assignment.start_on).toLocaleTimeString()
    }
    return (
      <div>
        <Grid fluid>
          <Row style={{padding: '2rem 0'}}>
            <Col sm={6} md={6}>
              <a className={'pointer'} onClick={() => { history.push(BASE_URL + this.props.match.params['uuid'] + '/teacher/') }}>{'< All assignment'}</a>
            </Col>
            <Col sm={6} md={6} className={'text-right'}>
              <Dropdown onSelect={this.handleSettingsClick} id='dropdown-settings'>
                <Dropdown.Toggle className={'classroom-common-button'}>
                  <Glyphicon glyph='cog' />&nbsp;
                  Manage assignment
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <MenuItem eventKey='delete'>Delete assignment</MenuItem>
                  {/*<MenuItem eventKey='send'>Send reminder</MenuItem>*/}
                  <MenuItem eventKey='edit'>Edit assignment</MenuItem>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Grid>
        <Grid fluid>
          <Row className={className}>
            <Col sm={1} md={1}>
              {this.props.assignment && this.props.assignment.lessons[0].image
                ? <Image
                  className={'pointer'}
                  width={'100%'}
                  src={this.props.assignment.lessons[0].image}
                  circle />
                : null}
            </Col>
            <Col sm={6} md={6}>
              <div className={'blue-title pointer'}>{this.props.assignment ? this.props.assignment.name : null}</div>
              <div className={'gray-text small-text'}>
                {this.props.assignment ? this.props.assignment.lessons.length : null}&nbsp;
                lesson{this.props.assignment && this.props.assignment.lessons.length > 1 ? 's' : null}
              </div>
            </Col>
            <Col sm={5} md={5} className={'text-right'}>
              <div className={'gray-text'}>
                <span className={'green-completed-box'}>
                  <span title={'Completed'} className='glyphicon glyphicon-ok' />
                  &nbsp;{this.props.assignment ? this.props.assignment.count_students_completed_assingment : null}
                </span>
                &nbsp;
                <span className={'yellow-delayed-box'}>
                  <span title={'Missed'} className='glyphicon glyphicon-time' />
                  &nbsp;{this.props.assignment ? this.props.assignment.count_students_delayed_assingment : null}
                </span>
                &nbsp;
                <span className={'red-missed-box'}>
                  <span title={'Missed'} className='glyphicon glyphicon-remove' />
                  &nbsp;{this.props.assignment ? this.props.assignment.count_students_completed_assingment : null}
                </span>
              </div>
              <br />
              <div className={'gray-text small-text'}>
                {dateText}
              </div>
            </Col>
          </Row>
          <hr />
        </Grid>
        <Grid fluid>
          <Row className={''}>
           <TeacherStudentAssignmentRow />
          </Row>
        </Grid>
        { this.state.showEditAssigment
          ? <Modal
            show={this.state.showEditAssigment}
            onHide={this.handleEditAssignmentModal}
            container={this} >
            <Modal.Header closeButton>
              <Modal.Title>{this.props.assignment ? 'Edit' : 'Create'}  an assignment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <EditAssignmentView createNew={false} assignment={this.props.assignment} onSave={this.handleEditAssignmentModal} />
            </Modal.Body>
            <Modal.Footer>
              <div className={'gray-link'} onClick={this.handleCreateAssigment}>Back</div>
            </Modal.Footer>
          </Modal> : null
        }
      </div>
    )
  }
}

AssignmentTeacherView.propTypes = {
  assignment: PropTypes.object,
  tabActions: PropTypes.shape({
    changeTeacherClassroomSelectedTab: PropTypes.func.isRequired
  }).isRequired,
  assignmentActions: PropTypes.shape({
    assignmentFetchAssignment: PropTypes.func.isRequired,
    assignmentDeleteAssignment: PropTypes.func.isRequired
  }).isRequired
}

const mapStateToProps = (state) => {
  return {
    // classroomStudent: state.classroom.classroomStudentClassroom
    classroomTeacher: state.classroom.classroomTeacherClassroom,
    assignment: state.assignment.assignment
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    assignmentActions: bindActionCreators(assignmentCreators, dispatch),
    tabActions: bindActionCreators(tabsCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentTeacherView)
export { AssignmentTeacherView as AssignmentTeacherViewNotConnected }
