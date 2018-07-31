import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Grid, Row, Col } from 'react-bootstrap'

import * as classroomCreators from '../../actions/classroom'
import * as tabsCreators from '../../actions/tab'

import { Tabs, TabLink, TabContent } from 'react-tabs-redux'

class TeacherClassroomView extends React.Component {
  componentWillMount () {
    this.props.tabActions.changeTeacherClassroomSelectedTab('teacher', 'tab', true)
    this.props.tabActions.changeTeacherClassroomSelectedTab('settings', 'teacherClassroomTab', true)
    this.props.classroomActions.classroomFetchTeacherClassroom(this.props.match.params['uuid'])
  }

  render () {
    return (
      <div className={'pop-up-window'}>
        <Grid fluid> { this.props.classroomTeacher
          ? <Row>
            <Col sm={3} md={3}>
              {'< All classrooms'}
            </Col>
            <Col sm={7} md={7}>
              <span className='editable-label'>
                <span className={'blue-title'}>{this.props.classroomTeacher.teacher.display_name}'s Classroom - {this.props.classroomTeacher.name}</span>
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
                ? <div className={'pop-up-window text-align-center'}>
                  <div className={'gray-text title'}>Share classroom code</div>
                  <div>
                    <span className={'blue-title'} style={{ letterSpacing: '2rem'}}>{this.props.classroomTeacher.code}</span>&nbsp;
                    <span className={'gray-text'}><i>copy</i></span>
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
    classroomFetchTeacherClassroom: PropTypes.func.isRequired
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
