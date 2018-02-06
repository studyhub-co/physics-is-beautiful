import React from 'react'

import {ImageWithText} from './choices/image_with_text_choice'

export class MultiSelectAnswer extends React.Component {

  constructor (props) {
    super(props)
    this.selectedItems = []
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.question.uuid !== this.props.question.uuid){
       // reset answer
       this.reset()
    }
  }

  reset () {
    this.selectedItems = []
    this.props.updateAnswer(null)
  }

  updateAnswer(uuid, state) {
    if (state){
      this.selectedItems.push(uuid)
    } else {
      var index = this.selectedItems.indexOf(uuid)
      if (index !== -1) {
          this.selectedItems.splice(index, 1)
      }
    }
    if (this.selectedItems.length > 0) {
      var answersList = []
      for(var i = 0; i<this.selectedItems.length;i++){
        answersList.push(
           {
            uuid: this.selectedItems[i]
          }
        )
      }

      this.props.updateAnswer([
        this.props.question.uuid,
        {
          answers_list: answersList
        }
      ])
    }
    else {
      this.props.updateAnswer(null)
    }
  }

  render () {
    var choices = []

    // detect text only mode
    var textOnlyMode = true
    for (var i = 0; i < this.props.question.choices.length; i++) {
      var choice = this.props.question.choices[i]
      if (choice.content.image){
        textOnlyMode = false
      }
    }

    var hasAnswer = false // user clicked check button
    if (this.props.answer || this.props.question.is_correct) {
        hasAnswer = true
    }

    for (var i = 0; i < this.props.question.choices.length; i++) {
      var choice = this.props.question.choices[i]

      if (hasAnswer){
        var isRightChoice = false // is right answer
        var wasWrongChoice = false // was wrong answer


        // compare current choice with right answers and checked answers
        // set intial values for selected choice
        for (var j=0; j < this.selectedItems.length; j++){ // go throw clicked answers
          if (this.selectedItems[j] == choice.uuid) {
            if (!this.props.answer){ // if has no answer is right answer
              isRightChoice = true
            } else { // if we have props.answer answer was wrong
              wasWrongChoice = true
            }
           }
        }

        // rewrite values for selected choice nad set values for right answers
        if (this.props.answer){ // if we has answer, answer was wrong
          for (var y=0; y < this.props.answer.length; y++){ // go throw right answers
            if (this.props.answer[y].uuid == choice.uuid) {
              for (var j=0; j < this.selectedItems.length; j++){ //go throw cheched answers
                if (this.selectedItems[j] == choice.uuid) {
                  wasWrongChoice = true
                } else {
                  isRightChoice = true
                }
              }}
            }
          }

      }

      choices.push(
        <ImageWithText
          textOnlyMode={textOnlyMode}
          key={choice.uuid}
          choice={choice}
          selectAnswer={this.updateAnswer.bind(this)}
          hasAnswer={hasAnswer}
          isRightChoice={isRightChoice}
          wasWrongChoice={wasWrongChoice}
          checked={this.selectedItems.indexOf(choice.uuid) != -1}
          index={i}
        />
      )
    }
    return (
        <div className='bounding-box'>
          <h1>Select answer below:</h1>
          <div className={textOnlyMode ? 'button-group': 'card-columns'}>
            {choices}
          </div>
          <div style={{clear: 'both'}}></div>
        </div>
    )
  }
}
MultiSelectAnswer.propTypes = {
  updateAnswer: React.PropTypes.func.isRequired
}