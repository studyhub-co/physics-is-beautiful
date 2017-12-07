import React from 'react'

export class Hint extends React.Component {
  constructor () {
    super()
    this.state = {
      collapsed: true
    }
  }

  onChange (event) {
    this.setState({collapsed: !this.state.collapsed})
  }

  render () {
    var style = {}
    if (this.props.hintCollapsed) {
      style['display'] = 'none'
    }
    return (
      <div className='hintDiv'>
        <div className='hintButton'>
          <a onClick={this.props.onClick}>hint</a>
        </div>
        <div id='demo' style={style}>
          {this.props.hint}
        </div>
      </div>
    )
  }

}
