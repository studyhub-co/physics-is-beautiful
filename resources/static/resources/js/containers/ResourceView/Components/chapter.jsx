import React from 'react'

import PropTypes from 'prop-types'

import AdSense from 'react-adsense'

import { DragSource } from 'react-dnd'
import { FaTimes, FaPlus } from 'react-icons/fa'

import { EditableLabel } from '../../../utils/editableLabel'
import { DockableDropTarget, DragItemTypes } from '../../../dnd'
import Problem from './problem'

let ChapterClass = class Chapter extends React.Component {
  constructor (props) {
    super(props)

    if (props.chapter.show_ad) {
      this.state = {
        [props.chapter.id + 'checked']: 'on'
      }
    } else {
      this.state = {
        [props.chapter.id + 'checked']: 'off'
      }
    }

    this.handleShowAdChange = this.handleShowAdChange.bind(this)
  }

  handleShowAdChange (e, id) {
    var checked = 'on'
    if (this.state[id + 'checked'] === 'on') {
      checked = 'off'
    }
    this.setState({[id + 'checked']: checked})
    let booleanChecked = true
    if (checked === 'off') {
      booleanChecked = false
    }
    this.props.onChangeChapterShowAd(this.props.chapter, booleanChecked)
  }

  render () {
    return (
      this.props.connectDragPreview(
        <div style={{display: this.props.isDragging ? 'none' : 'block'}}>
          <span className={'blue-title'}>
            {this.props.resourceEditMode
              ? <span>
                {this.props.connectDragSource(<span className='drag-handle' />)}
                <EditableLabel
                  value={this.props.chapter.title}
                  onChange={(value) => { this.props.onChangeChapterValue(value, this.props.chapter) }}
                /></span> : this.props.chapter.title
            }
          </span>
          {this.props.resourceEditMode
            ? <span
              className={'red-text'}
              style={{cursor: 'pointer', paddingLeft: '1rem'}}
              onClick={() => this.props.onRemoveChapter(this.props.chapter)}
              title={'Remove the chapter'}
            >
              {/* remove chapter button */}
              {/*<Glyphicon glyph='remove' />&nbsp;*/}
              <FaTimes />&nbsp;
            </span>
            : null }
          { this.props.resourceEditMode
            ? <div // enable ad
              style={{paddingLeft: '3rem'}}
              className={'blue-text'}>
                Show an ad:&nbsp;
              <span className={'pure-radiobutton'}>
                <input
                  id={'radio_on' + this.props.chapter.id}
                  value={'on'}
                  name={'settings' + this.props.chapter.id}
                  onChange={(e) => (this.handleShowAdChange(e, this.props.chapter.id))}
                  type='radio'
                  checked={this.state[this.props.chapter.id + 'checked'] === 'on'} />
                <label htmlFor={'radio_on' + this.props.chapter.id}>{'On'}</label>
              </span>
              <span className={'pure-radiobutton'}>
                <input
                  id={'radio_off' + this.props.chapter.id}
                  value={'off'}
                  name={'settings' + this.props.chapter.id}
                  onChange={(e) => (this.handleShowAdChange(e, this.props.chapter.id))}
                  type='radio'
                  checked={this.state[this.props.chapter.id + 'checked'] === 'off'} />
                <label htmlFor={'radio_off' + this.props.chapter.id}>{'Off'}</label>
              </span>
            </div> : null
          }
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
                onRemoveProblem={this.props.onRemoveProblem}
                key={problem.uuid}
                problem={problem}
              />
            </DockableDropTarget>
          }, this)
            : null
          }
          { !this.props.resourceEditMode && this.props.chapter.show_ad
            ? <div style={{marginTop: 20, marginBottom: 20}}>
              <AdSense.Google
                client='ca-pub-1780955227395785'
                slot='4334626488'
              // style={{marginTop: 20, marginBottom: 20}}
              />
            </div> : null
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
                {/*<Glyphicon glyph='plus' /> Add problem*/}
                <FaPlus /> Add problem
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
  onChangeChapterShowAd: PropTypes.func.isRequired,
  addProblemClick: PropTypes.func.isRequired,
  onRemoveChapter: PropTypes.func.isRequired,
  onRemoveProblem: PropTypes.func.isRequired
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
