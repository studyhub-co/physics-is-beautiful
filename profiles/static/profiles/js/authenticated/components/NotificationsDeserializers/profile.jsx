import React from 'react'
import PropTypes from 'prop-types'

export default class Profile extends React.Component {
  render () {
    return (
      <span>
        <a href={this.props.profile.get_absolute_url}>{this.props.profile.display_name}</a>
      </span>
    )
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired
}
