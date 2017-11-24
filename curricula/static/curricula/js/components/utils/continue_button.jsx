import React from 'react'

export class ContinueButton extends React.Component {
  render () {
    return (
      <div className={'button-group' + (this.props.hidden ? ' hidden' : '')}>
        <a className='btn btn-primary' onClick={this.props.continueClick}>Continue</a>
      </div>
    )
  }
}
ContinueButton.propTypes = {
  hidden: React.PropTypes.bool,
  continueClick: React.PropTypes.func
}
ContinueButton.defaultProps = {
  hidden: true
}
