import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { push } from 'connected-react-router'
import { BASE_URL } from '../../utils/config'

import history from '../../history'

import Clipboard from 'react-clipboard.js'
import EditableLabel from '../../utils/editableLabel'

import { CurriculumCard } from '../../components/CurriculumCard'

import { Grid, Row, Col, InputGroup, FormControl } from 'react-bootstrap'

import * as classroomCreators from '../../actions/classroom'
import * as tabsCreators from '../../actions/tab'

import { Tabs, TabLink, TabContent } from 'react-tabs-redux'

class TeacherClassroomView extends React.Component {
  componentWillMount () {
    this.props.tabActions.changeTeacherClassroomSelectedTab('teacher', 'tab', true)
    this.props.tabActions.changeTeacherClassroomSelectedTab('settings', 'teacherClassroomTab', true)
    this.props.classroomActions.classroomFetchTeacherClassroom(this.props.match.params['uuid'])
  }

  constructor (props) {
    super(props)
    this.hableTitleChange = this.hableTitleChange.bind(this)
  }

  hableTitleChange (name) {
    var newClassroom = {}

    if (!name) {
      name = 'classroom'
    }

    newClassroom.name = name
    newClassroom.uuid = this.props.classroomTeacher.uuid
    this.props.classroomActions.classroomPartialUpdateTeacherClassroom(newClassroom)
  }

  render () {
    return (
      <div className={'pop-up-window'}>
        <Grid fluid> { this.props.classroomTeacher
          ? <Row>
            <Col sm={3} md={3}>
              <a className={'pointer'} onClick={history.goBack}>{'< All classrooms'}</a>
            </Col>
            <Col sm={7} md={7}>
              {/*<span className={'blue-title'}>{this.props.classroomTeacher.teacher.display_name}'s Classroom - {this.props.classroomTeacher.name}</span>*/}
              <span className={'blue-title'}>
                <span className={'editable-label'}>
                  {this.props.classroomTeacher.teacher.display_name}'s Classroom - <EditableLabel
                    onFocusOut={this.hableTitleChange}
                    labelClassName={'pointer'}
                    text={this.props.classroomTeacher.name} />
                </span>
                &nbsp;
                <span className='glyphicon glyphicon-pencil' />
              </span>
            </Col>
            <Col sm={2} md={2}>
              {/*<span onClick={() => this.props.dispatch(push('/classroom/'))} className={'pib-link'}>Assignments</span>*/}
            </Col>
          </Row>
          : null }
        </Grid>
        <Tabs name='teacherClassroomTab'
          className='tabs'
          handleSelect={this.props.tabActions.changeTeacherClassroomSelectedTab}
          selectedTab={this.props.teacherClassroomTab}
        >
          <div className='tab-links'>
            <TabLink to='settings'>Settings</TabLink>
            <TabLink to='students'>Students</TabLink>
            <TabLink to='assignments'>Assignments</TabLink>
          </div>
          <div className='content'>
            <TabContent for='settings'>
              { this.props.classroomTeacher
                ? <div>
                  <div className={'pop-up-window text-align-center'}>
                    <div className={'gray-text title'}>Share classroom code</div>
                    <div>
                      <span className={'blue-title'} style={{ letterSpacing: '2rem' }}>{this.props.classroomTeacher.code}</span>&nbsp;
                      <span className={'gray-text pointer'}>
                        <Clipboard component='i' data-clipboard-text={this.props.classroomTeacher.code}>
                          copy
                        </Clipboard>
                      </span>
                    </div>
                    <br />
                    <div className={'gray-text title'}>
                      Or invite students with link:
                    </div>
                    <InputGroup>
                      <FormControl type='text' readOnly value={window.location.origin + BASE_URL + 'join/' + this.props.classroomTeacher.code + '/'} />
                      <span className='input-group-btn'>
                        <Clipboard
                          className={'btn btn-default'}
                          component='button'
                          data-clipboard-text={window.location.origin + BASE_URL + 'join/' + this.props.classroomTeacher.code + '/'}>
                          Copy
                        </Clipboard>
                      </span>
                    </InputGroup>
                  </div>
                  <div className={'pop-up-window text-align-center'}>
                    <div className={'gray-text title'}>Curriculum</div>
                    <CurriculumCard curriculum={this.props.classroomTeacher.curriculum} />
                    <div
                      className={'gray-text title pointer'}
                      onClick={() => { this.props.dispatch(push(BASE_URL + this.props.classroomTeacher.uuid + '/edit/')) }}>
                      <u>Change curriculum</u>
                    </div>
                  </div>
                  <div className={'gray-text title pointer text-align-center'}
                    onClick={() => { this.props.classroomActions.classroomDeleteTeacherClassroom(this.props.classroomTeacher.uuid) }}>
                    <u>Delete this classroom</u>
                  </div>
                </div>
                : null }
            </TabContent>
            <TabContent for='students'>
              { this.props.classroomTeacher && this.props.classroomTeacher.less_students.length > 1
                ? null
                : <div className={'gray-background-info-panel'}>No students have joined your classroom yet. <br /><br />
                  Share the <u>classroom code</u> with your students so they can join your classroom.</div>}
            </TabContent>
            <TabContent for='assignments'>
              assignments
            </TabContent>
          </div>
        </Tabs>
      </div>)
  }
}

TeacherClassroomView.propTypes = {
  tabActions: PropTypes.shape({
    changeTeacherClassroomSelectedTab: PropTypes.func.isRequired
  }).isRequired,
  teacherClassroomTab: PropTypes.string,
  classroomActions: PropTypes.shape({
    classroomFetchTeacherClassroom: PropTypes.func.isRequired,
    classroomPartialUpdateTeacherClassroom: PropTypes.func.isRequired,
    classroomDeleteTeacherClassroom: PropTypes.func.isRequired
  }).isRequired,
  classroomTeacher: PropTypes.object

}

const mapStateToProps = (state) => {
  return {
    classroomTeacher: state.classroom.classroomTeacherClassroom,
    teacherClassroomTab: state.tab.teacherClassroomTab,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    tabActions: bindActionCreators(tabsCreators, dispatch),
    classroomActions: bindActionCreators(classroomCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherClassroomView)
export { TeacherClassroomView as TeacherViewNotConnected }
