import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Route } from 'react-router'

import { history }from '../../history'

import Clipboard from 'react-clipboard.js'
// import EditableLabel from '../../utils/editableLabel'

import { Image, Grid, Row, Col, OverlayTrigger, Tooltip, InputGroup, FormControl, Modal } from 'react-bootstrap'

// import * as assignmentCreators from '../../actions/'

import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
import { loadCurriculumIfNeeded } from '../../actions'

class EditCurriculumProfileView extends React.Component {
  constructor (props) {
    super(props)

    this.handleSelectTab = this.handleSelectTab.bind(this)

    this.state = {
      selectedTab: 'profile'
    }
  }

  componentWillMount () {
    this.props.loadCurriculum(this.props.match.params.uuid)
  }

  //
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

    return (
      <div className={'pop-up-window'}>
        <Grid fluid> { this.props.classroomTeacher
          ? <Col sm={12} md={12} style={{padding: 0}}>
            <Row style={{padding: 0}}>
              <Col sm={12} md={12} style={{textAlign: 'left', padding: 0}} >
                <a className={'back-button'} onClick={() => { history.push('/') }} >
                  <span className='glyphicon glyphicon-menu-left' style={{fontSize: 16}} />
                  My Curricula
                </a>
              </Col>
            </Row>
          </Col>
          : null }
        </Grid>
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
                  <Col sm={12} md={12}>
                    <Image src={selectedCurriculum.image} responsive />
                  </Col>
                </Row>
                <Row style={{padding: 0}}>
                  <Col sm={2} md={2}>
                    <Image src={selectedCurriculum.image} responsive circle />
                  </Col>
                  <Col sm={8} md={8}>
                    <Row style={{padding: 0}}>
                      <Col sm={12} md={12}>
                        <h1>
                          {selectedCurriculum.name}
                        </h1>
                      </Col>
                    </Row>
                    <Row style={{padding: 0}}>
                      <Col sm={12} md={12}>
                        <div>
                          { selectedCurriculum.author.display_name }
                          ∙ { selectedCurriculum.count_lessons } lessons
                          ∙ { selectedCurriculum.count_lessons } learners
                        </div>
                      </Col>
                    </Row>
                    <Row style={{padding: 0}}>
                      <Col sm={12} md={12}>
                        <div>
                          Created 1 year ago  ∙ Last updated 3 months ago
                        </div>
                      </Col>
                    </Row>
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

const mapStateToProps = (state) => {
  return {
    curricula: state.curricula
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    loadCurriculum: (uuid) => dispatch(loadCurriculumIfNeeded(uuid))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCurriculumProfileView)
export { EditCurriculumProfileView as EditCurriculumProfileViewNotConnected }
