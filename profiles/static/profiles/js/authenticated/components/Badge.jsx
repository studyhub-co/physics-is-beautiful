import React from 'react'
import PropTypes from 'prop-types'

// import history from '../history'

export default class Badge extends React.Component {
  render() {
    return (
      <div>
        <span
          // href={this.props.badge.url}
          style={{ cursor: 'pointer' }}
          onClick={() => {
            // this.props.history.push(this.props.badge.url)
            this.props.history.push(this.props.notificationsUrl)
          }} // TODO add badge history page
          title={this.props.badge.description}
          className={'badge badge-dark profile-badge'}
        >
          <span
            className={'badge-dot badge-dot-color-' + this.props.badge.level}
          />
          {this.props.badge.title}
        </span>
        {this.props.badge.count > 1 ? (
          <span>
            <span className={'item-multiplier'}>x</span>
            <span className={'item-multiplier-count'}>
              {this.props.badge.count}
            </span>
          </span>
        ) : null}
      </div>
    )
  }
}

Badge.propTypes = {
  badge: PropTypes.object.isRequired,
  notificationsUrl: PropTypes.string.isRequired,
}
