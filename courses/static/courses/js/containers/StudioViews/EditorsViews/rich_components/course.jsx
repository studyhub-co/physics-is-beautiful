import React from 'react'

import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import { WithOutContext as ReactTags } from 'react-tag-input'
import { FaTimes, FaExternalLinkAlt } from 'react-icons/fa'

import { BASE_URL } from '../../../../utils/config'
import { BackButton } from '../components/back_button'
import { EditableThumbnail } from '../components/thumbnail'
import { UnitContainer } from '../containers/unit'
import { EditableLabel } from '../components/label'
import { DockableDropTarget, DragItemTypes } from '../components/dnd'
import { tagDelimiters } from '../../../../utils'

export class Course extends React.Component {
  constructor (props) {
    super(props)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.handleTagDelete = this.handleTagDelete.bind(this)
    this.handleTagAddition = this.handleTagAddition.bind(this)
    this.state = {tags: []}
  }

  componentDidMount () {
    // TODO load single course
    this.props.loadCourses()
  }

  handleDeleteClick (e) {
    e.preventDefault()
    if (confirm('This will permanently delete course "' + this.props.name +
      '" with all its materials. Are you sure?')) {
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
    const units = []
    for (var i in this.props.units) {
      var unit = this.props.units[i]
      units.push(
        <DockableDropTarget
          key={unit.uuid}
          onDrop={this.props.onUnitDroppedBefore.bind(null, unit.uuid)}
          itemType={DragItemTypes.UNIT}
          selfUuid={unit.uuid}>
          <UnitContainer key={unit.uuid} uuid={unit.uuid} />
        </DockableDropTarget>)
    }
    var nameLabel
    // TODO get default from course settings
    if (this.props.name !== 'Default Course') {
      nameLabel = <EditableLabel
        value={this.props.name}
        onChange={this.props.onNameChange}
        defaultValue='New course'/>
    } else {
      nameLabel = <span>{this.props.name}</span>
    }

    return (
      <div>
        <BackButton link={BASE_URL + 'studio/'} />
        <div className='course'>
          <h1>
            <EditableThumbnail image={this.props.image} onChange={this.props.onImageChange}/>
            {nameLabel}
            <FaTimes onClick={this.handleDeleteClick} />
            <Link to={BASE_URL + 'courses/' + this.props.uuid + '/'} className='btn btn-light'>
              <FaExternalLinkAlt /> Open student view
            </Link>
          </h1>
          <ReactTags
            tags={this.state.tags}
            // suggestions={suggestions}
            inputFieldPosition='inline'
            handleDelete={this.handleTagDelete}
            handleAddition={this.handleTagAddition}
            allowDragDrop={Boolean(false)}
            delimiters={tagDelimiters} />
          {units}
          <DockableDropTarget onDrop={this.props.onUnitDroppedBefore.bind(null, null)} itemType={DragItemTypes.UNIT}>
            <Button className={'common-button'} onClick={this.props.onAddUnitClick}>Add Unit</Button>
          </DockableDropTarget>
        </div>
      </div>
    )
  }
}

Course.propTypes = {
  onDeleteClick: PropTypes.func.isRequired,
  onImageChange: PropTypes.func.isRequired,
  onAddTag: PropTypes.func.isRequired,
  onDeleteTag: PropTypes.func.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onAddUnitClick: PropTypes.func.isRequired,
  onUnitDroppedBefore: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired
}
