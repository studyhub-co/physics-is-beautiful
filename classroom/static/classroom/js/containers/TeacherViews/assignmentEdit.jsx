import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { RingLoader } from 'react-spinners'

// import { push } from 'connected-react-router'

import DatePicker from 'react-bootstrap-date-picker'
import TimePicker from 'react-bootstrap-time-picker'

import DropdownTreeSelect from 'react-dropdown-tree-select'

import { Grid, Row, Col, FormControl, Checkbox } from 'react-bootstrap'

import * as assignmentCreators from '../../actions/assignment'
import * as curriculaCreators from '../../actions/curricula'

// import { BASE_URL } from '../../utils/config'

const DEFAULT_STATE = {
  lessonsTreeData: [], // data for multiselect
  selectedLessons: [], // data from multiselect
  startDate: null,
  _ispopulated: false,
  dueDate: null,
  startTime: 36000,
  dueTime: 36000,
  sendEmail: false,
  assignmentIsValid: false,
  assignmentName: ''
}

class AssignmentEdit extends React.Component {
  constructor (props) {
    super(props)
    this.handleStartOn = this.handleStartOn.bind(this)
    this.handleDueOn = this.handleDueOn.bind(this)
    this.handleStartTimeChange = this.handleStartTimeChange.bind(this)
    this.handleDueTimeChange = this.handleDueTimeChange.bind(this)
    this.onLessonTreeChange = this.onLessonTreeChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.saveAssignment = this.saveAssignment.bind(this)
    this.handleSendEmailChange = this.handleSendEmailChange.bind(this)

    this.state = Object.assign({}, DEFAULT_STATE)

    this.props.curriculaActions.curriculaFetchExpandedCurriculum(this.props.classroomTeacher.curriculum.uuid)
  }

  componentWillUnmount () {
    this.setState({_ispopulated: false})
  }

  setIsPopulated () {
    this.setState({_ispopulated: true})
  }

  componentWillReceiveProps (props) {
    var newLessonsTreeData = []
    if (props.curriculumExpanded) {
      if (props.curriculumExpanded.units.length > 0 &&
        this.state.lessonsTreeData.length === 0) {
        // populate with modulesTreeData
        newLessonsTreeData = this.addChildren(props.curriculumExpanded.units)
      }
      if (this.props.createNew) {
        this.setState(Object.assign({}, DEFAULT_STATE, {lessonsTreeData: newLessonsTreeData}),
          this.setIsPopulated) // reset tree selection
      } else {
        this.setState({lessonsTreeData: newLessonsTreeData}, this.reloadFromAssignment)
      }
    }
  }

  reloadFromAssignment () {
    if (this.props.assignment && !this.props.createNew) {
      // Edit assignment
      var startDate = new Date(this.props.assignment.start_on)
      var dueDate = new Date(this.props.assignment.due_on)

      this.setState({
        startDate: this.props.assignment.start_on,
        startTime: startDate.getHours() * 60 * 60,
        dueDate: this.props.assignment.due_on,
        sendEmail: this.props.assignment.send_email,
        dueTime: dueDate.getHours() * 60 * 60,
        assignmentName: this.props.assignment.name
      }, this.copyNodesFromAssignmentValidate) // copy selected lessons from assignment
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

  handleSendEmailChange (e) {
    this.setState({sendEmail: !this.state.sendEmail})
  }

  copyValidateTree () {
    this.copyCheckStateNodesToTree(this.state.lessonsTreeData)
    this.validateAssignment()
  }

  handleNameChange (e) {
    this.setState({ assignmentName: e.target.value }, this.validateAssignment)
  }

  onLessonTreeChange (currentNode, selectedNodes) {
    this.setState({ selectedLessons: selectedNodes }, this.copyValidateTree)
  }

  /**
   * copy selected nodes from selectedLessons (from multiselect) to lessonsTreeData
   * @param treeNodes
   */
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

  /**
   *  copy cheked nodes to selectedLessons
   */
  copyNodesFromAssignmentValidate () {
    var selectedLessons = []
    for (var x = 0; x < this.props.assignment.lessons.length; x++) {
      var checkedLesson = this.props.assignment.lessons[x]
      selectedLessons.push({
        label: checkedLesson.name,
        value: checkedLesson.uuid,
        checked: true,
        disabled: false
      })
    }
    this.setState({
      selectedLessons: selectedLessons
    }, () => { this.validateAssignment(); this.setIsPopulated() })
  }

  validateAssignment () {
    if (!this.state.startDate ||
        !this.state.dueDate ||
        this.state.startTime == null ||
        this.state.dueTime == null ||
        !this.state.assignmentName ||
        this.state.selectedLessons.length === 0 ||
        this.state.startDate > this.state.dueDate || // if start date > due date
        new Date(this.state.dueDate) < new Date()) { // if due date < date now
      this.setState({assignmentIsValid: false})
    } else {
      this.setState({assignmentIsValid: true})
    }
  }

  saveAssignment () {
    var lessonsUuids = []

    for (var x = 0; x < this.state.selectedLessons.length; x++) {
      lessonsUuids.push(this.state.selectedLessons[x].value)
    }

    var startDateTime = new Date(this.state.startDate)
    startDateTime.setHours(0, 0, 0, 0)
    startDateTime.setSeconds(startDateTime.getSeconds() + this.state.startTime)
    var dueDateTime = new Date(this.state.dueDate)
    dueDateTime.setHours(0, 0, 0, 0)
    dueDateTime.setSeconds(dueDateTime.getSeconds() + this.state.dueTime)

    var assignmentJson = {
      name: this.state.assignmentName,
      start_on: startDateTime.toISOString(),
      due_on: dueDateTime.toISOString(),
      classroom_uuid: this.props.classroomTeacher.uuid,
      lessons_uuids: lessonsUuids,
      send_email: this.state.sendEmail
    }
    if (this.props.assignment && this.props.assignment.uuid && !this.props.createNew) {
      // update
      assignmentJson.uuid = this.props.assignment.uuid
      this.props.assignmentActions.assignmentPartialUpdateAssignment(assignmentJson, true)
    } else {
      // save
      this.props.assignmentActions.assignmentCreateAssignment(assignmentJson, true)
    }
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
        // lesson
        var checked = false
        if (this.props.assignment && this.props.assignment.uuid && !this.props.createNew) {
          for (var y = 0; y < this.props.assignment.lessons.length; y++) {
            if (this.props.assignment.lessons[y].uuid === children[i].uuid) {
              checked = true
              break
            }
          }
        }
        data.push({
          label: children[i].name,
          value: children[i].uuid,
          checked: checked,
          disabled: false })
      }
    }
    return data
  }

  render () {
    return (
      <div>{ this.state._ispopulated
        ? <Grid fluid>
          <Row className={'vcenter'}>
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
                start='01:00'
                end='24:00'
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
                start='01:00'
                end='24:00'
                step={60}
                value={this.state.dueTime} />
            </Col>
          </Row>
          <Row className={'vcenter'}>
            <Col sm={3} md={3} className={'text-right'}>
              Email
            </Col>
            <Col sm={9} md={9}>
              <Checkbox
                defaultChecked={this.state.sendEmail}
                onClick={this.handleSendEmailChange}
              > Send email notification</Checkbox>
            </Col>
          </Row>
          <br />
          <Row>
            <Col sm={12} md={12} className={'text-center'}>
              <button
                className={'classroom-common-button' + (this.state.assignmentIsValid ? '' : ' disabled-button')}
                disabled={!this.state.assignmentIsValid}
                onClick={this.saveAssignment}>
                Schedule assignment
              </button>
            </Col>
          </Row>
        </Grid>
        : <Grid fluid>
          <Row style={{height: '10rem'}}>
            <Col sm={12} md={12}>
              <div className='sweet-loading'>
                <RingLoader
                  color={'#1caff6'}
                  loading={this.state.loading}
                />
              </div>
            </Col>
          </Row>
        </Grid>}
      </div>
    )
  }
}

AssignmentEdit.propTypes = {
  curriculaActions: PropTypes.shape({
    curriculaFetchExpandedCurriculum: PropTypes.func.isRequired,
    dataReceiveExpandedCurriculum: PropTypes.func.isRequired
  }).isRequired,
  curriculumExpanded: PropTypes.object,
  classroomTeacher: PropTypes.object.isRequired,
  assignmentActions: PropTypes.shape({
    assignmentCreateAssignment: PropTypes.func.isRequired,
    assignmentFetchAssignmentList: PropTypes.func.isRequired,
    assignmentPartialUpdateAssignment: PropTypes.func.isRequired
  }).isRequired,
  onSave: PropTypes.func,
  assignment: PropTypes.object,
  createNew: PropTypes.bool.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentEdit)
export { AssignmentEdit as EditAssigmentsViewNotConnected }
