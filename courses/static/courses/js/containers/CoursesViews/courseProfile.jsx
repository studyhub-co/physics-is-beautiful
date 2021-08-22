import React, { useState, useEffect } from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Tooltip from '@material-ui/core/Tooltip'
import { Image as ImageBs, Container, Row, Col } from 'react-bootstrap'
import Moment from 'react-moment'
import copy from 'copy-to-clipboard'
import { BASE_URL } from '../../utils/config'

import { FaCodeBranch, FaShareAlt, FaChevronLeft } from 'react-icons/fa'

import { Sheet } from '../../components/Sheet'
import { loadPublicCourse, addCourse } from '../../actions/studio'

import history from '../../history'

const CourseProfileView = props => {
  const { match, loadPublicCourse, addCourse, publicCourse } = props

  const [tooltipCopiedOpen, setTooltipCopiedOpen] = React.useState(false)

  useEffect(() => {
    loadPublicCourse(match.params.courseUuid)
  }, [])

  const startCourse = () => {
    history.push('/courses/' + match.params.courseUuid + '/', '_self')
  }

  const onForkSelect = e => {
    addCourse(match.params.courseUuid)
  }

  const onCopyShareableLink = e => {
    copy(
      window.location.origin +
        BASE_URL +
        'courses/' +
        match.params.courseUuid +
        '/',
    )
    setTooltipCopiedOpen(true)
    setTimeout(() => setTooltipCopiedOpen(false), 3000)
  }

  const selectedCourse = publicCourse
  if (!selectedCourse) return null

  return (
    <Sheet
      style={{
        backgroundSize: 'cover',
        backgroundImage: selectedCourse?.cover_photo
          ? `url("${selectedCourse.cover_photo}")`
          : 'none',
      }}
    >
      <Container fluid>
        <Row style={{ padding: 0 }}>
          <Col sm={6} md={6}>
            <a
              className={'back-button'}
              onClick={() => {
                history.push('browse/')
              }}
            >
              <FaChevronLeft />
              Courses
            </a>
          </Col>
          <Col sm={3} md={3}>
            <a className={'back-button'} onClick={onForkSelect}>
              <FaCodeBranch /> Fork
            </a>
          </Col>
          <Col sm={3} md={3}>
            <Tooltip
              title="Copied!"
              leaveDelay={2000}
              arrow
              disableFocusListener
              disableHoverListener
              disableTouchListener
              open={tooltipCopiedOpen}
            >
              <a className={'back-button'} onClick={onCopyShareableLink}>
                <FaShareAlt /> Copy shareable link
              </a>
            </Tooltip>
          </Col>
        </Row>
      </Container>
      <br />
      <div style={{ height: '100%' }}>
        {selectedCourse ? (
          <Container fluid>
            <Row style={{ padding: 0, margin: 0 }}>
              <Col sm={12} md={2}>
                {selectedCourse.image && (
                  <div style={{ minHeight: '10rem' }}>
                    <ImageBs src={selectedCourse.image} fluid />
                  </div>
                )}
              </Col>
              <Col sm={12} md={7}>
                <Row style={{ padding: 0, margin: 0 }}>
                  <Col sm={12} md={12}>
                    <div className={'blue-title'}>{selectedCourse.name}</div>
                  </Col>
                </Row>
                <Row style={{ padding: 0, margin: 0 }}>
                  <Col sm={12} md={12}>
                    <div style={{ fontSize: '2rem' }}>
                      {selectedCourse.author.display_name} ∙{' '}
                      {selectedCourse.count_lessons} lesson
                      {selectedCourse.count_lessons > 1 && 's'} ∙{' '}
                      {selectedCourse.number_of_learners} learner
                      {selectedCourse.number_of_learners > 1 && 's'}
                    </div>
                  </Col>
                </Row>
                <Row style={{ padding: 0, margin: 0 }}>
                  <Col sm={12} md={12}>
                    <div style={{ color: 'gray' }}>
                      Created{' '}
                      <Moment fromNow>{selectedCourse.created_on}</Moment> ∙{' '}
                      Last updated{' '}
                      <Moment fromNow>{selectedCourse.updated_on}</Moment>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col sm={12} md={3}>
                <button
                  className={'editor-common-button'}
                  onClick={startCourse}
                >
                  Start Course
                </button>
              </Col>
            </Row>
            <Row style={{ padding: '1rem 0' }}>
              <Col sm={12} md={12}>
                {selectedCourse.description}
              </Col>
            </Row>
          </Container>
        ) : null}
      </div>
      {/*  </div>*/}
      {/*</div>*/}
    </Sheet>
  )
}

CourseProfileView.propTypes = {
  loadPublicCourse: PropTypes.func.isRequired,
  addCourse: PropTypes.func.isRequired,
  publicCourse: PropTypes.object,
}

const mapStateToProps = state => {
  return {
    publicCourse: state.studio.course.publicCourse,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    loadPublicCourse: uuid => dispatch(loadPublicCourse(uuid)),
    addCourse: prototype => dispatch(addCourse(prototype)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseProfileView)
export { CourseProfileView as CourseProfileViewNotConnected }
