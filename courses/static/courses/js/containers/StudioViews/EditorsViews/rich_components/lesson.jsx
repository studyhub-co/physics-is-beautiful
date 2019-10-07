import React from 'react'

import PropTypes from 'prop-types'
import { FaTimes, FaExternalLinkAlt } from 'react-icons/fa'

import { BASE_URL } from '../../../../utils/config'

import { EditableThumbnail } from '../components/thumbnail'
import { EditableLabel } from '../components/label'
import { BackButton } from '../components/back_button'

export class Lesson extends React.Component {
  constructor (props) {
    super(props)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
  }

  componentDidMount () {
    this.props.loadLessonIfNeeded(this.props.match.params.uuid)
  }

  handleDeleteClick (e) {
    e.preventDefault()
    if (
      confirm(
        'This will permanently delete lesson "' +
          this.props.name +
          '" with all its questions. Are you sure?'
      )
    ) {
      this.props.onDeleteClick()
    }
  }

  render () {
    if (this.props.loading) {
      return <div>Loading...</div>
    }
    return (
      <div className='lesson'>
        <BackButton
          link={BASE_URL + 'studio/editor/modules/' + this.props.module + '/'}
        />
        <h1>
          <EditableThumbnail
            image={this.props.image}
            onChange={this.props.onImageChange}
          />
          <EditableLabel
            value={this.props.name}
            onChange={this.props.onNameChange}
            defaultValue='New lesson'
          />
          <FaTimes onClick={this.handleDeleteClick} />
        </h1>
        {/*<label>*/}
          {/*<input*/}
            {/*type='radio'*/}
            {/*value='0'*/}
            {/*checked={this.props.lesson_type === 0}*/}
            {/*onChange={e => this.props.onTypeChange(0)}*/}
          {/*/>{' '}*/}
          {/*Normal lesson*/}
        {/*</label>*/}
        {/*<label>*/}
          {/*<input*/}
            {/*type='radio'*/}
            {/*value='1'*/}
            {/*checked={this.props.lesson_type === 1}*/}
            {/*onChange={e => this.props.onTypeChange(1)}*/}
          {/*/>{' '}*/}
          {/*Game*/}
        {/*</label>*/}
        {/*{this.props.lesson_type === 1 && (*/}
          {/*<select*/}
            {/*value={this.props.game_type}*/}
            {/*onChange={this.props.onGameTypeChange}*/}
          {/*>*/}
            {/*<option value='vector-game'>Draw vector game</option>*/}
            {/*<option value='unit-conversion'>Unit conversion game</option>*/}
          {/*</select>*/}
        {/*)}*/}
        <a
          href={BASE_URL + 'course/lessons/' + this.props.uuid}
          className='btn btn-light'
        >
          <FaExternalLinkAlt /> Open student view
        </a>
      </div>
    )
  }
}

Lesson.propTypes = {
  uuid: PropTypes.string,
  loadLessonIfNeeded: PropTypes.func.isRequired,
  onImageChange: PropTypes.func.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  image: PropTypes.string,
  name: PropTypes.string
}
