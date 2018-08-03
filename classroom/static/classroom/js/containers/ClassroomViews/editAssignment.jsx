import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// import { push } from 'connected-react-router'

import DatePicker from 'react-bootstrap-date-picker'
import TimePicker from 'react-bootstrap-time-picker'

import DropdownTreeSelect from 'react-dropdown-tree-select'

import { Grid, Row, Col } from 'react-bootstrap'

// import { Grid, Row, Col, InputGroup, FormControl, Modal, Button } from 'react-bootstrap'

// import * as classroomCreators from '../../actions/classroom'
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

    this.state = {
      lessonsTreeData: [],
      selectedLessons: [],
      startDate: null,
      dueDate: null,
      startTime: 3600,
      dueTime: 3600,
      assignmentIsValid: false
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
    this.copySelectedNodesToTree(this.state.lessonsTreeData)
    this.validateAssignment()
  }

  onLessonTreeChange (currentNode, selectedNodes) {
    this.setState({selectedLessons: selectedNodes}, this.copyValidateTree)
  }

  copySelectedNodesToTree (treeNodes) {
    for (var x = 0; x < treeNodes.length; x++) {
      treeNodes[x].checked = false // unchek by default
      for (var y = 0; y < this.state.selectedLessons.length; y++) {
        if (this.state.selectedLessons[y].value === treeNodes[x].value) {
          // copy all data from changed node
          // Object.assign(treeNodes[x], this.state.selectedLessons[y])
          console.log(treeNodes[x].checked);
          treeNodes[x].checked = this.state.selectedLessons[y].checked
        }
      }
      if (treeNodes[x].hasOwnProperty('children')) {
        // walk by children
        this.copySelectedNodesToTree(treeNodes[x].children)
      }
    }
  }

  validateAssignment () {
    if (!this.state.startDate ||
        !this.state.dueDate ||
        !this.state.startTime ||
        !this.state.dueTime ||
        this.state.selectedLessons.length === 0) {
      this.setState({assignmentIsValid: false})
    } else {
      this.setState({assignmentIsValid: true})
    }
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
            <button className={'classroom-common-button' + (this.state.assignmentIsValid ? '' : ' disabled-button')} disabled={!this.state.assignmentIsValid}>Shedule assignment</button>
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
