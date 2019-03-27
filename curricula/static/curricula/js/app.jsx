import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {SectionSheet, Sheet} from './containers/sheet'
import {VectorGame} from './games/vector'
import {UnitConversionGame} from './games/unit_conversion'
import {Vector} from 'vector_canvas'
import {UnitConversion} from './components/answers/correct_answers/correct_answers'
import { Container, Row, Col } from 'react-bootstrap'
import { RingLoader } from 'react-spinners'

class CurriculumInfoPanel extends React.Component {
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
    return (<div className='container section-sheet curriculum-panel-font'>
      <div className='curriculum-display-wrap'>
        {this.props.curriculum
          ? <Container fluid>
            {/* title */}
            <Row>
              <Col md={10} xs={8} >
                <Row>
                  <Col md={12}>
                    <span className='curriculum-title'>{this.props.curriculum.name}</span>
                    <span style={{fontSize: '20px', color: 'darkgrey'}}>&nbsp;
                      {' by '}&nbsp;
                      <a target={'_blank'}
                        href={this.props.curriculum.author.get_absolute_url}
                        className='curriculum-user-link'>
                        {this.props.curriculum.author.display_name}
                      </a>
                    </span>
                  </Col>
                </Row>
                <Row style={{fontWeight: 300, fontSize: 18, color: '#555'}}>
                  <Col md={12}>
                    {this.state.showMore ? <div>{this.props.curriculum.description}</div> : null}
                  </Col>
                </Row>
                <Row>
                  <Col md={8} />
                  <Col md={12} style={{textAlign: 'right', fontSize: 15}}>
                    {this.state.showMore ? <div>
                      <a href={'/browse/'} style={{cursor: 'pointer', color: 'grey'}}>{'Select other curriculum'}</a>
                    </div> : null}
                  </Col>
                </Row>
              </Col>
              <Col md={2} xs={4} style={{textAlign: 'center'}}>
                <Row>
                  <a
                    style={{margin: 'auto'}}
                    className='curriculum-title curriculum-more-less'
                    onClick={(e) => { this.showLessMore(e) }}>
                    {this.state.showMore ? 'Show less' : 'Show details'}
                  </a>
                </Row>
                {this.state.showMore
                  ? <Row>
                    <Col md={12}>
                      {this.props.curriculum.image ? <img className={'img-responsive'} src={this.props.curriculum.image} /> : null}
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

class CurriculumApp extends React.Component {
  constructor (obj) {
    super()
    this.state = {
      currentId: obj.match.params.currentId || 'default',
      sections: [],
      loading: true
    }
    this.fetchState()

    this.curriculum = null
  }

  load () {
    if (!this.curriculum) {
      return
    }
    var sections = []
    for (var unitIndex = 0; unitIndex < this.curriculum.units.length; unitIndex++) {
      var unit = this.curriculum.units[unitIndex]
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
      url: '/api/v1/curricula/curricula/' + this.state.currentId,
      data: {'expand': 'units.modules'},
      context: this,
      success: function (data, status, jqXHR) {
        this.curriculum = data
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
          <CurriculumInfoPanel curriculum={this.curriculum} />
          <SectionSheet
            sections={this.state.sections}
          />
        </div>
      )
    }
  }
}

class ModulesApp extends React.Component {
  constructor (obj) {
    super()
    this.state = {
      currentId: obj.match.params.currentId || 'default',
      sections: []
    }
    this.fetchState()

    this.curriculum = null
    this.module = null
  }

  componentDidMount () {
    window.parent.postMessage({
      'message': 'canGoBack',
      'data': true
    }, '*')
  }

  load () {
    if (!this.module) {
      return
    }
    var items = []
    for (var lessonIndex = 0; lessonIndex < this.module.lessons.length; lessonIndex++) {
      var lesson = this.module.lessons[lessonIndex]
      var href
      if (lesson.lesson_type === 'GAME') {
        // href = '/games/' + lesson.game_slug;
        href = '/games/' + lesson.uuid + '/' + lesson.game_slug
      } else {
        href = '/lessons/' + lesson.uuid
      }
      items.push({
        name: lesson.name + ' ',
        image: lesson.image,
        href: href,
        uuid: lesson.uuid,
        status: lesson.status
      })
    }
    var sections = [{
      name: this.module.name,
      items: items,
      uuid: this.module.uuid
    }]

    var backLink = '/'

    // If we are using the mobile app, make the query persist.
    if (window.IS_MOBILE_APP) backLink += '?pib_mobile=true'

    if (window.IS_MOBILE_APP) {
      this.setState({
        sections: sections,
        question: null,
        progress: 0,
        answer: null
      })
    } else {
      this.setState({
        sections: sections,
        backLink: backLink,
        question: null,
        progress: 0,
        answer: null
      })
    }
  }

  fetchState () {
    $.ajax({
      async: true,
      url: '/api/v1/curricula/modules/' + this.state.currentId,
      data: {'expand': 'lessons'},
      context: this,
      success: function (data, status, jqXHR) {
        this.module = data
        this.load()
      }
    })
  }

  render () {
    return (
      <SectionSheet
        backLink={this.state.backLink}
        sections={this.state.sections}
      />
    )
  }
}

class UnitsApp extends React.Component {
  constructor (obj) {
    super()
    this.state = {
      currentId: obj.match.params.currentId || 'default',
      sections: []
    }
    this.fetchState()

    this.curriculum = null
    this.unit = null
  }

  // componentDidMount () {
  //   window.parent.postMessage({
  //     'message': 'canGoBack',
  //     'data': true
  //   }, '*')
  // }

  load () {
    if (!this.unit) {
      return
    }
    var items = []
    for (var moduleIndex = 0; moduleIndex < this.unit.modules.length; moduleIndex++) {
      var module = this.unit.modules[moduleIndex]

      var href = '/modules/' + module.uuid
      items.push({
        name: module.name + ' ',
        image: module.image,
        href: href,
        uuid: module.uuid,
        status: module.status
      })
    }

    var sections = [{
      name: this.unit.name,
      items: items,
      uuid: this.unit.uuid
    }]

    var backLink = '/'

    // If we are using the mobile app, make the query persist.
    // if (window.IS_MOBILE_APP) backLink += '?pib_mobile=true'

    if (window.IS_MOBILE_APP) {
      this.setState({
        sections: sections,
        question: null,
        progress: 0,
        answer: null
      })
    } else {
      this.setState({
        sections: sections,
        backLink: backLink,
        question: null,
        progress: 0,
        answer: null
      })
    }
  }

  fetchState () {
    $.ajax({
      async: true,
      url: '/api/v1/curricula/units/' + this.state.currentId,
      data: {'expand': 'modules'},
      context: this,
      success: function (data, status, jqXHR) {
        this.unit = data
        this.load()
      }
    })
  }

  render () {
    return (
      <SectionSheet
        // backLink={this.state.backLink}
        sections={this.state.sections}
      />
    )
  }
}

export class Expression {
  constructor (representation) {
    this.expression = representation
  }
}

// export class Text {
//   constructor (text, uuid) {
//     this.text = text
//     this.uuid = uuid
//   }
// }

class LessonsApp extends React.Component {
  constructor (obj) {
    super()
    this.state = {
      currentId: obj.match.params.currentId || 'default',
      question: null,
      progress: 0
    }
    this.fetchState()

    this.curriculum = null
    this.module = null
    this.question = null
    this.progress = 0
    this.correct_answer = null
  }

  load () {
    if (!this.question) {
      return
    }
    this.setState({
      question: this.question,
      progress: this.progress,
      correct_answer: this.correct_answer
    })
  }

  submitAnswer (questionId, obj) {
    $.ajax({
      type: 'POST',
      url: '/api/v1/curricula/questions/' + questionId + '/response',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(obj),
      // We must block on this call so that the audio works on mobile
      // (audio must be a result of a click).
      async: false,
      // async: true,
      context: this,
      success: function (data, status, jqXHR) {
        this.question.response = obj
        this.progress = data['score'] / data['required_score'] * 100
        if (data.was_correct) {
          this.question.is_correct = true
          window.playAudio('correct')
        } else {
          this.question.is_correct = false
          switch (data.correct_answer.type) {
            case 'vector':
              this.correct_answer = new Vector(
                data.correct_answer.content.x_component,
                data.correct_answer.content.y_component
              )
              break
            case 'text':
              // this.correct_answer = new Text(data.correct_answer.content.text);
              this.correct_answer = new Text(data.correct_answer.content.text, data.correct_answer.uuid)
              break
            case 'mathematicalexpression':
              this.correct_answer = new Expression(data.correct_answer.content.representation)
              break
            case 'unitconversion':
              this.correct_answer = new UnitConversion(data.correct_answer.content, this.question)
              break
            default:
              this.correct_answer = data.correct_answer
              break
          }
          playAudio('incorrect')
        }
        this.load()
        if (data.was_correct) {
          // setTimeout(
          //     function() {
          //         this.fetchState(this.state.currentId);
          //     }.bind(this),
          //     500
          // );
        }
      }
    })
  }

  continueAction () {
    playAudio('continue')

    if (window.IS_MOBILE_APP) {
      window.scrollTo(0, 0)
    }

    this.fetchState()
  }

  hintClick () {
    this.question.hintCollapsed = !this.question.hintCollapsed
    this.load()
  }

  fetchState () {
    var data = {}
    if (this.question) {
      data['previous_question'] = this.question.uuid
    }
    $.ajax({
      async: true,
      url: '/api/v1/curricula/lessons/' + this.state.currentId + '/next-question',
      context: this,
      data: data,
      success: function (data, status, jqXHR) {
        this.progress = data['score'] / data['required_score'] * 100
        data.submitAnswer = this.submitAnswer.bind(this)
        this.question = data
        this.question.hintCollapsed = true
        this.correct_answer = null
        this.load()
      }
    })
  }

  render () {
    return (
      <Sheet
        question={this.state.question}
        correct_answer={this.state.correct_answer}
        progress={this.state.progress}
        continueAction={this.continueAction.bind(this)}
        hintClick={this.hintClick.bind(this)}
      />
    )
  }
}

class GamesApp extends React.Component {
  constructor (obj) {
    super()
    // this.state = {
    //   slug: obj.match.params.slug
    // };
    this.state = {
      uuid: obj.match.params.uuid,
      slug: obj.match.params.slug
    }
  }

  // gameWon () { // todo remove
  //   $.ajax({
  //     async: true,
  //     // url: '/api/v1/curricula/games/' + this.state.slug + '/success',
  //     url: '/api/v1/curricula/games/' + this.state.uuid + '/success',
  //     context: this,
  //     type: 'POST',
  //     data: {},
  //     success: function (data, status, jqXHR) {
  //
  //     }
  //   });
  // }

  render () {
    var Game
    switch (this.state.slug) {
      case 'vector-game':
        Game = VectorGame
        break
      case 'unit-conversion':
        Game = UnitConversionGame
        break
    }
    // return <Game gameWon={this.gameWon.bind(this)} />
    return <Game uuid={this.state.uuid} />
  }
}

export default class CurriculumRouter extends React.Component {
  render () {
    return (
      <BrowserRouter basename='/curriculum'>
        <Switch>
          <Route path='/lessons/:currentId' component={LessonsApp} />
          <Route path='/modules/:currentId' component={ModulesApp} />
          <Route path='/units/:currentId' component={UnitsApp} />
          {/* <Route path='/games/:slug' component={GamesApp} /> */}
          <Route path='/games/:uuid/:slug' component={GamesApp} />
          <Route path='/:currentId' component={CurriculumApp} />
          <Route path='/' component={CurriculumApp} />
        </Switch>
      </BrowserRouter>
    )
  }
}
