import React from 'react'
import PropTypes from 'prop-types'

export default class Badge extends React.Component {
  render () {
    return (
      <span>
        <a href={this.props.user.get_absolute_url + 'activity/'}>
          {this.props.badge.title} badge
        </a> ({this.props.badge.description})
      </span>
    )
  }
}

Badge.propTypes = {
  badge: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}
