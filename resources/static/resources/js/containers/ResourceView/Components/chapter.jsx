import React from 'react'

import PropTypes from 'prop-types'

import { DragSource } from 'react-dnd'
import { Glyphicon } from 'react-bootstrap'

import { EditableLabel } from '../../../utils/editableLabel'
import { DragItemTypes } from '../../../dnd'
import Problem from './problem'

let ChapterClass = class Chapter extends React.Component {
  render () {
    return (
      this.props.connectDragPreview(
        <div style={{display: this.props.isDragging ? 'none' : 'block'}}>
          <span className={'blue-title'}>
            {this.props.resourceEditMode
              ? <div>
                {this.props.connectDragSource(<span className='drag-handle' />)}
                <EditableLabel
                  value={this.props.chapter.title}
                  onChange={(value) => { this.props.onChangeChapterValue(value, this.props.chapter.id) }}
                  editMode={this.props.chapterEditModeId === this.props.chapter.id}
                /></div> : this.props.chapter.title
            }
          </span>
          {this.props.resourceEditMode
            ? <div // Add problem button
              style={{paddingLeft: '2rem', cursor: 'pointer'}}
              onClick={() => this.props.addProblemClick(this.props.chapter)}
              className={'blue-text'}>
              <Glyphicon glyph='plus' /> Add problem
            </div>
            : null
          }
          { this.props.chapter.problems ? this.props.chapter.problems.map(function (problem, i) { // ============ problems
            return <Problem
              resource={this.props.resource}
              resourceEditMode={this.props.resourceEditMode}
              onChangeProblemTitle={this.props.onChangeProblemTitle}
              key={problem.uuid}
              problem={problem}
            />
          }, this)
            : null
          }
        </div>))
  }
}

ChapterClass.propTypes = {
  chapter: PropTypes.object,
  resource: PropTypes.object,
  chapterEditModeId: PropTypes.number,
  resourceEditMode: PropTypes.bool,
  onChangeProblemTitle: PropTypes.func.isRequired,
  onChangeChapterValue: PropTypes.func.isRequired,
  addProblemClick: PropTypes.func.isRequired
}

const dragSource = {
  beginDrag (props) {
    return props.chapter
    // return {id: props.chapter.id}
  }
}

function collect (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

export default DragSource(DragItemTypes.CHAPTER, dragSource, collect)(ChapterClass)
