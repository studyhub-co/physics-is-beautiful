import React from 'react'

import {AnswerChoiceContainer} from '../containers/answer_choice'

// import CardColumns from 'react-bootstrap/CardColumns'
import Row from 'react-bootstrap/Row'

export class MultipleChoiceAnswers extends React.Component {
  render () {
    var answers = []
    // TODO add deleteAnswer function
    for (var i in this.props.answers) {
      let choiceIndex = parseInt(i) + 1

      answers.push(<AnswerChoiceContainer
        key={this.props.answers[i]}
        index={choiceIndex}
        uuid={this.props.answers[i]}
        exclusive={this.props.exclusive}
        withThumbnail={this.props.hasPictures}/>)
    }

    let cards = answers

    if (this.props.hasPictures) {
      cards = <Row>{answers}</Row>
    }

    return <div>
      { cards }
      <div className='editor-col-md-1 module-accessible-block add-answer' onClick={e => { e.preventDefault(); this.props.onAddAnswerClick() }}>
      + Add answer
      </div>
    </div>
  }
}
