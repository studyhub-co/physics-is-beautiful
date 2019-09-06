import React from 'react'
import PropTypes from 'prop-types'

export default class Module extends React.Component {
  render () {
    return (
      <span>{this.props.module.name}</span>
    )
  }
}

Module.propTypes = {
  module: PropTypes.object.isRequired
}
