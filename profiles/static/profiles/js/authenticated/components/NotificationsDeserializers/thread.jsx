import React from 'react'
import PropTypes from 'prop-types'

export default class Thread extends React.Component {
  render () {
    return (
      <span>
        <a href={this.props.thread.url}>{this.props.thread.title}</a>
      </span>
    )
  }
}

Thread.propTypes = {
  thread: PropTypes.object.isRequired
}
