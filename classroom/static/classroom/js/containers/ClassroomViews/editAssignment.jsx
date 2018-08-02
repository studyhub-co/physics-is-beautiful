import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// import { push } from 'connected-react-router'

import DatePicker from 'react-bootstrap-date-picker'
import TimePicker from 'react-bootstrap-time-picker'

import DropdownTreeSelect from 'react-dropdown-tree-select'

import { Grid, Row, Col, Button } from 'react-bootstrap'

// import { Grid, Row, Col, InputGroup, FormControl, Modal, Button } from 'react-bootstrap'

// import * as classroomCreators from '../../actions/classroom'
import * as curriculaCreators from '../../actions/curricula'

// import { BASE_URL } from '../../utils/config'

class EditAssignmentView extends React.Component {

  constructor (props) {
    super(props)
    // this.handleTitleChange = this.handleTitleChange.bind(this)
    // this.handleCreateAssigment = this.handleCreateAssigment.bind(this)

    this.state = {
      lessonsTreeData: []
    }
  }

  componentWillMount () {
    console.log(this.props.classroomTeacher);
    this.props.curriculaActions.curriculaFetchExpandedCurriculum(this.props.classroomTeacher.curriculum.uuid)
  }

  handleStartOn (value) {
    console.log(value)
  }
  handleDueOn (value) {
    console.log(value)
  }

  componentWillReceiveProps (props) {
    if (props.curriculumExpanded && props.curriculumExpanded.units.length > 0 && this.state.lessonsTreeData.length === 0) {
      // populate with modulesTreeData
      var newLessonsTreeData = []

      for (var i = 0; i < props.curriculumExpanded.units.length; i++) {
        var modules = []
        for (var j = 0; j < props.curriculumExpanded.units[i].modules.length; j++) {
          var lessons = []
          for (var x = 0; x < props.curriculumExpanded.units[i].modules[j].lessons.length; x++) {
            var lesson = props.curriculumExpanded.units[i].modules[j].lessons[x]
            // lessons
            lessons.push({
              label: lesson.name,
              value: lesson.value,
              disabled: false
            })
          }
          var module = props.curriculumExpanded.units[i].modules[j]
          // modules
          modules.push({
            label: module.name,
            value: module.value,
            children: lessons,
            expanded: true,
            disabled: true
          })
        }
        var unit = props.curriculumExpanded.units[i]
        // units
        newLessonsTreeData.push({
          label: unit.name,
          value: unit.uuid,
          children: modules,
          expanded: true,
          disabled: true
        })
      }
      console.log(newLessonsTreeData);
      this.setState({lessonsTreeData: newLessonsTreeData})
    }
  }

  validateAssignment (){

  }

  render () {
    return (
      <Grid fluid>
        <Row>
          <Col sm={3} md={3} className={'text-right'}>
            Assignment
          </Col>
          <Col sm={9} md={9}>
            <DropdownTreeSelect data={this.state.lessonsTreeData} placeholderText={'Pick a goal skill'} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col sm={3} md={3} className={'text-right'}>
            Start on
          </Col>
          <Col sm={6} md={6}>
            <DatePicker onChange={this.handleStartOn} />
          </Col>
          <Col sm={3} md={3}>
            <TimePicker start='10:00' end='21:00' step={30} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col sm={3} md={3} className={'text-right'}>
            Due on
          </Col>
          <Col sm={6} md={6}>
            <DatePicker onChange={this.handleDueOn} />
          </Col>
          <Col sm={3} md={3}>
            <TimePicker start='10:00' end='21:00' step={30} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col sm={12} md={12} className={'text-center'}>
            <Button className={'classroom-common-button'}>Shedule assignment</Button>
          </Col>
        </Row>
      </Grid>)
  }
}

EditAssignmentView.propTypes = {
  curriculaActions: PropTypes.shape({
    curriculaFetchExpandedCurriculum: PropTypes.func.isRequired
  }).isRequired,
  curriculumExpanded: PropTypes.object,
  classroomTeacher: PropTypes.object.isRequired
  // classroomActions: PropTypes.shape({
  //   classroomFetchStudentClassroom: PropTypes.func.isRequired,
  //   classroomLeaveStudentClassroom: PropTypes.func.isRequired
  // }).isRequired,
  // classroom: PropTypes.shape()
}

const mapStateToProps = (state) => {
  return {
    // classroomStudent: state.classroom.classroomStudentClassroom
    classroomTeacher: state.classroom.classroomTeacherClassroom,
    curriculumExpanded: state.curricula.curriculumExpanded
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    curriculaActions: bindActionCreators(curriculaCreators, dispatch)
    // classroomActions: bindActionCreators(classroomCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAssignmentView)
export { EditAssignmentView as EditAssigmentsViewNotConnected }
