import React from 'react'

export class TextChoice extends React.Component {
  render () {
    var style = {}
    var disabled = ''
    if (this.props.hasAnswer) {
      disabled = ' disabled'
      if (this.props.isAnswer) {
        style['backgroundColor'] = 'rgb(79, 212, 24)'
        style['borderColor'] = 'rgb(79, 212, 24)'
      } else if (this.props.wasResponse) {
        style['backgroundColor'] = 'rgb(255, 0, 0)'
        style['borderColor'] = 'rgb(255, 0, 0)'
      }
    }
    return (
      <a className={'btn btn-primary btn-lg' + disabled}
        id={this.props.choice.uuid}
        style={style}
        onClick={this.props.checkAnswer}>
        {this.props.choice.content.text}
      </a>
    )
  }
}
