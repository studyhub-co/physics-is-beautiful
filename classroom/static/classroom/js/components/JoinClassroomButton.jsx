import React from 'react'
import PropTypes from 'prop-types'

export class JoinClassroomButton extends React.Component {
  render () {
    // var className = 'curriculum-card'
    // if (this.props.selectedUuid === this.props.curriculum.uuid){
    //   className += ' selected-curriculum-card'
    // }

    return (
      <div className={'create-classroom-button'}
        onClick={() => {console.log("hi");}}>
        + Join classroom
      </div>
    )
  }
}

JoinClassroomButton.propTypes = {
  // curriculum: PropTypes.object,
  // selectedUuid: PropTypes.string
}
