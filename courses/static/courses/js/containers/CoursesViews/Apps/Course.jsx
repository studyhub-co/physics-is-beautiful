import React from 'react'
import { RingLoader } from 'react-spinners'
import { Col, Container, Row } from 'react-bootstrap'

import { SectionSheet } from '../SectionSheet'

class CourseInfoPanel extends React.Component {
  constructor (obj) {
    super()
    this.state = {
      showMore: false
    }
  }

  showLessMore (e) {
    this.setState({
      showMore: !this.state.showMore
    })
    e.preventDefault()
  }
  render () {
    return (<div className='container section-sheet course-panel-font'>
      <div className='course-display-wrap'>
        {this.props.course
          ? <Container fluid>
            {/* title */}
            <Row>
              <Col md={10} xs={8} >
                <Row>
                  <Col md={12}>
                    <span className='course-title'>{this.props.course.name}</span>
                    <span style={{fontSize: '20px', color: 'darkgrey'}}>&nbsp;
                      {' by '}&nbsp;
                      <a target={'_blank'}
                        href={this.props.course.author.get_absolute_url}
                        className='course-user-link'>
                        {this.props.course.author.display_name}
                      </a>
                    </span>
                  </Col>
                </Row>
                <Row style={{fontWeight: 300, fontSize: 18, color: '#555'}}>
                  <Col md={12}>
                    {this.state.showMore ? <div>{this.props.course.description}</div> : null}
                  </Col>
                </Row>
                <Row>
                  <Col md={8} />
                  <Col md={12} style={{textAlign: 'right', fontSize: 15}}>
                    {this.state.showMore ? <div>
                      <a href={'/browse/'} style={{cursor: 'pointer', color: 'grey'}}>{'Select other course'}</a>
                    </div> : null}
                  </Col>
                </Row>
              </Col>
              <Col md={2} xs={4} style={{textAlign: 'center'}}>
                <Row>
                  <a
                    style={{margin: 'auto'}}
                    className='course-title course-more-less'
                    onClick={(e) => { this.showLessMore(e) }}>
                    {this.state.showMore ? 'Show less' : 'Show details'}
                  </a>
                </Row>
                {this.state.showMore
                  ? <Row>
                    <Col md={12}>
                      {this.props.course.image ? <img className={'img-fluid'} src={this.props.course.image} /> : null}
                    </Col>
                  </Row>
                  : null}
              </Col>
            </Row>
          </Container>
          : null}
      </div>
    </div>)
  }
}

export default class CourseApp extends React.Component {
  constructor (obj) {
    super()
    this.state = {
      currentId: obj.match.params.currentId || 'default',
      sections: [],
      loading: true
    }
    this.fetchState()

    this.course = null
  }

  load () {
    if (!this.course) {
      return
    }
    var sections = []
    for (var unitIndex = 0; unitIndex < this.course.units.length; unitIndex++) {
      var unit = this.course.units[unitIndex]
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
          href: '/modules/' + module.uuid,
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
    this.setState({
      sections: sections,
      backLink: null,
      question: null,
      progress: 0,
      answer: null
    })
  }

  fetchState () {
    $.ajax({
      async: true,
      url: '/api/v1/courses/courses/' + this.state.currentId,
      data: {'expand': 'units.modules'},
      context: this,
      success: function (data, status, jqXHR) {
        this.course = data
        this.load()
      }
    })
  }

  componentDidMount () {
    setTimeout(() => this.setState({loading: false}), 1000)

    window.parent.postMessage({
      'message': 'canGoBack',
      'data': false
    }, '*')
  }

  render () {
    if (this.state.loading) {
      return (
        <div className='sweet-loading'>
          <RingLoader
            color={'#1caff6'}
            loading={this.state.loading}
          />
        </div>
      )
    } else {
      return (
        <div>
          <CourseInfoPanel course={this.course} />
          <SectionSheet
            sections={this.state.sections}
          />
        </div>
      )
    }
  }
}
