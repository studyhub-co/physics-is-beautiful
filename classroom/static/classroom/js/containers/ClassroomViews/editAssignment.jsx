import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// import { push } from 'connected-react-router'

import DatePicker from 'react-bootstrap-date-picker'
import TimePicker from 'react-bootstrap-time-picker'

import DropdownTreeSelect from 'react-dropdown-tree-select'

import { Grid, Row, Col, FormControl } from 'react-bootstrap'

import * as assignmentCreators from '../../actions/assignment'
import * as curriculaCreators from '../../actions/curricula'

// import { BASE_URL } from '../../utils/config'

class EditAssignmentView extends React.Component {

  constructor (props) {
    super(props)
    this.handleStartOn = this.handleStartOn.bind(this)
    this.handleDueOn = this.handleDueOn.bind(this)
    this.handleStartTimeChange = this.handleStartTimeChange.bind(this)
    this.handleDueTimeChange = this.handleDueTimeChange.bind(this)
    this.onLessonTreeChange = this.onLessonTreeChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.saveAssignment = this.saveAssignment.bind(this)

    this.state = {
      lessonsTreeData: [],
      selectedLessons: [],
      startDate: null,
      dueDate: null,
      startTime: 36000,
      dueTime: 36000,
      assignmentIsValid: false,
      assignmentName: ''
    }
  }

  componentWillMount () {
    this.props.curriculaActions.curriculaFetchExpandedCurriculum(this.props.classroomTeacher.curriculum.uuid)
  }

  componentWillReceiveProps (props) {
    if (props.curriculumExpanded && props.curriculumExpanded.units.length > 0 && this.state.lessonsTreeData.length === 0) {
      // populate with modulesTreeData
      var newLessonsTreeData = []
      newLessonsTreeData = this.addChildren(props.curriculumExpanded.units)
      this.setState({lessonsTreeData: newLessonsTreeData})
    }
  }

  handleStartOn (value) {
    this.setState({startDate: value}, this.validateAssignment)
  }
  handleDueOn (value) {
    this.setState({dueDate: value}, this.validateAssignment)
  }

  handleStartTimeChange (value) {
    this.setState({startTime: value}, this.validateAssignment)
  }

  handleDueTimeChange (value) {
    this.setState({dueTime: value}, this.validateAssignment)
  }

  copyValidateTree (value) {
    this.copyCheckStateNodesToTree(this.state.lessonsTreeData)
    this.validateAssignment()
  }

  handleNameChange (e) {
    this.setState({ assignmentName: e.target.value }, this.validateAssignment)
  }

  onLessonTreeChange (currentNode, selectedNodes) {
    this.setState({selectedLessons: selectedNodes}, this.copyValidateTree)
  }

  copyCheckStateNodesToTree (treeNodes) {
    for (var x = 0; x < treeNodes.length; x++) {
      treeNodes[x].checked = false // unchek by default
      for (var y = 0; y < this.state.selectedLessons.length; y++) {
        if (this.state.selectedLessons[y].value === treeNodes[x].value) {
          treeNodes[x].checked = this.state.selectedLessons[y].checked
        }
      }
      if (treeNodes[x].hasOwnProperty('children')) {
        // walk on children
        this.copyCheckStateNodesToTree(treeNodes[x].children)
      }
    }
  }

  validateAssignment () {
    if (!this.state.startDate ||
        !this.state.dueDate ||
        !this.state.startTime ||
        !this.state.dueTime ||
        !this.state.assignmentName ||
        this.state.selectedLessons.length === 0) {
      this.setState({assignmentIsValid: false})
    } else {
      this.setState({assignmentIsValid: true})
    }
  }

  saveAssignment () {
    var lessonsUuids = []

    for (var x = 0; x < this.state.selectedLessons.length; x++ ) {
      lessonsUuids.push(this.state.selectedLessons[x].value)
    }

    var startDateTime = new Date(this.state.startDate)
    startDateTime.setHours(0, 0, 0, 0)
    startDateTime.setSeconds(startDateTime.getSeconds() + this.state.startTime)
    var dueDateTime = new Date(this.state.dueDate)
    dueDateTime.setSeconds(dueDateTime.getSeconds() + this.state.dueTime)

    var assignmentJson = {
      name: this.state.assignmentName,
      start_on: startDateTime.toISOString(),
      due_on: dueDateTime.toISOString(),
      classroom_uuid: this.props.classroomTeacher.uuid,
      lessons_uuids: lessonsUuids
    }

    this.props.assignmentActions.assignmentCreateAssignment(assignmentJson)
    this.props.assignmentActions.assignmentFetchAssignmentList(this.props.classroomTeacher.uuid)
    // close Window
    if (typeof this.props.onSave === 'function') { this.props.onSave() }
  }

  addChildren (children) {
    var data = []
    for (var i = 0; i < children.length; i++) {
      if (children[i].hasOwnProperty('modules') || children[i].hasOwnProperty('lessons')) {
        var childrenAttr
        if (children[i].hasOwnProperty('modules')) { childrenAttr = 'modules' }
        if (children[i].hasOwnProperty('lessons')) { childrenAttr = 'lessons' }
        var newchildren = this.addChildren(children[i][childrenAttr])
        data.push({
          label: children[i].name,
          value: children[i].uuid,
          children: newchildren,
          expanded: true,
          disabled: true
        })
      } else {
        data.push({
          label: children[i].name,
          value: children[i].uuid,
          disabled: false })
      }
    }
    return data
  }

  render () {
    return (
      <Grid fluid>
        <Row>
          <Col sm={3} md={3} className={'text-right'}>
            Name
          </Col>
          <Col sm={9} md={9}>
            <FormControl
              type='text'
              value={this.state.assignmentName}
              placeholder='Enter name'
              onChange={this.handleNameChange}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col sm={3} md={3} className={'text-right'}>
            Assignment
          </Col>
          <Col sm={9} md={9}>
            <DropdownTreeSelect onChange={this.onLessonTreeChange} data={this.state.lessonsTreeData} placeholderText={'Pick a goal skill'} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col sm={3} md={3} className={'text-right'}>
            Start on
          </Col>
          <Col sm={6} md={6}>
            <DatePicker onChange={this.handleStartOn} value={this.state.startDate} />
          </Col>
          <Col sm={3} md={3}>
            <TimePicker
              onChange={this.handleStartTimeChange}
              start='10:00'
              end='21:00'
              step={60}
              value={this.state.startTime} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col sm={3} md={3} className={'text-right'}>
            Due on
          </Col>
          <Col sm={6} md={6}>
            <DatePicker onChange={this.handleDueOn} value={this.state.dueDate} />
          </Col>
          <Col sm={3} md={3}>
            <TimePicker
              onChange={this.handleDueTimeChange}
              start='10:00'
              end='21:00'
              step={60}
              value={this.state.dueTime} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col sm={12} md={12} className={'text-center'}>
            <button
              className={'classroom-common-button' + (this.state.assignmentIsValid ? '' : ' disabled-button')}
              disabled={!this.state.assignmentIsValid}
              onClick={this.saveAssignment}>
              Shedule assignment
            </button>
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
  classroomTeacher: PropTypes.object.isRequired,
  assignmentActions: PropTypes.shape({
    assignmentCreateAssignment: PropTypes.func.isRequired,
    assignmentFetchAssignmentList: PropTypes.func.isRequired
  }).isRequired,
  onSave: PropTypes.func
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
    curriculaActions: bindActionCreators(curriculaCreators, dispatch),
    assignmentActions: bindActionCreators(assignmentCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAssignmentView)
export { EditAssignmentView as EditAssigmentsViewNotConnected }
