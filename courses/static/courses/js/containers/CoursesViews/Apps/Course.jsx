import React, { useState, useEffect } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

// import history from '../history'

import * as coursesActionCreators from '../../../actions/courses'

import { Sheet } from '../../../components/Sheet'
import { Col, Container, Row } from 'react-bootstrap'
import { RingLoader } from 'react-spinners'
import { SectionSheet } from '../SectionSheet'

const CourseInfoPanel = props => {
  const currentCourse = props.currentCourse

  const [state, setState] = useState({
    showMore: false
  })

  const showLessMore = (e) => {
    setState({
      ...state,
      showMore: !state.showMore
    })
    e.preventDefault()
  }

  return (
    <Sheet>
      { currentCourse && !currentCourse.isFetching && currentCourse.uuid &&
      <Container fluid>
        {/* title */}
        <Row>
          <Col md={10} xs={8} >
            <Row>
              <Col md={12}>
                <span className='course-title'>{currentCourse.name}</span>
                <span style={{fontSize: '20px', color: 'darkgrey'}}>&nbsp;
                  {' by '}&nbsp;
                  <a target={'_blank'}
                    href={currentCourse.author.get_absolute_url}
                    className='course-user-link'>
                    {currentCourse.author.display_name}
                  </a>
                </span>
              </Col>
            </Row>
            <Row style={{fontWeight: 300, fontSize: 18, color: '#555'}}>
              <Col md={12}>
                {state.showMore ? <div>{currentCourse.description}</div> : null}
              </Col>
            </Row>
            <Row>
              <Col md={8} />
              <Col md={12} style={{textAlign: 'right', fontSize: 15}}>
                {state.showMore ? <div>
                  <Link to={'/browse/'} style={{cursor: 'pointer', color: 'grey'}}>{'Select other course'}</Link>
                </div> : null}
              </Col>
            </Row>
          </Col>
          <Col md={2} xs={4} style={{textAlign: 'center'}}>
            <Row>
              <a
                style={{margin: 'auto'}}
                className='course-title course-more-less'
                onClick={(e) => { showLessMore(e) }}>
                {state.showMore ? 'Show less' : 'Show details'}
              </a>
            </Row>
            {state.showMore
              ? <Row>
                <Col md={12}>
                  {currentCourse.image
                    ? <img className={'img-fluid'} src={currentCourse.image} />
                    : null
                  }
                </Col>
              </Row>
              : null}
          </Col>
        </Row>
      </Container> }
    </Sheet>
  )
}

const Course = props => {
  const { match, fetchCourse, currentCourse } = props

  // currentId: obj.match.params.currentId || 'default',
  const [state, setState] = useState({
    courseUuid: match.params.courseUuid || '00000000-0000-0000-0000-000000000000', // todo add url param
    sections: []
  })

  useEffect(() => {
    // fetch state.courseUuid
    // console.log(state.courseUuid)
    fetchCourse(state.courseUuid)

    window.parent.postMessage({
      'message': 'canGoBack',
      'data': false
    }, '*')
  }, [])

  useEffect(() => {
    if (!currentCourse.uuid) { return }
    var sections = []
    for (var unitIndex = 0; unitIndex < currentCourse.units.length; unitIndex++) {
      var unit = currentCourse.units[unitIndex]
      var items = []
      for (var moduleIndex = 0; moduleIndex < unit.modules.length; moduleIndex++) {
        var module = unit.modules[moduleIndex]
        var name = module.name + ' '
        if (!module.is_locked) {
          name += '(' + module.lesson_completed_count + '/' + module.lesson_count + ') '
        }
        items.push({
          name: name,
          image: module.image,
          href: '/courses/modules/' + module.uuid + '/',
          uuid: module.uuid,
          status: module.status
        })
      }
      sections.push({
        name: unit.name,
        items: items,
        uuid: unit.uuid
      })
    }
    setState({
      ...state,
      sections: sections,
      backLink: null,
      question: null,
      progress: 0,
      answer: null
    })
  }, [
    currentCourse
  ])

  return (
    <div>
      {/*This is course index: <br/>*/}
      {/* 1. Get default course<br/> */}
      {/* 2. Show default course<br/> */}
      TODO 3. Support courseId navigation<br/>
      {/* 6. Spinner while course isFetching */}
      {currentCourse && !currentCourse.isFetching && currentCourse.uuid
        ? <div>
          <CourseInfoPanel currentCourse={currentCourse}/>
          <SectionSheet
            sections={state.sections}
          /></div>
        : <div className='sweet-loading'>
          <RingLoader
            color={'#1caff6'}
            loading={currentCourse.isFetching}
          />
        </div>
      }
    </div>
  )
}

Course.propTypes = {}

const mapStateToProps = function (store) {
  // console.log(store);
  return {
    currentCourse: store.courses.course
  }
}

export default connect(
  mapStateToProps,
  dispatch => {
    return bindActionCreators(coursesActionCreators, dispatch)
    // return {
    //   // deleteCourse: (uuid) => dispatch(deleteCourse(uuid))
    // }
  })(Course)
