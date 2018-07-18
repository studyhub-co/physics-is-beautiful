import React from 'react'
import PropTypes from 'prop-types'

export class PopupWindow extends React.Component {
  render () {
    var className = 'pop-up-windows'

    return (
      <div className={className}>
        { this.props.children }
      </div>
    )
  }
}

PopupWindow.propTypes = {
  children: PropTypes.object
}
