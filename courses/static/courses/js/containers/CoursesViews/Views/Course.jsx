import React, { useState, useEffect, useRef } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import history from '../../../history'

import * as coursesActionCreators from '../../../actions/courses'

import { Sheet } from '../../../components/Sheet'
import { Col, Container, Row } from 'react-bootstrap'
import { RingLoader } from 'react-spinners'
import { SectionSheet } from '../SectionSheet'

const CourseInfoPanel = props => {
  const currentCourse = props.currentCourse

  const [state, setState] = useState({
    showMore: false,
  })

  const showLessMore = e => {
    setState({
      ...state,
      showMore: !state.showMore,
    })
    e.preventDefault()
  }

  return (
    <Sheet
      style={{
        backgroundSize: 'cover',
        backgroundImage: currentCourse?.cover_photo
          ? `url("${currentCourse.cover_photo}")`
          : 'none',
      }}
    >
      {currentCourse && !currentCourse.isFetching && currentCourse.uuid && (
        <Container fluid>
          {/* title */}
          <Row style={{ padding: 0, margin: 0 }}>
            <Col md={10} xs={12}>
              <span className="course-title">
                <Link
                  to={`/courses/${currentCourse.uuid}/profile/`}
                  style={{
                    cursor: 'pointer',
                    textDecoration: 'none',
                    color: '#1caff6',
                  }}
                >
                  {currentCourse.name}
                </Link>
              </span>
              <span style={{ fontSize: '20px', color: 'darkgrey' }}>
                &nbsp;{'by'}&nbsp;
                <a
                  href={''}
                  onClick={e => {
                    e.preventDefault()
                    history.push(`/profile/${currentCourse.author.id}/`)
                  }}
                  className="course-user-link"
                  rel="noreferrer"
                >
                  {currentCourse.author.display_name}
                </a>
              </span>
            </Col>
            <Col md={2} xs={12} style={{ textAlign: 'right' }}>
              <a
                style={{
                  margin: 'auto',
                  color: 'darkgrey',
                  textDecoration: 'none',
                }}
                className="course-title course-more-less"
                onClick={e => {
                  showLessMore(e)
                }}
              >
                {state.showMore ? 'Show less' : 'Show details'}
              </a>
            </Col>
          </Row>
          {state.showMore && (
            <React.Fragment>
              <Row>
                <Col xs={12}>
                  {currentCourse.image && (
                    <img className={'img-fluid'} src={currentCourse.image} />
                  )}
                </Col>
              </Row>
              <Row style={{ fontWeight: 300, fontSize: 18, color: '#555' }}>
                <Col xs={12}>{currentCourse.description}</Col>
              </Row>
              <Row>
                <Col xs={12} style={{ textAlign: 'right', fontSize: 15 }}>
                  <Link
                    to={`/courses/${currentCourse.uuid}/profile/`}
                    style={{ cursor: 'pointer', color: 'grey' }}
                  >
                    {'Course profile view'}
                  </Link>
                  {' / '}
                  <Link
                    to={'/browse/'}
                    style={{ cursor: 'pointer', color: 'grey' }}
                  >
                    {'Select another course'}
                  </Link>
                </Col>
              </Row>
            </React.Fragment>
          )}
        </Container>
      )}
    </Sheet>
  )
}

const Course = props => {
  const { match, fetchCourse, currentCourse } = props

  const [state, setState] = useState({
    courseUuid:
      match.params.courseUuid || '00000000-0000-0000-0000-000000000000',
    sections: [],
  })

  useEffect(() => {
    fetchCourse(state.courseUuid)

    // window.parent.postMessage(
    //   {
    //     message: 'canGoBack',
    //     data: false,
    //   },
    //   '*',
    // )
  }, [])

  const mounted = useRef()

  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true
    } else {
      // do componentDidUpdate logic
      // if hash and element exit - navigate
      // (TODO navigate only after thw course fetched)
      const hash = location.href.substr(location.href.indexOf('#') + 1)
      if (hash) {
        document.getElementById(hash)?.scrollIntoView()
      }
    }
  })

  useEffect(() => {
    if (!currentCourse.uuid) {
      return
    }
    var sections = []
    for (
      var unitIndex = 0;
      unitIndex < currentCourse.units.length;
      unitIndex++
    ) {
      var unit = currentCourse.units[unitIndex]
      var items = []
      for (
        var moduleIndex = 0;
        moduleIndex < unit.modules.length;
        moduleIndex++
      ) {
        var module = unit.modules[moduleIndex]
        var name = module.name + ' '
        if (!module.is_locked) {
          name +=
            '(' +
            module.lesson_completed_count +
            '/' +
            module.lesson_count +
            ') '
        }
        items.push({
          name: name,
          image: module.image,
          href: '/courses/modules/' + module.uuid + '/',
          uuid: module.uuid,
          status: module.status,
        })
      }
      sections.push({
        name: unit.name,
        items: items,
        uuid: unit.uuid,
      })
    }
    setState({
      ...state,
      sections: sections,
      // backLink: null,
      question: null,
      progress: 0,
      answer: null,
    })
  }, [currentCourse])

  return (
    <div>
      {currentCourse && !currentCourse.isFetching && currentCourse.uuid ? (
        <div>
          <CourseInfoPanel currentCourse={currentCourse} />
          <SectionSheet sections={state.sections} />
        </div>
      ) : (
        <div className="sweet-loading">
          <RingLoader color={'#1caff6'} loading={currentCourse.isFetching} />
        </div>
      )}
    </div>
  )
}

Course.propTypes = {}

const mapStateToProps = function(store) {
  return {
    currentCourse: store.courses.course,
  }
}

export default connect(mapStateToProps, dispatch => {
  return bindActionCreators(coursesActionCreators, dispatch)
})(Course)
