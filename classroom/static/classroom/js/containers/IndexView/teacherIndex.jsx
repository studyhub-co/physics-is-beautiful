import React from 'react'

import PropTypes from 'prop-types'

import { Route } from 'react-router'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { RingLoader } from 'react-spinners'
import { Container, Row, Col, Modal } from 'react-bootstrap'

import * as tabsCreators from '../../actions/tab'
import * as classroomCreators from '../../actions/classroom'
// import GoooleClassromIcon from '../../../images/google-classroom-yellow-icon.png'
import SelectCurriculum from '../../components/SelectCurriculum'
import { TeacherClassroomCard } from '../../components/TeacherClassroomCard'
import { GoogleClassroomRow } from '../../components/GoogleClassroomRow'
import { CreateClassroomView, TeacherClassroomView } from '../../containers/index'
import * as googleCreators from '../../actions/google'
import { endsWith } from '../../utils/strings'

class TeacherIndexView extends React.Component {
  constructor (props) {
    super(props)
    this.getGoogleClassroomList = this.getGoogleClassroomList.bind(this)
    this.handleImportGoogleClassroom = this.handleImportGoogleClassroom.bind(this)
    this.onGoogleClassroomClick = this.onGoogleClassroomClick.bind(this)
    this.nextStepGoogleImportClick = this.nextStepGoogleImportClick.bind(this)
    this.prevStepGoogleImportClick = this.prevStepGoogleImportClick.bind(this)
    this.selectedCurriculumGoogleImportChanged = this.selectedCurriculumGoogleImportChanged.bind(this)
    this.state = { showSelectGoogleClassroom: false,
      googleClassroomsSelected: [],
      googleCurriculumSelected: null,
      googleClassroomsImportStep: 1
    }
  }

  componentWillMount () {
    this.props.googleActions.gapiInitialize()
    this.props.classroomActions.classroomFetchTeacherClassroomsList()
    this.props.tabActions.changeSelectedTab('teacher', 'tab', true)
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
    this.setState({'showSelectGoogleClassroom': !this.state.showSelectGoogleClassroom})
  }

  // ================ Google end

  render () {
    var baseUrl =  this.props.match.url.replace(/\/$/, '')
    var createUrl = baseUrl + '/create'
    var teacherUrl = baseUrl + '/:uuid/'
    var editUrl = baseUrl + '/:uuid/edit/'

    return <div>
      {this.props.location.pathname === '/classroom/teacher/'
        ? <Container fluid>
          <Row>
            <Col sm={6} md={6}>
              <h2>All classrooms</h2>
            </Col>
            {/*<Col sm={4} md={3} smOffset={2} mdOffset={3} style={{marginTop: 10}}>*/}
            <Col sm={{ span: 4, offset: 2 }} md={{ span: 3, offset: 3 }} style={{marginTop: 10}}>
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
              { this.state.showSelectGoogleClassroom
                ? <Modal
                  show={this.state.showSelectGoogleClassroom}
                  onHide={this.handleImportGoogleClassroom}
                  container={this} >
                  <Modal.Header closeButton>
                    <Modal.Title>Please select the classes you want to import</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Container fluid>
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
                    </Container>
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
              {this.props.location.pathname === '/classroom/teacher/' ? <div className={'vcenter create-classroom-button'}
                onClick={() => this.props.dispatch(push(createUrl))}>
              + Create another classroom
              </div> : null}
            </div>
            <div style={{'clear': 'both'}} />
            </div> : null }
        </Container>
        : null
      }
      <Route path={createUrl} exact component={CreateClassroomView} />
      <Route path={editUrl} exact component={CreateClassroomView} />
      { endsWith(window.location.pathname, 'teacher/create')
        ? null
        : <Route path={teacherUrl} component={TeacherClassroomView} />
      }
    </div>
  }
}

TeacherIndexView.propTypes = {
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
    classroomJoinClassroom: PropTypes.func.isRequired
  }).isRequired,
  tab: PropTypes.string,
  classroomList: PropTypes.array,
  googleClassroomsList: PropTypes.array,
  gapiInitState: PropTypes.bool,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    tab: state.tab.tab,
    classroomList: state.classroom.classroomList,
    googleClassroomsList: state.google.googleClassroomsList,
    gapiInitState: state.google.gapiInitState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    tabActions: bindActionCreators(tabsCreators, dispatch),
    classroomActions: bindActionCreators(classroomCreators, dispatch),
    googleActions: bindActionCreators(googleCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherIndexView)
export { TeacherIndexView as TeacherIndexViewNotConnected }
