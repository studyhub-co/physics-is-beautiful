import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// import history from '../../history'
import { withRouter } from 'react-router'
import { PopupWindow } from '../../components/PopupWindow'
import SelectCourse from '../../components/SelectCourse'
import * as classroomCreators from '../../actions/classroom'
import * as tabCreators from '../../actions/tab'

class CreateClassroomView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      classroomFormValues: {
        name: '',
        course_uuid: ''
      },
      classroomFormIsValid: false
    }
    this.handleClassroomFormChange = this.handleClassroomFormChange.bind(this)
    this.selectedCourseChanged = this.selectedCourseChanged.bind(this)
    this.saveClassroom = this.saveClassroom.bind(this)
  }

  componentWillMount () {
    const { history } = this.props
    // select teacher tab by default
    this.props.tabActions.changeSelectedTab('teacher', 'tab', history, true)

    if (this.props.match.params && this.props.match.params['uuid']) {
      // load classroom if unavailable
      if (!this.props.classroomTeacher) {
        this.props.classroomActions.classroomFetchTeacherClassroom(this.props.match.params['uuid'])
      }
    } else {
      // new class room
      this.props.classroomActions.classroomEraseTeacherClassroom()
    }
  }

  componentWillReceiveProps (props) {
    if (props.classroomTeacher) {
      this.setState(
        { classroomFormValues: {
          name: props.classroomTeacher.name,
          course_uuid: props.classroomTeacher.course.uuid
        }},
        this.validateClassroomForm
      )
    }
  }

  handleClassroomFormChange (e) {
    let classroomFormValues = Object.assign({}, this.state.classroomFormValues)
    classroomFormValues[e.target.name] = e.target.value
    this.setState(
      {classroomFormValues},
      this.validateClassroomForm
    )
  }

  selectedCourseChanged (course) {
    let classroomFormValues = Object.assign({}, this.state.classroomFormValues)
    classroomFormValues['course_uuid'] = course.uuid
    this.setState(
      {classroomFormValues},
      this.validateClassroomForm
    )
  }

  validateClassroomForm () {
    if (this.state.classroomFormValues &&
      this.state.classroomFormValues.name &&
      this.state.classroomFormValues.course_uuid) {
      this.setState({'classroomFormIsValid': true})
    } else {
      this.setState({'classroomFormIsValid': false})
    }
  }

  saveClassroom (e) {
    e.preventDefault()
    if (this.state.classroomFormIsValid) {
      if (!this.props.classroomTeacher) {
        // save
        this.props.classroomActions.classroomCreateClassroom(this.state.classroomFormValues, true, null, true)
      } else {
        // update
        this.props.classroomActions.classroomPartialUpdateTeacherClassroom(
          Object.assign({}, this.state.classroomFormValues, { uuid: this.props.classroomTeacher.uuid }),
          true
        )
      }
    }
  }

  render () {

    const { history } = this.props

    return (
      <PopupWindow goBack={history.goBack}>
        <form onSubmit={this.saveClassroom}>
          {!this.props.classroomTeacher &&
            <div>
              <div style={{paddingTop: '2rem'}}>Name of your classroom:</div>
              <div>
                <input
                  type='text' name='name'
                  className={'form-control'}
                  value={this.state.classroomFormValues ? this.state.classroomFormValues.name : ''}
                  onChange={this.handleClassroomFormChange} />
              </div>
            </div> }
          <br />
          <SelectCourse
            selectedCourseChanged={this.selectedCourseChanged}
            selectedUuid={this.state.classroomFormValues.course_uuid} />
          <button disabled={!this.state.classroomFormIsValid}
            className={'classroom-common-button float-right' + (this.state.classroomFormIsValid ? '' : ' disabled-button')}
            type='submit'>
            {this.props.classroomTeacher ? 'Save classroom' : 'Create classroom'}
          </button>
          <div style={{'clear': 'both'}}></div>
        </form>
      </PopupWindow>
    )
  }
}

CreateClassroomView.propTypes = {
  tabActions: PropTypes.shape({
    changeSelectedTab: PropTypes.func.isRequired
  }).isRequired,
  classroomActions: PropTypes.shape({
    classroomCreateClassroom: PropTypes.func.isRequired,
    classroomFetchTeacherClassroom: PropTypes.func.isRequired,
    classroomEraseTeacherClassroom: PropTypes.func.isRequired,
    classroomPartialUpdateTeacherClassroom: PropTypes.func.isRequired
  }).isRequired,
  classroomTeacher: PropTypes.object
}
CreateClassroomView.defaultProps = {
}

const mapStateToProps = (state) => {
  return {
    classroomTeacher: state.classroom.classroomTeacherClassroom
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    classroomActions: bindActionCreators(classroomCreators, dispatch),
    tabActions: bindActionCreators(tabCreators, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateClassroomView))
export { CreateClassroomView as CreateClassroomViewNotConnected }
