import React from 'react'
// import {TextChoice} from './choices/text_choice'
// import {ImageChoice} from './choices/image_choice'
import {ImageWithText} from './choices/image_with_text_choice'

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

  updateAnswer(uuid, state) {
    if (state){
      if (uuid!==this.state.clickedAnswerUuid) {
        this.setState({clickedAnswerUuid: uuid}, function () {
          this.props.updateAnswer([
            this.props.question.uuid,
            {
              answer: {
                uuid: uuid
              }
            }
          ])
        })
      }
    }else{
      //Deselect select one item
      this.props.updateAnswer(null)
    }
  }

  // checkAnswer (o) {
  //   o.persist()
  //   this.setState({
  //       clickedAnswerUuid: o.target.id
  //     }, function () {
  //     this.props.question.submitAnswer(
  //       this.props.question.uuid,
  //       {
  //         answer: {
  //           uuid: o.target.id
  //         }
  //       }
  //     )
  //   })
  // }

  render () {
    var choices = []
    
    var textOnlyMode = true
    for (var i = 0; i < this.props.question.choices.length; i++) {
      var choice = this.props.question.choices[i]
      if (choice.content.image){
        textOnlyMode = false
      }
    }    

    var hasAnswer = false // user gave answer
    if (this.props.answer || this.props.question.is_correct || this.state.selectedAnswersUuids ) {
        hasAnswer = true
    }

    for (var i = 0; i < this.props.question.choices.length; i++) {
      var choice = this.props.question.choices[i]
      
      var isRightChoice = false // right answer
      var wasWrongChoice = false // was wrong answer

      if (hasAnswer){
        if (this.props.answer){ // if we has answer, answer was wrong
          // find right answer
          if (this.props.answer.uuid == choice.uuid) {
            wasWrongChoice = true
          }
        } else {
          // clicked answer
          if (this.state.clickedAnswerUuid == choice.uuid) {
              isRightChoice = true
           }
        }
      }

      choices.push(
        <ImageWithText
          textOnlyMode={textOnlyMode}
          key={choice.uuid}
          choice={choice}
          type={'RADIO_BUTTON'}
          checked={choice.uuid===this.state.clickedAnswerUuid}
          selectAnswer={this.updateAnswer.bind(this)}
          hasAnswer={hasAnswer}
          isRightChoice={isRightChoice}
          wasWrongChoice={wasWrongChoice}
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