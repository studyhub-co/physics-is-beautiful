import React from 'react'
import PropTypes from 'prop-types'

export default class Lesson extends React.Component {
  render () {
    return (
      <a href={'/curriculum/lessons/' + this.props.lesson.uuid}>{this.props.lesson.name}
        {/* todo generate url on a backend */}
      </a>
    )
  }
}

Lesson.propTypes = {
  lesson: PropTypes.object.isRequired
}
