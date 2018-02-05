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
      this.setState({ clickedAnswerUuid: uuid }, function () {
        this.props.updateAnswer([
          this.props.question.uuid,
          {
            answer:  {
               uuid: uuid
             }
          }
        ])
      })
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

    var hasAnswer = false
    if (this.props.answer || this.props.question.is_correct || this.state.selectedAnswersUuids ) {
        hasAnswer = true
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

      // console.log("-----")
      // console.log(this.state.clickedAnswerUuid);
      // console.log(choice.uuid);
      // console.log("-----")

      choices.push(
        <ImageWithText
          key={choice.uuid}
          choice={choice}
          type={'RADIO_BUTTON'}
          // checkAnswer={this.checkAnswer.bind(this)}
          checked={choice.uuid===this.state.clickedAnswerUuid}
          selectAnswer={this.updateAnswer.bind(this)}
          hasAnswer={hasAnswer}
          isAnswer={isAnswer}
          wasResponse={wasResponse}
          index={i}
        />
      )
    }
    return (
         <div className='bounding-box'>
          <h1>Select answer below:</h1>
          <div className='card-columns'>
            {choices}
          </div>
          <div style={{clear: 'both'}}></div>
        </div>
    )
  }
}