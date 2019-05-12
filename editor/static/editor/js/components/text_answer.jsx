import React from 'react'
import Form from 'react-bootstrap/Form'

export class TextAnswer extends React.Component {
  constructor (props) {
    super(props)
    this.changeText = this.changeText.bind(this)
    this.state = {text: props.text}
  }

  changeText (event) {
    if (this.timeout) clearTimeout(this.timeout)
    this.setState({
      text: event.target.value
    })
    this.timeout = setTimeout(() => {
      this.props.onTextChange(this.state.text)
    }, 500)
  }

  render () {
    return (
      <Form.Group>
        <Form.Control
          as='textarea'
          rows='3'
          value={this.state.text}
          onChange={this.changeText}
        />
      </Form.Group>
    )
  }
}
