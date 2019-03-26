import React from 'react'
import PropTypes from 'prop-types'

export default class Badge extends React.Component {
  render () {
    return (
      <div>
        <a
          href={this.props.badge.url}
          title='bronze badge: Answer score of 10 or more'
          className={'badge badge-dark'}>
          <span className={'badge-dot badge-dot-color-' + this.props.badge.level} />
          {this.props.badge.title}</a>
        {this.props.badge.count > 1
          ? <span>
            <span className={'item-multiplier'}>x</span>
            <span className={'item-multiplier-count'}>{this.props.badge.count}</span>
          </span>
          : null }
      </div>
    )
  }
}

Badge.propTypes = {
  badge: PropTypes.object.isRequired
}
