import React from 'react'
import PropTypes from 'prop-types'

export class Text extends React.Component {
  constructor (props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.state = {
      text: ''
    }
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
    this.setState({text: e.target.value})
  }

  reset () {
    this.setState({text: ''})
  }

  render () {
    var hasAnswer = false // user gave answer
    if (this.props.answer || this.props.question.is_correct) {
      hasAnswer = true
    }

    return (
      <div className='bounding-box'>
        <textarea value={this.state.text} onChange={this.handleInputChange} disabled={hasAnswer}/>
      </div>
    )
  }
}
