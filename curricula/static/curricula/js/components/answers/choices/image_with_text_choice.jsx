import React from 'react'

export class ImageWithText extends React.Component {

  constructor (props) {
    super(props)
    this.state = { checked: false }
  }

   keydown(e) {
    if (this.props.hasAnswer) {return}
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
    document.addEventListener('keydown', this.keydown.bind(this), false);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.keydown, false);
  }

  componentWillReceiveProps (nextProps) {
    if (typeof(nextProps.checked) != 'undefinded' && nextProps.checked != this.state.checked){
      this.setState({checked: nextProps.checked})
    }
  }

  cardClick (evt) {
    if (this.props.type != 'RADIO_BUTTON') {
      this.setState({
        checked: !this.state.checked
      }, function () {
        this.props.selectAnswer(this.props.choice.uuid, this.state.checked)
      })
      evt.stopPropagation();
      evt.preventDefault();
    } else {
      // checked state changed with props
      this.props.selectAnswer(this.props.choice.uuid, true)

      // this.setState({
      //   checked: true
      // }, function () {
      //   this.props.selectAnswer(this.props.choice.uuid, this.state.checked)
      // })
    }
  }

  render () {
    var cardStyle = {width: '16rem', float: 'left'}
    var buttonStyle = {}
    if (this.props.hasAnswer) {
      cardStyle['pointerEvents'] = 'none'
      buttonStyle['pointerEvents'] = 'none'
        if (this.props.isRightChoice) {
          buttonStyle['boxShadow'] = 'green 0px 0px 15px'
          buttonStyle['border'] = '2px solid rgb(79, 212, 24)'
          cardStyle['boxShadow'] = 'green 0px 0px 15px'
          cardStyle['border'] = '2px solid rgb(79, 212, 24)'
        } else if (this.props.wasWrongChoice) {
          cardStyle['boxShadow'] = 'rgb(255, 0, 0) 0px 0px 10px'
          buttonStyle['boxShadow'] = 'rgb(255, 0, 0) 0px 0px 10px'
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
      cardStyle['backgroundColor'] = '#eafcff'
      buttonStyle['backgroundColor'] = '#eafcff'
      cardStyle['border'] = '.2rem solid #1caff6'
      buttonStyle['border'] = '.2rem solid #1caff6'
    }

    var toReturn
    if (this.props.textOnlyMode){
      if (this.props.type == 'RADIO_BUTTON'){
        // TEXT ONLY RADIO
        toReturn = <div className={'pure-radiobutton answer-button'} onClick={this.cardClick.bind(this)} style={buttonStyle}>
              <span style={{marginRight: '1rem'}}>{this.props.index+1}</span>
              <input id={'radio'+this.props.choice.uuid} value={this.props.choice.content.text} name='radio'
                     type='radio' checked={this.state.checked}/>
          {this.props.choice.content.text ?
              <label htmlFor={'radio'+this.props.choice.uuid}>{this.props.choice.content.text}</label> :
              <label htmlFor={'radio'+this.props.choice.uuid} style={{padding: '1rem'}}></label>
                  }
       </div>
      } else {
        // TEXT ONLY CHECKBOXES
      toReturn = <div className={'pure-checkbox answer-button'} onClick={this.cardClick.bind(this)} style={buttonStyle}>
                      <span style={{marginRight: '1rem'}}>{this.props.index+1}</span>
                <input id={'checkbox'+this.props.choice.uuid} value={this.props.choice.content.text} type='checkbox' checked={this.state.checked}/>
                {this.props.choice.content.text ?
                  <label htmlFor={'checkbox'+this.props.choice.uuid}>{this.props.choice.content.text}</label> :
                  <label htmlFor={'checkbox'+this.props.choice.uuid} style={{padding: '1rem'}}></label>
                  }
            </div>
      }

    }
    else {
      // IMAGE + TEXT RADIO + CHECKBOXES
      toReturn =
        <div onClick={this.cardClick.bind(this)} className='card' style={cardStyle}  id={this.props.choice.uuid}>
         <div className='wrapper'>
          { image }
         </div>

          <div className={'card-block'} style={{padding: '.5rem'}}>
            {this.props.type == 'RADIO_BUTTON' ?
            <div className='pure-radiobutton'  style={{float: 'left'}}>
              <input id={'radio'+this.props.choice.uuid} value={this.props.choice.content.text} name='radio' type='radio' checked={this.state.checked}/>
              {this.props.choice.content.text ?
                  <label htmlFor={'radio'+this.props.choice.uuid}>{this.props.choice.content.text}</label> :
                  <label htmlFor={'radio'+this.props.choice.uuid} style={{padding: '1rem'}}></label>
                  }
            </div>
              :
            <div className={'pure-checkbox'} style={{float: 'left'}}>
                <input id={'checkbox'+this.props.choice.uuid} value={this.props.choice.content.text} type='checkbox' checked={this.state.checked}/>
                {this.props.choice.content.text ?
                  <label htmlFor={'checkbox'+this.props.choice.uuid}>{this.props.choice.content.text}</label> :
                  <label htmlFor={'checkbox'+this.props.choice.uuid} style={{padding: '1rem'}}></label>
                  }
            </div>
            }
            <div onClick={this.cardClick.bind(this)}  style={{float: 'right'}}>
              {this.props.index+1}
            </div>
            <div style={{clear: 'both'}}></div>
          </div>
      </div>
    }

    return (toReturn)
  }
}
ImageWithText.propTypes = {
  selectAnswer: React.PropTypes.func.isRequired
}
