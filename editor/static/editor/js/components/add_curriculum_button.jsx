import React from 'react'

export class AddCurriculumButton extends React.Component {
  render () {
    return (
      <div
        className='col-md-1 module-accessible-block vcenter'
        onClick={this.props.onClick}
        style={{'cursor': 'pointer', 'borderStyle': 'dashed'}}
      >
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
          + Create another curriculum from scratch
        </div>
      </div>
    )
  }
}
