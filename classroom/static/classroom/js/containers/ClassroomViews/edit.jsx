import React from 'react'

import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import history from '../../history'

import { PopupWindow } from '../../components/PopupWindow'
import { CurriculumCard } from '../../components/CurriculumCard'

import * as classroomCreators from '../../actions/classroom'
import * as tabCreators from '../../actions/tab'
import * as curriculaCreators from '../../actions/curricula'

class EditClassroomView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      classroomFormValues: {
        name: '',
        curriculum_uuid: ''
      },
      classroomFormIsValid: false
    }
    this.handleClassroomFormChange = this.handleClassroomFormChange.bind(this)
    this.saveClassroom = this.saveClassroom.bind(this)
  }

  componentWillMount () {
    // load curricula
    this.props.curriculaActions.curriculaFetchCurriculaList()
    // load other curricula
    this.props.curriculaActions.curriculaFetchOtherCurriculaList()
    // select teacher tab by default
    this.props.tabActions.changeSelectedTab('teacher', 'tab', true)
  }

  handleClassroomFormChange (e) {
    let classroomFormValues = Object.assign({}, this.state.classroomFormValues)
    classroomFormValues[e.target.name] = e.target.value
    this.setState(
      {classroomFormValues},
      this.validateClassroomForm
    )
  }

  selectCurriculum (curriculum) {
    let classroomFormValues = Object.assign({}, this.state.classroomFormValues)
    classroomFormValues['curriculum_uuid'] = curriculum.uuid
    this.setState(
      {classroomFormValues},
      this.validateClassroomForm
    )
  }

  validateClassroomForm () {
    if (this.state.classroomFormValues &&
      this.state.classroomFormValues.name &&
      this.state.classroomFormValues.curriculum_uuid) {
      this.setState({'classroomFormIsValid': true})
    } else {
      this.setState({'classroomFormIsValid': false})
    }
  }

  saveClassroom (e) {
    e.preventDefault()
    if (this.state.classroomFormIsValid) {
      this.props.classroomActions.classroomCreateClassroom(this.state.classroomFormValues)
    }
  }

  render () {
    return (
      <PopupWindow goBack={history.goBack}>
        <form onSubmit={this.saveClassroom}>
          <div style={{paddingTop: '2rem'}}>Name of you classroom:</div>
          <div>
            <input type='text' name='name' value={this.state.value} className={'form-control'}
              onChange={this.handleClassroomFormChange} />
          </div>
          <br />
          <div>Select curriculum:</div>
          <div style={{color: 'rgb(8, 209, 255)'}}>My curricula</div>
          {this.props.curriculaList ? <div>{ this.props.curriculaList.map(function (curriculum, i) {
            return <div key={i} onClick={() => { this.selectCurriculum(curriculum) }}>
              <CurriculumCard curriculum={curriculum} selectedUuid={this.state.classroomFormValues.curriculum_uuid} />
            </div>
          }, this)}
          </div> : null }
          <div className={'create-curriculum-button curriculum-card'} onClick={() => { window.open('/editor/', '_blank') }}>+ Create new curriculum</div>
          <div className={'blue-text'}>Other curricula:</div>
          {this.props.curriculaOtherList ? <div>{ this.props.curriculaOtherList.map(function (curriculum, i) {
            return <div key={i} onClick={() => { this.selectCurriculum(curriculum) }}>
              <CurriculumCard curriculum={curriculum} selectedUuid={this.state.classroomFormValues.curriculum_uuid} />
            </div>
          }, this)}
          </div> : null }
          <div className={'grey-text pointer'} onClick={() => { window.open('/editor/', '_blank') }}>Browse other curricula</div>
          <button disabled={!this.state.classroomFormIsValid}
            className={'classroom-common-button' + (this.state.classroomFormIsValid ? '' : ' disabled-button')}
            type='submit'>
            Create classroom
          </button>
          <div style={{'clear': 'both'}}></div>
        </form>
      </PopupWindow>
    )
  }
}

EditClassroomView.propTypes = {
  tabActions: PropTypes.shape({
    changeSelectedTab: PropTypes.func.isRequired
  }).isRequired,
  curriculaActions: PropTypes.shape({
    curriculaFetchCurriculaList: PropTypes.func.isRequired,
    curriculaFetchOtherCurriculaList: PropTypes.func.isRequired
  }).isRequired,
  classroomActions: PropTypes.shape({
    classroomCreateClassroom: PropTypes.func.isRequired
  }).isRequired,
  curriculaList: PropTypes.array,
  curriculaOtherList: PropTypes.array
}
EditClassroomView.defaultProps = {
  // statusText: '',
  // userName: ''
}

const mapStateToProps = (state) => {
  return {
    // tab: state.tab.tab
    curriculaList: state.curricula.curriculaList,
    curriculaOtherList: state.curricula.curriculaOtherList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    classroomActions: bindActionCreators(classroomCreators, dispatch),
    tabActions: bindActionCreators(tabCreators, dispatch),
    curriculaActions: bindActionCreators(curriculaCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditClassroomView)
export { EditClassroomView as EditClassroomViewNotConnected }
