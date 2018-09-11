import React from 'react'
// import { push } from 'react-router-redux'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Sheet } from '../../components/Sheet'

// import GoooleClassromIcon from '../../../images/google-classroom-yellow-icon.png'

import SelectCurriculum from '../../components/SelectCurriculum'

import { TeacherClassroomCard } from '../../components/TeacherClassroomCard'
import { GoogleClassroomRow } from '../../components/GoogleClassroomRow'

import { Tabs, TabLink, TabContent } from 'react-tabs-redux'

import { CreateClassroomView, JoinClassroomView,
  StudentClassroomView, TeacherClassroomView } from '../../containers/index'

import * as tabsCreators from '../../actions/tab'
import * as classroomCreators from '../../actions/classroom'
import * as googleCreators from '../../actions/google'

import { Route } from 'react-router'
import { StudentClassroomRow } from '../../components/StudentClassroomRow'

import { Grid, Row, Col, Modal } from 'react-bootstrap'

import { RingLoader } from 'react-spinners'

class IndexView extends React.Component {
  constructor (props) {
    super(props)
    this.getGoogleClassroomList = this.getGoogleClassroomList.bind(this)
    this.handleImportGoogleClassroom = this.handleImportGoogleClassroom.bind(this)
    this.onGoogleClassroomClick = this.onGoogleClassroomClick.bind(this)
    this.nextStepGoogleImportClick = this.nextStepGoogleImportClick.bind(this)
    this.prevStepGoogleImportClick = this.prevStepGoogleImportClick.bind(this)
    this.selectedCurriculumGoogleImportChanged = this.selectedCurriculumGoogleImportChanged.bind(this)
    this.state = { showSelectGooleClassroom: false,
      googleClassroomsSelected: [],
      googleCurriculumSelected: null,
      googleClassroomsImportStep: 1
    }
  }

  componentWillMount () {
    this.props.googleActions.gapiInitialize()
    this.props.classroomActions.classroomFetchTeacherClassroomsList()
    this.props.classroomActions.classroomFetchStudentClassroomsList()
  }

  componentWillReceiveProps (props) {
    if (props.tab !== this.props.tab) {
      if (props.tab === 'student') {
        this.props.classroomActions.classroomFetchStudentClassroomsList()
      } else if (props.tab === 'teacher') {
        this.props.classroomActions.classroomFetchTeacherClassroomsList()
      }
    }
  }

  // ================ Google start

  getGoogleClassroomList () {
    this.props.googleActions.googleFetchClassroomList()
    this.handleImportGoogleClassroom()
  }

  onGoogleClassroomClick (classroom) {
    // add classroom to googleSelected list, remove classroom from list if exist
    var classroomIdx = this.state.googleClassroomsSelected.indexOf(classroom)
    var newGoogleClassroomsSelected = this.state.googleClassroomsSelected
    if (classroomIdx === -1) {
      newGoogleClassroomsSelected.push(classroom)
      this.setState({googleClassroomsSelected: newGoogleClassroomsSelected})
    } else {
      newGoogleClassroomsSelected.splice(classroomIdx, 1)
      this.setState({googleClassroomsSelected: newGoogleClassroomsSelected})
    }
  }

  prevStepGoogleImportClick () {
    this.setState({'googleClassroomsImportStep': this.state.googleClassroomsImportStep - 1})
  }

  nextStepGoogleImportClick () {
    if (this.state.googleClassroomsImportStep === 1) {
      this.setState({'googleClassroomsImportStep': this.state.googleClassroomsImportStep + 1})
    } else if (this.state.googleClassroomsImportStep === 2) {
      this.props.googleActions.googleSaveClassroomsWithStudents(
        this.state.googleClassroomsSelected,
        this.state.googleCurriculumSelected)

      this.setState({'googleClassroomsImportStep': 1,
        googleClassroomsSelected: [],
        googleCurriculumSelected: null
      })
      this.handleImportGoogleClassroom()
    }
  }

  selectedCurriculumGoogleImportChanged (curriculum) {
    this.setState({
      googleCurriculumSelected: curriculum
    })
  }

  handleImportGoogleClassroom () {
    this.setState({'showSelectGooleClassroom': !this.state.showSelectGooleClassroom})
  }

  // ================ Google end

  render () {
    var baseUrl =  this.props.match.url.replace(/\/$/, '')
    var createUrl = baseUrl + '/create'
    var teacherUrl = baseUrl + '/:uuid/teacher/'
    var studentUrl = baseUrl + '/:uuid/student/'
    // var autoJointUrl = baseUrl + '/:uuid/join/'
    var editUrl = baseUrl + '/:uuid/edit/'
    var joinUrl = baseUrl + '/join'

    if (this.props.match.params && this.props.match.params.joinCode) {
      var joinCode = this.props.match.params.joinCode
      // join to classroom and redirect to classroom student view
      this.props.classroomActions.classroomJoinClassroom(joinCode)
    }

    return (
      <Sheet>
        <Tabs name='tab'
          className='tabs'
          handleSelect={this.props.tabActions.changeSelectedTab}
          selectedTab={this.props.tab}
        >
          <div className='tab-links'>
            <TabLink to='student'>Student</TabLink>
            <TabLink to='teacher'>Teacher</TabLink>
          </div>
          <div className='content'>
            <TabContent for='student'>
              {this.props.location.pathname === '/classroom/' && this.props.classroomStudentList
                ? <Grid fluid>{ this.props.classroomStudentList.map(function (classroom, i) {
                  return <StudentClassroomRow
                    classroom={classroom}
                    onAssignmentsClick={(url) => this.props.dispatch(push(url))}
                    baseUrl={baseUrl}
                    key={i} />
                }, this)}
                </Grid> : null }
              <Route path={studentUrl} component={StudentClassroomView} />
              <Route path={joinUrl} component={JoinClassroomView} />
              {/* if classrooms list and not empty */}
              {this.props.classroomStudentList && this.props.classroomStudentList.length > 0
                ? <div>
                  {this.props.location.pathname.lastIndexOf('/classroom/', 0) === 0 ? <div className={'join-another-classroom'}
                    onClick={() => this.props.dispatch(push(joinUrl))}>
                  + Join another classroom
                  </div> : null}
                </div>
                : null }
              {this.props.classroomStudentList && this.props.classroomStudentList.length === 0
                ? <JoinClassroomView /> : null }
            </TabContent>
            <TabContent for='teacher'>
              {this.props.location.pathname === '/classroom/'
                ? <Grid fluid>
                  <Row>
                    <Col sm={6} md={6}>
                      <h2>All classrooms</h2>
                    </Col>
                    <Col sm={4} md={3} smOffset={2} mdOffset={3}>
                      <button
                        disabled={!this.props.gapiInitState}
                        onClick={this.getGoogleClassroomList}
                        className='google-button' type='button'>
                        <div className='google-classroom-img' />
                        <span>
                          <span>Import from</span>
                          <span>Google Classroom</span>
                        </span>
                      </button>
                      {/* Google Modal start */}
                      { this.state.showSelectGooleClassroom
                        ? <Modal
                          show={this.state.showSelectGooleClassroom}
                          onHide={this.handleImportGoogleClassroom}
                          container={this} >
                          <Modal.Header closeButton>
                            <Modal.Title>Please select the classes you want to import</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Grid fluid>
                              { this.props.googleClassroomsList
                                ? <div>{this.state.googleClassroomsImportStep === 1
                                  ? this.props.googleClassroomsList.map(function (classroom, i) {
                                    return <GoogleClassroomRow
                                      onGoogleClassroomClick={this.onGoogleClassroomClick}
                                      existingClassroomsList={this.props.classroomList}
                                      classroom={classroom}
                                      key={i} />
                                  }, this)
                                  // step 2
                                  : <div>
                                    <SelectCurriculum
                                      selectedCurriculumChanged={this.selectedCurriculumGoogleImportChanged}
                                      selectedUuid={this.state.googleCurriculumSelected ? this.state.googleCurriculumSelected.uuid : ''} />
                                  </div>}
                                </div>
                                : <Row style={{height: '10rem'}}>
                                  <Col sm={12} md={12}>
                                    <div className='sweet-loading'>
                                      <RingLoader
                                        color={'#1caff6'}
                                        loading={this.state.loading}
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              }
                            </Grid>
                          </Modal.Body>
                          <Modal.Footer>
                            {this.state.googleClassroomsImportStep === 1
                              ? <div>
                                <button
                                  disabled={this.state.googleClassroomsSelected.length === 0}
                                  className={'classroom-common-button' +
                                            (this.state.googleClassroomsSelected.length > 0 ? '' : ' disabled-button')}
                                  onClick={this.nextStepGoogleImportClick}>Next step</button>
                              </div>
                              : <div>
                                <button
                                  className={'classroom-common-button'}
                                  onClick={this.prevStepGoogleImportClick}>Back</button>&nbsp;
                                <button
                                  disabled={!this.state.googleCurriculumSelected}
                                  className={'classroom-common-button' + (this.state.googleCurriculumSelected ? '' : ' disabled-button')}
                                  onClick={this.nextStepGoogleImportClick}>Import classes</button>
                              </div>
                            }
                          </Modal.Footer>
                        </Modal> : null
                      }
                      {/* Google Modal end */}
                    </Col>
                  </Row>
                  {this.props.classroomList
                    ? <div> { this.props.classroomList.map(function (classroom, i) {
                      return <TeacherClassroomCard
                        classroom={classroom}
                        onTitleClick={(url) => this.props.dispatch(push(url))}
                        baseUrl={baseUrl}
                        key={i} />
                    }, this)}
                    <div style={{float: 'left'}}>
                      {this.props.location.pathname === '/classroom/' ? <div className={'vcenter create-classroom-button'}
                        onClick={() => this.props.dispatch(push(createUrl))}>
                      + Create another classroom
                      </div> : null}
                    </div>
                    <div style={{'clear': 'both'}} />
                    </div> : null }
                </Grid>
                : null
              }
              <Route path={createUrl} component={CreateClassroomView} />
              <Route path={editUrl} component={CreateClassroomView} />
              <Route path={teacherUrl} component={TeacherClassroomView} />

            </TabContent>
          </div>
        </Tabs>
      </Sheet>
    )
  }
}

IndexView.propTypes = {
  tabActions: PropTypes.shape({
    changeSelectedTab: PropTypes.func.isRequired
  }).isRequired,
  googleActions: PropTypes.shape({
    googleFetchClassroomList: PropTypes.func.isRequired,
    gapiInitialize: PropTypes.func.isRequired,
    googleSaveClassroomsWithStudents: PropTypes.func.isRequired
  }).isRequired,
  classroomActions: PropTypes.shape({
    classroomCreateClassroom: PropTypes.func.isRequired,
    classroomFetchTeacherClassroomsList: PropTypes.func.isRequired,
    classroomFetchStudentClassroomsList: PropTypes.func.isRequired,
    classroomJoinClassroom: PropTypes.func.isRequired
  }).isRequired,
  tab: PropTypes.string,
  classroomList: PropTypes.array,
  classroomStudentList: PropTypes.array,
  googleClassroomsList: PropTypes.array,
  gapiInitState: PropTypes.bool,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    tab: state.tab.tab,
    classroomList: state.classroom.classroomList,
    classroomStudentList: state.classroom.classroomStudentList,
    googleClassroomsList: state.google.googleClassroomsList,
    gapiInitState: state.google.gapiInitState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    tabActions: bindActionCreators(tabsCreators, dispatch),
    classroomActions: bindActionCreators(classroomCreators, dispatch),
    googleActions: bindActionCreators(googleCreators, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexView)
export { IndexView as IndexViewNotConnected }
