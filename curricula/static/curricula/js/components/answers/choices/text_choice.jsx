import React from 'react'

export class TextChoice extends React.Component {

  checkAnswer (o) {
      o.target.id = this.props.choice.uuid
      this.props.checkAnswer(o)
  }

  render () {
    var style = {}
    var disabled = ''
    if (this.props.hasAnswer) {
      disabled = ' disabled'
      if (this.props.wasResponse) {
        if(this.props.isAnswer) { // right answer
          style['backgroundColor'] = 'rgb(79, 212, 24)'
          style['borderColor'] = 'rgb(79, 212, 24)'
        } else { // wrong answer
          style['backgroundColor'] = 'rgb(255, 0, 0)'
          style['borderColor'] = 'rgb(255, 0, 0)'
        }
      }
    }
    return (
      <a className={'btn btn-primary btn-lg' + disabled}
        id={this.props.choice.uuid}
        style={style}
        onClick={this.checkAnswer.bind(this)}>
        {this.props.choice.content.text}
      </a>
    )
  }
}
