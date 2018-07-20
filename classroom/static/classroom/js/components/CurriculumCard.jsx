import React from 'react'
import PropTypes from 'prop-types'

export class CurriculumCard extends React.Component {
  render () {
    var className = 'curriculum-card'
    if (this.props.selectedUuid === this.props.curriculum.uuid){
      className += ' selected-curriculum-card'
    }

    return (
      <div className={className}>
        <span><img style={{maxHeight: '4rem', maxWidth: '10rem', paddingRight: '1rem'}} src={this.props.curriculum.image} /></span>
        <span style={{color: 'rgb(8, 209, 255)'}}>{ this.props.curriculum.name }</span>
        <span style={{color: 'rgb(121, 121, 121)'}}> by {this.props.curriculum.author.full_name}</span>
      </div>
    )
  }
}

CurriculumCard.propTypes = {
  curriculum: PropTypes.object,
  selectedUuid: PropTypes.string
}
