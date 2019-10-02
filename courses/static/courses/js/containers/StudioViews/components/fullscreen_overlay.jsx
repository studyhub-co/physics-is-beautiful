import React from 'react'
import ReactDOM from 'react-dom'

export class Overlay extends React.PureComponent {
  constructor (props) {
    super(props)
    this.el = document.createElement('div')
    this.el.id = 'full-screen-overlay'
    this.rootHtml = document.getElementsByTagName('body')[0]
  }

  componentDidMount () {
    this.rootHtml.appendChild(this.el)
  }

  componentWillUnmount () {
    this.rootHtml.removeChild(this.el)
  }

  render () {
    return ReactDOM.createPortal(this.props.children, this.el)
  }
}
