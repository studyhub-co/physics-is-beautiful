import React from 'react'

import { FaTimes } from 'react-icons/fa'

import {EditableThumbnail} from './thumbnail'
import {EditableLabel} from './label'

import Card from 'react-bootstrap/Card'

export class AnswerChoice extends React.Component {
  render () {
    var thumb = <EditableThumbnail image={this.props.image} onChange={this.props.onImageChange}/>
    var selectionControl = <input type={this.props.exclusive ? 'radio' : 'checkbox'} onChange={this.props.onSelectChange} value={this.props.text} checked={this.props.is_correct}/>
    var label = <EditableLabel value={this.props.text} defaultValue='New answer' onChange={this.props.onTextChange}/>
    // TODO we have no deleteClick function
    var deleteIcon = <FaTimes onClick={this.onDeleteClick} />

    // if (this.props.withThumbnail) {
    //   return (
    //     <div className='answer-choice editor-col-md-1 module-accessible-block with-image'>
    //       <div className='thumbnail'>{thumb}</div>
    //       <div>
    //         {selectionControl} {label} {deleteIcon}
    //       </div>
    //     </div>)
    // } else {
    //   return (
    //     <div className='answer-choice answer-button without-image'>
    //       {selectionControl} {label} {thumb} {deleteIcon}
    //     </div>)
    // }

    return (<Card style={{ height: '13rem' }}>
      <Card.Body>
        {thumb} {selectionControl} {label} {deleteIcon}
      </Card.Body>
    </Card>
    )
  }
}
