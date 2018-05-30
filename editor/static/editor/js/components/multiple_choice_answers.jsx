import React from 'react';

import {AnswerChoiceContainer} from '../containers/answer_choice';

export class MultipleChoiceAnswers extends React.Component {

  render() {
    var answers = [];
    for (var i in this.props.answers) {
      answers.push(<AnswerChoiceContainer key={this.props.answers[i]} uuid={this.props.answers[i]} exclusive={this.props.exclusive}/>)
    }
    return <div>
      {answers}
      <div className="col-md-1 module-accessible-block">
      <a onClick={this.props.onAddAnswerClick}><span className="glyphicon glyphicon-plus-sign"/> Add answer</a>
      </div>    
    </div>;
  }
  
}
