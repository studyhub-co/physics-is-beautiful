import React from 'react'
import PropTypes from 'prop-types'

export class PopupWindow extends React.Component {
  render () {
    var className = 'pop-up-window'

    return (
      <div className={className}>
        <button type='button' className='close' aria-label='Close' onClick={() => { this.props.goBack() }}><span aria-hidden='true'>×</span></button>
        { this.props.children }
      </div>
    )
  }
}

PopupWindow.propTypes = {
  children: PropTypes.object,
  goBack: PropTypes.func
}
