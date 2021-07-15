import React from 'react'

import PropTypes from 'prop-types'
import { WithOutContext as ReactTags } from 'react-tag-input'
import { FaTimes, FaPlusCircle } from 'react-icons/fa'

import LessonThumbnailContainer from '../containers/lesson_thumbnail'
import { EditableThumbnail } from '../../../../components/thumbnail'
import { EditableLabel } from '../../../../components/editableLabel'
import { BackButton } from '../components/back_button'
import { DockableDropTarget, DragItemTypes } from '../../../../dnd'
import { tagDelimiters } from '../../../../utils'

export class Module extends React.Component {
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

  componentDidMount () {
    this.props.loadModuleIfNeeded(this.props.uuid)
  }

  handleDeleteClick (e) {
    e.preventDefault()
    if (confirm('This will permanently delete module "' + this.props.name + '" with all its lessons. Are you sure?')) {
      this.props.onDeleteClick()
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

  componentWillUpdate (nextProps, nextState, nextContext) {
    if (nextProps.tags && nextProps.tags !== this.props.tags) {
      const tags = nextProps.tags.map((tag) => {
        return {id: tag, text: tag}
      })
      this.setState({tags: tags})
    }
  }

  render () {
    if (this.props.loading) {
      return <div>Loading...</div>
    }
    const lessons = []
    for (var i = 0; i < this.props.lessons.length; i++) {
      lessons.push(
        <DockableDropTarget
          key={this.props.lessons[i]}
          onDrop={this.props.onLessonDroppedBefore.bind(null, this.props.lessons[i])}
          itemType={DragItemTypes.LESSON}
          selfUuid={this.props.lessons[i]}>
          <LessonThumbnailContainer uuid={this.props.lessons[i]}/>
        </DockableDropTarget>
      )
    }
    return (
      <div className='module'>
        <BackButton link={'/studio/editor/courses/' + this.props.course + '/'}/>
        <h1>
          <EditableThumbnail image={this.props.image} onChange={this.props.onImageChange}/>
          <EditableLabel value={this.props.name} onChange={this.props.onNameChange} defaultValue='New module'/>
          {/* <span className="glyphicon glyphicon-remove" onClick={this.handleDeleteClick}/> */}
          <FaTimes onClick={this.handleDeleteClick} />
        </h1>
        <div className='row' style={{paddingLeft: '1rem'}}>
          <ReactTags
            tags={this.state.tags}
            placeholder={'Add new module tag'}
            // suggestions={suggestions}
            inputFieldPosition='inline'
            handleDelete={this.handleTagDelete}
            handleAddition={this.handleTagAddition}
            allowDragDrop={Boolean(false)}
            delimiters={tagDelimiters} />
        </div>
        <div className='row'>
          {lessons}
          <DockableDropTarget
            onDrop={this.props.onLessonDroppedBefore.bind(null, null)}
            itemType={DragItemTypes.LESSON}>
            <div
              className='editor-col-md-1 module-accessible-block btn-add-lesson'
              onClick={this.props.onAddLessonClick}>
              <div className='thumbnail section-thumbnail'>
                {/* <span className="glyphicon glyphicon-plus-sign"/> */}
                <FaPlusCircle size={'5rem'} />
              </div>
              Add lesson
            </div>
          </DockableDropTarget>
        </div>
      </div>)
  }
}

Module.propTypes = {
  uuid: PropTypes.string.isRequired,
  loadModuleIfNeeded: PropTypes.func.isRequired,
  onAddLessonClick: PropTypes.func.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onAddTag: PropTypes.func.isRequired,
  onLessonDroppedBefore: PropTypes.func.isRequired,
  onImageChange: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  lessons: PropTypes.array
}
