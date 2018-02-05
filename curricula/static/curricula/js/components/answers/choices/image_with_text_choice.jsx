import React from 'react'

export class ImageWithText extends React.Component {

  constructor (props) {
    super(props)
    this.state = { checked: false }
  }

   keydown(e) {
    if (e.code.startsWith('Digit')){
        if (e.key === (this.props.index+1).toString()){
          this.setState({
            checked: !this.state.checked
          }, function () {
            this.props.selectAnswer(this.props.choice.uuid, this.state.checked)
          })
      }
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.keydown.bind(this), false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.keydown, false);
  }

  cardClick (evt) {
    this.setState({
      checked: !this.state.checked
    }, function () {
      this.props.selectAnswer(this.props.choice.uuid, this.state.checked)
    })
    evt.stopPropagation();
    evt.preventDefault();
  }

  render () {
    var cardStyle = {width: '20rem', float: 'left'}
    if (this.props.hasAnswer) {
      cardStyle['pointerEvents'] = 'none'
      if (this.props.wasResponse) {
        if (this.props.isAnswer) {
          cardStyle['boxShadow'] = 'green 0px 0px 15px'
          cardStyle['border'] = '2px solid rgb(79, 212, 24)'
        } else if (this.props.wasResponse) {
          cardStyle['boxShadow'] = 'rgb(255, 0, 0) 0px 0px 10px'
        }
      }
    }
    var image = null
    if (this.props.choice.content.image){
      image = <img
            className='card-img-top img-fluid'
            src={this.props.choice.content.image}
          />
    }
    if (this.state.checked) {
      cardStyle.backgroundColor = '#eafcff'
    }
    return (
      <div onClick={this.cardClick.bind(this)} className='card' style={cardStyle}  id={this.props.choice.uuid}>
         <div className='wrapper'>
          { image }
         </div>
          <div className={'card-block'} style={{padding: '.5rem'}}>
            <div className={'pure-checkbox'} style={{float: 'left'}}>
              <input id={'checkbox'+this.props.choice.uuid} value={this.props.choice.content.text} type='checkbox' checked={this.state.checked}/>
              {this.props.choice.content.text ?
                <label htmlFor={'checkbox'+this.props.choice.uuid}>{this.props.choice.content.text}</label> :
                <label htmlFor={'checkbox'+this.props.choice.uuid} style={{padding: "1rem"}}></label>
                }
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
