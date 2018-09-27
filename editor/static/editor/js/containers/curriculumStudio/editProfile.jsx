import React from 'react'
import PropTypes from 'prop-types'

import Moment from 'react-moment'

import { connect } from 'react-redux'
import { history }from '../../history'

import Clipboard from 'react-clipboard.js'

import { Image, Grid, Row, Col, Glyphicon, Tooltip, InputGroup, FormControl, Modal } from 'react-bootstrap'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'

import { changeCurriculumImage, loadCurriculumIfNeeded, renameCurriculum } from '../../actions'

import { EditableExternalEventLabel } from '../../components/label'

class PencilImageUpload extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange (e) {
    this.props.onFileSelect(e.target.files[0])
  }

  render () {
    return <div className={'selectable-image'} style={{height: '100%'}}>
      <Glyphicon
        glyph={'pencil'}
        // onClick={this.imageUpload}
        style={{fontSize: '2rem', top: '1rem'}} />
      <input
        type='file' name='image' accept='image/*'
        onChange={this.handleChange}
        style={{fontSize: '0px'}} />
    </div>
  }
}

class EditCurriculumProfileView extends React.Component {
  constructor (props) {
    super(props)

    this.handleSelectTab = this.handleSelectTab.bind(this)
    this.startCurriculum = this.startCurriculum.bind(this)
    this.imageUpload = this.imageUpload.bind(this)
    this.coverPhotoUpload = this.coverPhotoUpload.bind(this)
    this.editNameClick = this.editNameClick.bind(this)
    this.onNameChanged = this.onNameChanged.bind(this)

    this.state = {
      selectedTab: 'profile'
    }
  }

  componentWillMount () {
    this.props.loadCurriculum(this.props.match.params.uuid)
  }

  // hideCopiedToolTip () {
  //   if (this.refs.overlay1) { this.refs.overlay1.hide() }
  //   if (this.refs.overlay2) { this.refs.overlay2.hide() }
  // }

  handleSelectTab (tabname, tabspace) {
    if (tabname === 'edit') {
      history.push('/editor/curricula/' + this.props.match.params.uuid + '/')
    }
    if (tabname !== this.state.tabname) {
      this.setState({selectedTab: tabname})
    }
  }

  startCurriculum () {
    window.open('/curriculum/' + this.props.match.params.uuid + '/', '_blank')
  }

  imageUpload (image) {
    if (image) {
      this.props.changeCurriculumImage(this.props.match.params.uuid, image)
    }
  }

  editNameClick () {
    this.setState({nameEditMode: true})
  }

  onNameChanged (name) {
    this.props.onNameChange(this.props.match.params.uuid, name)
    this.setState({nameEditMode: false})
  }

  coverPhotoUpload () {
    // TODO select and crop cover photo
  }

  render () {
    // var assignmentUrl = BASE_URL + 'teacher/:uuid/assignments/:assigmentUuid'
    // var studentsListUrl = this.props.match.path + 'students/'
    // var isExactUrl = this.props.match.isExact // exact url for teacher view

    // var studentsS = ''
    // if (this.props.classroomTeacher && this.props.classroomTeacher.count_students > 1) {
    //   studentsS = 's'
    // }

    var copiedTooltip = (
      <Tooltip id='copiedTooltip'>
        Copied!
      </Tooltip>
    )

    var selectedCurriculum = this.props.curricula[this.props.match.params.uuid]

    if (!selectedCurriculum) return null

    return (
      <div className={'pop-up-window'}>
        <Tabs name='editCurriculumProfileTabs'
          className='tabs'
          handleSelect={this.handleSelectTab}
          selectedTab={this.state.selectedTab}
        >
          <div className='tab-links'>
            <TabLink to='profile'>Curriculum profile</TabLink>
            <TabLink to='settings'>Curriculum settings</TabLink>
            <TabLink to='edit'>Edit content</TabLink>
          </div>
          <div className='content'>
            <TabContent for='profile'>
              <Grid fluid>
                <Row style={{padding: 0}}>
                  <Col sm={12} md={12} style={{padding: 0}}>
                    <div
                      style={{maxHeight: '315px', overflowY: 'hidden'}}
                      title={'Change cover photo'}
                    >
                      <Image
                        src={selectedCurriculum.image}
                        responsive
                      />
                      <div className={'base-circle-edit bottom-circle-edit right-circle-edit'}>
                        <PencilImageUpload onFileSelect={this.coverPhotoUpload} />
                      </div>
                    </div>
                  </Col>
                </Row>
                <br />
                <Row style={{padding: 0}}>
                  <Col sm={2} md={2} style={{padding: 0}}>
                    <div style={{minHeight: '10rem'}}>
                      { selectedCurriculum.image ? <Image
                        src={selectedCurriculum.image}
                        responsive
                      /> : null }
                    </div>
                    <div
                      className={'base-circle-edit bottom-circle-edit right-circle-edit'}
                      title={'Change image'}
                    >
                      <PencilImageUpload onFileSelect={this.imageUpload} />
                    </div>
                  </Col>
                  <Col sm={7} md={7}>
                    <Row style={{padding: 0}}>
                      <Col sm={12} md={12}>
                        <div className={'blue-title'}>
                          {/*{selectedCurriculum.name}*/}
                          <EditableExternalEventLabel
                            value={selectedCurriculum.name}
                            onChange={this.onNameChanged}
                            editMode={this.state.nameEditMode}
                          />
                          <span style={{position: 'relative', paddingLeft: '1rem'}}>
                            <span className={'base-circle-edit'}>
                              <Glyphicon
                                glyph={'pencil'}
                                onClick={this.editNameClick}
                                style={{fontSize: '2rem'}} />
                            </span>
                          </span>
                        </div>
                      </Col>
                    </Row>
                    <Row style={{padding: 0}}>
                      <Col sm={12} md={12}>
                        <div style={{fontSize: '2rem'}}>
                          { selectedCurriculum.author.display_name }
                          ∙ { selectedCurriculum.count_lessons } lessons
                          ∙ { selectedCurriculum.count_lessons } learners
                        </div>
                      </Col>
                    </Row>
                    <Row style={{padding: 0}}>
                      <Col sm={12} md={12}>
                        <div style={{color: 'gray'}}>
                          Created <Moment fromNow>{selectedCurriculum.created_on}</Moment>
                          ∙ Last updated <Moment fromNow>{selectedCurriculum.updated_on}</Moment>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col sm={3} md={3}>
                    <button className={'editor-common-button'} onClick={this.startCurriculum}>Start Curriculum</button>
                  </Col>
                </Row>
              </Grid>
            </TabContent>
            <TabContent for='settings'>
              settings tab
            </TabContent>
            <TabContent for='edit'>
              edit tab
            </TabContent>
          </div>
        </Tabs>
      </div>)
  }
}

EditCurriculumProfileView.propTypes = {
  // actions
  loadCurriculum: PropTypes.func.isRequired,
  changeCurriculumImage: PropTypes.func.isRequired,
  // data
  curricula: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    curricula: state.curricula
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    loadCurriculum: (uuid) => dispatch(loadCurriculumIfNeeded(uuid)),
    changeCurriculumImage: (uuid, image) => dispatch(changeCurriculumImage(uuid, image)),
    onNameChange: (uuid, name) => dispatch(renameCurriculum(uuid, name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCurriculumProfileView)
export { EditCurriculumProfileView as EditCurriculumProfileViewNotConnected }
