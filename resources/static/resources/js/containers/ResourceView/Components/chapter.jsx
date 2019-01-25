import React from 'react'

import PropTypes from 'prop-types'

import { DragSource } from 'react-dnd'
import { Glyphicon } from 'react-bootstrap'

import { EditableLabel } from '../../../utils/editableLabel'
import { DockableDropTarget, DragItemTypes } from '../../../dnd'
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
                  onChange={(value) => { this.props.onChangeChapterValue(value, this.props.chapter) }}
                  editMode={this.props.chapterEditModeId === this.props.chapter.id}
                /></div> : this.props.chapter.title
            }
          </span>
          { this.props.chapter.problems ? this.props.chapter.problems.map(function (problem, i) { // ============ problems
            return <DockableDropTarget
              key={problem.uuid}
              onDrop={(droppedProblem) => { this.props.onProblemDroppedBefore(problem, droppedProblem) }}
              // onDrop={this.props.onProblemDroppedBefore.bind(null, this.props.modules[i])}
              itemType={DragItemTypes.PROBLEM}
              self={problem}
              idAttr={'uuid'}
            >
              <Problem
                resource={this.props.resource}
                resourceEditMode={this.props.resourceEditMode}
                onChangeProblemTitle={this.props.onChangeProblemTitle}
                key={problem.uuid}
                problem={problem}
              />
            </DockableDropTarget>
          }, this)
            : null
          }
          {this.props.resourceEditMode
            ? <DockableDropTarget
              onDrop={(droppedProblem) => { this.props.onProblemDroppedBefore(null, droppedProblem) }}
              itemType={DragItemTypes.PROBLEM}
              self={null}
              idAttr={'uuid'}
            >
              <div // Add problem button
                style={{paddingLeft: '3rem', cursor: 'pointer'}}
                onClick={() => this.props.addProblemClick(this.props.chapter)}
                className={'blue-text'}>
                <Glyphicon glyph='plus' /> Add problem
              </div>
            </DockableDropTarget>
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
  onProblemDroppedBefore: PropTypes.func.isRequired,
  onChangeChapterValue: PropTypes.func.isRequired,
  addProblemClick: PropTypes.func.isRequired
}

const dragSource = {
  beginDrag (props) {
    return props.chapter
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
