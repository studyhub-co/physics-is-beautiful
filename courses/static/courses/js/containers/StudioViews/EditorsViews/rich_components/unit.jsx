import React from 'react'

import PropTypes from 'prop-types'
import { FaTimes, FaPlusCircle, FaGripHorizontal } from 'react-icons/fa'
import { DragSource } from 'react-dnd'
import { WithOutContext as ReactTags } from 'react-tag-input'

import { EditableLabel } from '../../../../components/label'
import { EditableThumbnail } from '../../../../components/thumbnail'
import ModuleThumbnailContainer from '../containers/module_thumbnail'
import { DockableDropTarget, DragItemTypes } from '../../../../dnd'
import { tagDelimiters } from '../../../../utils'

class UnitComponent extends React.Component {
  constructor (props) {
    super(props)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.handleTagDelete = this.handleTagDelete.bind(this)
    this.handleTagAddition = this.handleTagAddition.bind(this)
    if (props.hasOwnProperty('tags') && props.tags) {
      this.state = {
        tags: props.tags.map((tag) => {
          return { id: tag, text: tag }
        })
      }
    } else {
      this.state = {tags: []}
    }
  }

  handleTagDelete (i) {
    const { tags } = this.state
    this.props.onDeleteTag(tags[i])
    this.setState({
      tags: tags.filter((tag, index) => index !== i)
    })
  }

  handleTagAddition (tag) {
    this.setState(state => ({ tags: [...state.tags, tag] }))
    this.props.onAddTag(tag)
  }

  handleDeleteClick (e) {
    e.preventDefault()
    if (confirm('This will permanently delete unit "' + this.props.name + '" with all its contents. Are you sure?')) {
      this.props.onDeleteClick()
    }
  }
  componentWillUpdate (nextProps, nextState, nextContext) {
    if (nextProps.tags && nextProps.tags !== this.props.tags) {
      const tags = nextProps.tags.map((tag) => {
        return {id: tag, text: tag}
      })
      this.setState({tags: tags})
    }
  }

  render () {
    const modules = []
    for (var i = 0; i < this.props.modules.length; i++) {
      modules.push(
        <DockableDropTarget key={this.props.modules[i]} onDrop={this.props.onModuleDroppedBefore.bind(null, this.props.modules[i])} itemType={DragItemTypes.MODULE} selfUuid={this.props.modules[i]}>
          <ModuleThumbnailContainer uuid={this.props.modules[i]} />
        </DockableDropTarget>)
    }

    return this.props.connectDragPreview(
      <div className='unit' style={{display: this.props.isDragging ? 'none' : 'block'}}>
        <div className='section-title'>
          <h2>
            {this.props.connectDragSource(<span className='drag-handle'><FaGripHorizontal /></span>)}
            <EditableThumbnail image={this.props.image} onChange={this.props.onImageChange}/>
            <EditableLabel value={this.props.name} onChange={this.props.onNameChange} defaultValue='New unit'/>
            {/* <span className="glyphicon glyphicon-remove" onClick={this.handleDeleteClick}/> */}
            <FaTimes onClick={this.handleDeleteClick} />
          </h2>
        </div>
        <div className='row' style={{paddingLeft: '1rem'}}>
          <ReactTags
            tags={this.state.tags}
            placeholder={'Add new unit tag'}
            // suggestions={suggestions}
            inputFieldPosition='inline'
            handleDelete={this.handleTagDelete}
            handleAddition={this.handleTagAddition}
            allowDragDrop={Boolean(false)}
            delimiters={tagDelimiters} />
        </div>
        <div className='row'>
          {modules}
          <DockableDropTarget
            onDrop={this.props.onModuleDroppedBefore.bind(null, null)}
            itemType={DragItemTypes.MODULE}>
            <div
              className='editor-col-md-1 module-accessible-block btn-add-module'
              onClick={this.props.onAddModuleClick}>
              <div className='thumbnail section-thumbnail'>
                {/* <span className="glyphicon glyphicon-plus-sign"/> */}
                <FaPlusCircle size={'5rem'} />
              </div>
              Add module
            </div>
          </DockableDropTarget>
        </div>
      </div>)
  }
}

const dragSource = {
  beginDrag (props) {
    return {uuid: props.uuid}
  }
}

function collect (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

UnitComponent.propTypes = {
  onAddModuleClick: PropTypes.func.isRequired,
  onDeleteTag: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onAddTag: PropTypes.func.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onImageChange: PropTypes.func.isRequired
}

export const Unit = DragSource(DragItemTypes.UNIT, dragSource, collect)(UnitComponent)
