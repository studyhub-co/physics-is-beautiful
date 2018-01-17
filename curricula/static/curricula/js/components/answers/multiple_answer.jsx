import React from 'react'
import {TextChoice} from './choices/text_choice'
import {ImageChoice} from './choices/image_choice'

export class MultipleAnswer extends React.Component {

  constructor (props) {
    super(props)
    this.state = { clickedAnswer: false }
  }

  checkAnswer (o) {
    o.persist()
    this.setState({
        clickedAnswer: true
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
    var hasAnswer = this.props.answer !== null
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
      var wasResponse = false
      if (hasAnswer) {
        if (this.props.answer.uuid == choice.uuid) {
          isAnswer = true
        } else if (this.props.question.response.answer.uuid == choice.uuid) {
          wasResponse = true
        }
      }
      choices.push(
        <Component
          key={choice.uuid}
          choice={choice}
          checkAnswer={this.checkAnswer.bind(this)}
          clickedAnswer={this.state.clickedAnswer}
          hasAnswer={hasAnswer}
          isAnswer={isAnswer}
          wasResponse={wasResponse}
        />
      )
    }
    return (
      <div className='col-md-6 text-center'>
        <div className='bounding-box'>
          <h1>Select answer below:</h1>
          {choices}
        </div>
      </div>
    )
  }
}