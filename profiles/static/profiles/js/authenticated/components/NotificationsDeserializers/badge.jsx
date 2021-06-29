import React from 'react'
import PropTypes from 'prop-types'

export default class Badge extends React.Component {
  render() {
    return (
      <span>
        {/* TODO not used basename of react router, fix this */}
        {/*<a href={this.props.user.get_absolute_url + 'activity/'}>*/}
        {this.props.badge.title} badge ({this.props.badge.description})
        {/*</a>{' '}({this.props.badge.description})*/}
      </span>
    )
  }
}

Badge.propTypes = {
  badge: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}
