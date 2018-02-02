import React from 'react'

export class ImageWithText extends React.Component {

  constructor (props) {
    super(props)
    this.state = { checked: false }
  }

  cardClick (evt) {

    this.setState({
      checked: !this.state.checked
    })
    this.props.selectAnswer(this.props.choice.uuid, !this.state.checked)
    evt.stopPropagation();
    evt.preventDefault();
  }

  render () {
    var style = {}
    if (this.props.hasAnswer) {
      var disabled = ' disabled'
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
    var image = null
    if (this.props.choice.content.image){
      image = <img
            className='card-img-top img-responsive'
            style={style}
            src={this.props.choice.content.image}
          />
    }
    //onClick={this.cardClick.bind(this)}
    return (
      <div onClick={this.cardClick.bind(this)} className='card' style={{width: '20rem', float: 'left'}}  id={this.props.choice.uuid}>
        { image }
          <div className={'card-block'} style={{padding: '.5rem'}}>
            <div className={'pure-checkbox'} style={{float: 'left'}}>
              <input id={'checkbox'+this.props.choice.uuid} value={this.props.choice.content.text} type='checkbox' checked={this.state.checked}/>
              <label htmlFor={'checkbox'+this.props.choice.uuid}>{this.props.choice.content.text}</label>
              {/*{this.props.choice.content.text}*/}
            </div>
            <div onClick={this.cardClick.bind(this)}  style={{float: 'right'}}>
              {this.props.index+1}
            </div>
            <div style={{clear: 'both'}}></div>
          </div>
      </div>
    )
  }
}
ImageWithText.propTypes = {
  selectAnswer: React.PropTypes.func.isRequired
}
