import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { push } from 'connected-react-router'

import { Grid, Row, Col } from 'react-bootstrap'

import * as classroomCreators from '../../actions/classroom'

import { BASE_URL } from '../../utils/config'

class StudentClassroomView extends React.Component {
  componentWillMount () {
    this.props.classroomActions.classroomFetchStudentClassroom(this.props.match.params['uuid'])
  }
  render () {
    return (
      <Grid fluid>
        { this.props.classroomStudent
          ? <div className={'student-classroom-row'}>
            <Row>
              <Col sm={10} md={10}>
                <span className={'blue-title'}>{this.props.classroomStudent.name}</span>
              </Col>
              <Col sm={2} md={2}>
                <span onClick={() => this.props.dispatch(push(BASE_URL))} className={'pib-link'}>Assignments</span>
              </Col>
            </Row>
            <Row>
              <Col sm={10} md={10} />
              <Col sm={2} md={2}>
                <span onClick={() => this.props.classroomActions.classroomLeaveStudentClassroom(this.props.classroomStudent)} className={'gray-link'}>Leave classroom</span>
              </Col>
            </Row></div>
          : null }
      </Grid>)
  }
}

StudentClassroomView.propTypes = {
  classroomActions: PropTypes.shape({
    classroomFetchStudentClassroom: PropTypes.func.isRequired,
    classroomLeaveStudentClassroom: PropTypes.func.isRequired
  }).isRequired,
  classroom: PropTypes.shape()
}

const mapStateToProps = (state) => {
  return {
    classroomStudent: state.classroom.classroomStudentClassroom
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    classroomActions: bindActionCreators(classroomCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentClassroomView)
export { StudentClassroomView as StudentViewNotConnected }
