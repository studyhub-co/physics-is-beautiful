import React from 'react'

export class ImageChoice extends React.Component {
  render () {
    var style = {}
    if (this.props.hasAnswer) {
      style['pointerEvents'] = 'none'
      if (this.props.wasResponse) {
        if (this.props.isAnswer) {
          style['boxShadow'] = 'green 0px 0px 15px'
          style['border'] = '2px solid rgb(79, 212, 24)'
        } else if (this.props.wasResponse) {
          style['boxShadow'] = 'rgb(255, 0, 0) 0px 0px 10px'
        }
      }
    }
    return (
      <img
        className='inline-picture'
        id={this.props.choice.uuid}
        style={style}
        src={this.props.choice.content.image}
        onClick={this.props.checkAnswer}
      />
    )
  }

}
