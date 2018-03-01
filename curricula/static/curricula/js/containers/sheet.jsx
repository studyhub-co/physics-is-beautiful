import React from 'react'
import {Prompt} from 'react-router-dom'
import {Section} from '../navigation'
import {Question} from '../components/question'
import {Footer} from '../components/question_footer'

/* global playAudio */

class LessonComplete extends React.Component {
  componentDidMount () {
    window.onbeforeunload = null
    playAudio('complete')
  }

  render () {
    return (
      <div className='question' id='ajaxDiv'>
        <div style={{height: '15px'}}></div>
        <div className='jumbotron'>
          <h2 className='animated rubberBand' style={{color: '#33A', textAlign: 'center'}}>
              You rock! Lesson complete!
          </h2>
        </div>
        <a className='btn btn-primary btn-lg btn-block' href={'/curriculum/modules/' + this.props.lesson.module}>
              Proceed to next level
        </a>
      </div>
    )
  }
}

class LessonCompleteSheet extends React.Component {

  render () {
    return (
      <div className='container problem-sheet'>
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

  clearAnswerContinue(){
    //TODO now we can remove all updateAnswer(null) in child answers
    this.updateAnswer(null)
    this.props.continueAction()
  }

  updateAnswer (answer) {
    this.answer = answer
    if(this.answer) {
      this.setState({
        disabledCheck: false,
        questionShouldUpdate: false
      })
    } else {
      if (this.state.disabledCheck == false){
        this.setState({
          disabledCheck: true,
          questionShouldUpdate: false
        })
      }
     }
  }

  checkAnswer () {
    if (this.answer) {
      this.setState({
          questionShouldUpdate: true,
          // disabledCheck: true
        }, function () {
        this.props.question.submitAnswer(...this.answer)
      })
    }
  }

  render () {
    return (
      <div className='container problem-sheet'>
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
    var backLink = ''
    if (this.props.backLink) {
      backLink = (
        <a id='backToDashboard' href={this.props.backLink} type='button' className='btn btn-default btn-sm'>
          <span className='glyphicon glyphicon-chevron-left' style={{color: '#888'}}></span>
        </a>
      )
    }
    var sections = []
    this.props.sections.forEach(function(el) {
      sections.push(<Section key={el.uuid} name={el.name} items={el.items}/>)
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
