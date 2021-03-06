import React from 'react'
import {Prompt, Link} from 'react-router-dom'
import {FaChevronLeft} from 'react-icons/fa'

import {Section} from '../navigation'
import {Question} from '../components/question'
import {Footer} from '../components/question_footer'
import {Col, Container, Row} from 'react-bootstrap'
import AdSense from 'react-adsense'

/* global playAudio */

class LessonComplete extends React.Component {
  componentDidMount () {
    window.onbeforeunload = null
    playAudio('complete')
  }

  render () {
    return (
      <div className='question' id='ajaxDiv'>
        <div style={{height: '15px'}}/>
        <div className='jumbotron'>
          <h2 className='animated rubberBand' style={{color: '#33A', textAlign: 'center'}}>
            You rock! Lesson complete!
          </h2>
        </div>
        <a className='btn btn-primary btn-lg btn-block' onClick={
          () => window.history.back()} href='javascript:void(0)'>

          Proceed to next level
        </a>
        <AdSense.Google
          client='ca-pub-1780955227395785'
          slot='4334626488'
        />
      </div>
    )
  }
}

class LessonCompleteSheet extends React.Component {
  render () {
    return (
      <div className='container problem-sheet' style={{
        height: window.IS_MOBILE_APP ? 'auto !important' : 'calc(100% - 60px)',
        top: window.IS_MOBILE_APP ? '2rem' : '0px',
        minWidth: window.IS_IOS ? 'auto' : '80vw'}
      }>
        <LessonComplete lesson={this.props.question.lesson} />
        {/* <div></div> */}
      </div>
    )
  }
}

class QuestionSheet extends React.Component {
  constructor () {
    super()
    this.updateAnswer = this.updateAnswer.bind(this)
    this.checkAnswer = this.checkAnswer.bind(this)
    this.answer = null
    this.state = {
      disabledCheck: true
    }
  }

  clearAnswerContinue () {
    // TODO now we can remove all updateAnswer(null) in child answers
    this.updateAnswer(null)
    window.scrollTo(0, 0)
    this.props.continueAction()
  }

  updateAnswer (answer) {
    this.answer = answer
    if (this.answer) {
      this.setState({
        disabledCheck: false,
        questionShouldUpdate: false
      })
    } else {
      if (this.state.disabledCheck === false) {
        this.setState({
          disabledCheck: true,
          questionShouldUpdate: false
        })
      }
    }
  }

  checkAnswer () {
    window.scrollTo(0, document.body.scrollHeight)
    if (this.answer) {
      this.setState({
        questionShouldUpdate: true
        // disabledCheck: true
      }, function () {
        this.props.question.submitAnswer(...this.answer)
      })
    }
  }

  render () {
    return (
      <div className='container problem-sheet' style={{
        height: window.IS_MOBILE_APP ? 'auto !important' : 'calc(100% - 60px)',
        top: window.IS_MOBILE_APP ? '2rem' : '0px',
        minWidth: window.IS_IOS ? 'auto' : '80vw'}
      }>
        <Prompt message='Changes you made may not be saved.' />
        <Question
          question={this.props.question}
          correct_answer={this.props.correct_answer}
          hintClick={this.props.hintClick}
          // continueAction={this.props.continueAction}
          updateAnswer={this.updateAnswer.bind(this)}
          shouldUpdate={this.state.questionShouldUpdate}
          correct={this.props.question.is_correct}
        />
        <Footer
          progress={this.props.progress}
          correct={this.props.question.is_correct}
          thread={this.props.question.thread}
          solutionText={this.props.question.solution_text}
          correct_answer={this.props.correct_answer}
          continueAction={this.clearAnswerContinue.bind(this)}
          checkAction={this.checkAnswer}
          disabledCheck={this.state.disabledCheck}
        />
      </div>
    )
  }
}

export class SectionSheet extends React.Component {
  render () {
    let backLink = ''
    if (this.props.backLink) {
      backLink = (
        <Container fluid>
          <Row>
            <Col sm={12} md={12}>
              {/* TODO replace href with history support https://github.com/ReactTraining/history#readme */}
              {/* to make it work as SPA app */}
              {/* It seems window.history is not enough for this link */}
              <a className={'back-button'} href={this.props.backLink}>
                <FaChevronLeft />
                Course home
              </a>
            </Col>
          </Row>
        </Container>
      )
    }
    var sections = []
    this.props.sections.forEach(function (el) {
      sections.push(<Section key={el.uuid} name={el.name} items={el.items} />)
    })
    return (
      <div className='container section-sheet'>
        {backLink}
        {sections}
      </div>
    )
  }
}

export class Sheet extends React.Component {
  render () {
    var Component = null
    if (this.props.question) {
      if (this.props.progress >= 100) {
        Component = LessonCompleteSheet
      } else {
        Component = QuestionSheet
      }
    } else {
      return <div><Prompt message='Changes you made may not be saved.' /></div>
    }
    return (
      <Component {...this.props} />
    )
  }
}
