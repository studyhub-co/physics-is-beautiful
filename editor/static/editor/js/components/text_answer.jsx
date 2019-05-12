import React from 'react'

export class TextAnswer extends React.Component {
  render () {
    return (
      <div className='module-accessible-block'>
        <textarea value={this.props.text} onChange={this.props.onTextChange}/>
      </div>)
  }
}
