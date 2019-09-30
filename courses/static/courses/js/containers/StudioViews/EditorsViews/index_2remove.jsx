import React from 'react'

import { FaPlusCircle, FaBackward, FaForward } from 'react-icons/fa'

import { DockableDropTarget, DragItemTypes } from './dnd'
// import { DndProvider } from 'react-dnd'
// import HTML5Backend from 'react-dnd-html5-backend'

import {ModuleContainer} from './containers/module'
import {QuestionContainer} from './containers/question'
import {CourseContainer} from './containers/course'

import {LessonContainer} from './containers/lesson'
import {BackButton} from './components/back_button'
import {QuestionThumbnailContainer} from './containers/question_thumbnail'

import {
    loadModuleIfNeeded, loadLessonIfNeeded,
  loadQuestionIfNeeded, goToQuestion, addQuestion, moveQuestion
} from './actions'
import { Sheet } from './apps/sheet'


class ModuleApp extends React.Component {
  componentDidMount () {
    this.props.dispatch(loadModuleIfNeeded(this.props.match.params.uuid))
  }

  render () {
    return (
      <Sheet>
        <ModuleContainer uuid={this.props.match.params.uuid} />
      </Sheet>
    )
  }
}

ModuleApp = connect()(ModuleApp)

class QuestionApp extends React.Component {
  componentDidMount () {
    this.props.dispatch(loadQuestionIfNeeded(this.props.match.params.uuid))
  }

  render () {
    return (
      <Sheet type='problem'>
        <QuestionContainer uuid={this.props.match.params.uuid}/>
      </Sheet>)
  }
}

QuestionApp = connect()(QuestionApp)

class LessonApp extends React.Component {
  constructor (props) {
    super(props)
    this.handleNextClick = this.handleNextClick.bind(this)
    this.handlePreviousClick = this.handlePreviousClick.bind(this)
    this.handleAddQuestionClick = this.handleAddQuestionClick.bind(this)
    this.handleQuestionDroppedBefore = this.handleQuestionDroppedBefore.bind(this)
  }

  componentDidMount () {
    this.props.dispatch(loadLessonIfNeeded(this.props.match.params.uuid))
  }

  handleQuestionDroppedBefore (beforeQuestionUuid, question) {
    this.props.dispatch(moveQuestion(question.uuid, beforeQuestionUuid))
  }

  handlePreviousClick () {
    this.props.dispatch(goToQuestion(this.props.previousQuestion))
  }
  handleNextClick () {
    this.props.dispatch(goToQuestion(this.props.nextQuestion))
  }
  handleAddQuestionClick () {
    this.props.dispatch(addQuestion(this.props.match.params.uuid))
  }

  render () {
    var questions = []
    for (var i in this.props.questions) {
      questions.push(
        <DockableDropTarget
          key={this.props.questions[i]}
          onDrop={this.handleQuestionDroppedBefore.bind(null, this.props.questions[i])}
          itemType={DragItemTypes.QUESTION} selfUuid={this.props.questions[i]}>
          <QuestionThumbnailContainer
            key={this.props.questions[i]} uuid={this.props.questions[i]}
            selected={this.props.currentQuestion === this.props.questions[i]} />
        </DockableDropTarget>
      )
    }

    return (
      <div className='lesson-editor'>
        <Sheet type='problem'>
          <LessonContainer uuid={this.props.match.params.uuid} />
          {this.props.lesson_type === 0 &&
            <div className='lesson-questions'>
              <a
                onClick={this.handlePreviousClick}
                className={'btn btn-light btn-arrow' + (this.props.previousQuestion ? '' : ' disabled')}>
                {/* <span className='glyphicon glyphicon-backward' /> */}
                <FaBackward />
              </a>
              {questions}
              <DockableDropTarget
                onDrop={this.handleQuestionDroppedBefore.bind(null, null)}
                itemType={DragItemTypes.QUESTION}>
                <a
                  onClick={this.handleAddQuestionClick}
                  className='btn btn-light btn-add'
                  style={{cursor: 'pointer'}}
                >
                  {/* <span className='glyphicon glyphicon-plus-sign' /> */}
                  <FaPlusCircle />
                  <br />Add question
                </a>
              </DockableDropTarget>
              <a
                onClick={this.handleNextClick}
                className={'btn btn-light btn-arrow' + (this.props.nextQuestion ? '' : ' disabled')}>
                {/* <span className='glyphicon glyphicon-forward' /> */}
                <FaForward />
              </a>
            </div>}
          { this.props.lesson_type === 0 && this.props.currentQuestion &&
            <div>
              <hr />
              <QuestionContainer uuid={this.props.currentQuestion} />
            </div>
          }
        </Sheet>
      </div>)
  }
}

LessonApp = connect(
  (state, ownProps) => {
    var previousQuestion, nextQuestion
    var currentLesson = state.lessons[ownProps.match.params.uuid]
    var questions = []
    if (state.currentQuestion && currentLesson) {
      var idx = currentLesson.questions.indexOf(state.currentQuestion)
      if (idx > 0) { previousQuestion = currentLesson.questions[idx - 1] }
      if (idx < currentLesson.questions.length - 1) { nextQuestion = currentLesson.questions[idx + 1] }
      questions = currentLesson.questions
    }
    return {
      questions: questions,
      currentQuestion: state.currentQuestion,
      previousQuestion: previousQuestion,
      nextQuestion: nextQuestion,
      lesson_type: currentLesson && currentLesson.lesson_type
    }
  })(LessonApp)

