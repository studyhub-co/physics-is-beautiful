import React from 'react'
import PropTypes from 'prop-types'

export class Text extends React.Component {
  constructor (props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.question.uuid !== this.props.question.uuid) {
      // reset answer
      this.reset()
    }
  }

  handleInputChange (e) {
    this.props.updateAnswer([this.props.question.uuid, {
      text: {
        text: e.target.value
      }}])
  }

  reset () {
    this.setState({text: null})
  }

  render () {
    return (
      <div className='bounding-box'>
        <textarea onChange={this.handleInputChange}/>
      </div>
    )
  }
}
