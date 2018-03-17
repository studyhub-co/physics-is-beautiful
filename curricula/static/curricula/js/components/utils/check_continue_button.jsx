import React from 'react'

export class CheckContinueButton extends React.Component {
  
  keydown(e) {
    // console.log(e.code);
    if (e.code === "Enter"){
      if (this.props.isCheck){
       this.props.checkAction()
      } else {
       this.props.continueAction()
      }
    }
   }
  
  componentDidMount() {
    document.addEventListener("keydown", this.keydown.bind(this), false)
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.keydown, false)
  }
  
  render () {
    return (
      <div className='button-group'>
        <button id='checkButton'
          className={'btn btn-primary' + ((this.props.isCheck && this.props.disabledCheck) ? ' disabled' : '')}
          onClick={this.props.isCheck ? this.props.checkAction : this.props.continueAction}>
          {this.props.isCheck ? 'Check' : 'Continue'}
        </button>
      </div>
    )
  }
}
CheckContinueButton.propTypes = {
  isCheck: React.PropTypes.bool,
  checkAction: React.PropTypes.func.isRequired,
  continueAction: React.PropTypes.func.isRequired,
  disabledCheck: React.PropTypes.bool
}
CheckContinueButton.defaultProps = {
  isCheck: true
}
