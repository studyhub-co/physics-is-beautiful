import React from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Image as ImageBs, Container, Row, Col } from 'react-bootstrap'
import Moment from 'react-moment'
import copy from 'copy-to-clipboard'
import { FaCodeBranch, FaShareAlt, FaChevronLeft } from 'react-icons/fa'

import { BASE_URL } from '../../../utils/config'

import {
  loadPublicCourse,
  addCourse
} from '../../../actions/studio'

import history from '../../../history'

class CourseProfileView extends React.Component {
  constructor (props) {
    super(props)
    this.startCourse = this.startCourse.bind(this)
    this.onCopyShareableLink = this.onCopyShareableLink.bind(this)
    this.onForkSelect = this.onForkSelect.bind(this)
  }

  componentDidMount () {
    this.props.loadPublicCourse(this.props.match.params.uuid)
  }

  startCourse () {
    window.open(BASE_URL + 'courses/' + this.props.match.params.uuid + '/', '_self')
  }

  onForkSelect (e) {
    this.props.addCourse(this.props.match.params.uuid)
  }

  onCopyShareableLink (e) {
    copy(window.location.origin + BASE_URL + 'courses/' + this.props.match.params.uuid + '/')
  }

  render () {
    var selectedCourse = this.props.publicCourse
    if (!selectedCourse) return null

    return (
      <div className={'container section-sheet'}>
        <div className={'pop-up-window'}>
          <Container fluid>
            <Row style={{padding: 0}}>
              <Col sm={6} md={6}>
                <a className={'back-button'} onClick={() => { history.push('/browse/') }} >
                  <FaChevronLeft />
                  Curricula
                </a>
              </Col>
              <Col sm={3} md={3}>
                <a className={'back-button'} onClick={this.onForkSelect} >
                  {/*<Glyphicon glyph='export' /> Fork*/}
                  <FaCodeBranch /> Fork
                </a>
              </Col>
              <Col sm={3} md={3}>
                <a className={'back-button'} onClick={this.onCopyShareableLink} >
                  {/*<Glyphicon glyph='share-alt' /> Copy shareable link*/}
                  <FaShareAlt /> Copy shareable link
                </a>
              </Col>
            </Row>
          </Container>
          <br />
          <div style={{height: '100%'}}>
            { selectedCourse
              ? <Container fluid>
                <Row style={{padding: 0}}>
                  <Col sm={12} md={12}
                    style={{
                      padding: 0,
                      paddingTop: '37%',
                      width: '100%',
                      overflow: 'hidden',
                      position: 'relative',
                      backgroundColor: '#12adf4'}} >
                    <div
                      style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        bottom: '0',
                        right: '0'}}
                    >
                      <div style={{position: selectedCourse.cover_photo ? 'relative' : ''}}>
                        <div>{ selectedCourse.cover_photo
                          ? <ImageBs src={selectedCourse.cover_photo} fluid />
                          : <div style={{ height: '100%', width: '100%' }} /> }
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
                <br />
                <Row style={{padding: 0}}>
                  <Col sm={2} md={2} style={{padding: 0}}>
                    <div style={{minHeight: '10rem'}}>
                      { selectedCourse.image ? <ImageBs
                        src={selectedCourse.image}
                        fluid
                      /> : null }
                    </div>
                  </Col>
                  <Col sm={7} md={7}>
                    <Row style={{padding: 0}}>
                      <Col sm={12} md={12}>
                        <div className={'blue-title'}>
                          {selectedCourse.name}
                        </div>
                      </Col>
                    </Row>
                    <Row style={{padding: 0}}>
                      <Col sm={12} md={12}>
                        <div style={{fontSize: '2rem'}}>
                          { selectedCourse.author.display_name }
                          ∙ { selectedCourse.count_lessons } lessons
                          ∙ { selectedCourse.number_of_learners } learners
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={12} md={12}>
                        <div style={{color: 'gray'}}>
                          Created <Moment fromNow>{selectedCourse.created_on}</Moment>
                          ∙ Last updated <Moment fromNow>{selectedCourse.updated_on}</Moment>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col sm={3} md={3}>
                    <button className={'editor-common-button'} onClick={this.startCourse}>Start Course</button>
                  </Col>
                </Row>
                <Row style={{padding: '2rem'}}>
                  <Col sm={12} md={12}>
                    {selectedCourse.description}
                  </Col>
                </Row>
              </Container> : null }
          </div>
        </div>
      </div>
    )
  }
}

CourseProfileView.propTypes = {
  loadPublicCourse: PropTypes.func.isRequired,
  addCourse: PropTypes.func.isRequired,
  publicCourse: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    publicCourse: state.studio.course.publicCourse
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    loadPublicCourse: (uuid) => dispatch(loadPublicCourse(uuid)),
    addCourse: (prototype) => dispatch(addCourse(prototype))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseProfileView)
export { CourseProfileView as CourseProfileViewNotConnected }
