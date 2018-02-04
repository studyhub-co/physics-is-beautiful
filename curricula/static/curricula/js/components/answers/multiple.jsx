import React from 'react'
import {TextChoice} from './choices/text_choice'
import {ImageChoice} from './choices/image_choice'

export class MultipleAnswer extends React.Component {

  constructor (props) {
    super(props)
    this.state = { clickedAnswerUuid: null }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.question.uuid !== this.props.question.uuid){
       // reset answer
       this.reset()
    }
  }

  reset () {
    this.setState({ clickedAnswerUuid: null })
    this.props.updateAnswer(null)
  }

  checkAnswer (o) {
    o.persist()
    this.setState({
        clickedAnswerUuid: o.target.id
      }, function () {
      this.props.question.submitAnswer(
        this.props.question.uuid,
        {
          answer: {
            uuid: o.target.id
          }
        }
      )
    })
  }

  render () {
    var choices = []
    // var hasAnswer = this.props.answer !== null
    var hasAnswer = false
    if (this.props.answer || this.props.question.is_correct || this.state.clickedAnswerUuid ) {
        hasAnswer = true
    }
    var Component
    switch (this.props.question.answer_type) {
      case 'TEXT':
        Component = TextChoice
        break
      case 'IMAGE':
        Component = ImageChoice
        break
      default:
        return (
          <div className='col-md-6 text-center'>
            <div className='bounding-box'>
              <h1>Unrecognized answer type: {this.props.question.answer_type}.</h1>
            </div>
          </div>
        )
    }
    for (var i = 0; i < this.props.question.choices.length; i++) {
      var choice = this.props.question.choices[i]
      var isAnswer = false
      var wasResponse = false // war wrong response

      if (hasAnswer){
        if (this.props.answer){ // if we has answer, answer was wrong
          if (this.props.answer.uuid == choice.uuid) {
            wasResponse = true
            isAnswer = true
          }
        }
        // clicked answer
        if(this.state.clickedAnswerUuid == choice.uuid) {
          if(!this.props.answer){ //if have no answer is right answer
            isAnswer = true
          }
          wasResponse = true
         }
      }

      // if (hasAnswer) {
      //   if (this.props.answer.uuid == choice.uuid) {
      //     isAnswer = true
      //   } else if (this.props.question.response.answer.uuid == choice.uuid) {
      //     wasResponse = true
      //   }
      // }
      choices.push(
        <Component
          key={choice.uuid}
          choice={choice}
          checkAnswer={this.checkAnswer.bind(this)}
          // clickedAnswer={this.state.clickedAnswer}
          hasAnswer={hasAnswer}
          isAnswer={isAnswer}
          wasResponse={wasResponse}
        />
      )
    }
    return (
        <div className='bounding-box'>
          <h1>Select answer below:</h1>
          {choices}
        </div>
    )
  }
}