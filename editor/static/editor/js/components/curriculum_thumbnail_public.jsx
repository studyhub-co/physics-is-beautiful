import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

import { history } from '../history'

import { Row, Col, Image, Dropdown, Glyphicon, MenuItem } from 'react-bootstrap'

import copy from 'copy-to-clipboard'

import { Thumbnail } from './thumbnail'

import { store } from '../app'

class CurriculumMenuToggle extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    e.preventDefault()
    this.props.onClick(e)
  }

  render () {
    return (
      <Glyphicon glyph={'option-vertical'} onClick={this.handleClick} style={{fontSize: '2rem'}}>
        {this.props.children}
      </Glyphicon>
    )
  }
}

export class CurriculumThumbnailPublic extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.onTitleClick = this.onTitleClick.bind(this)
    this.onLearnSelect = this.onLearnSelect.bind(this)
    this.onViewProfileSelect = this.onViewProfileSelect.bind(this)
  }

  onLearnSelect () {
    window.open('/curriculum/' + this.props.uuid + '/', '_blank')
  }

  onViewProfileSelect () {
    history.push('/curriculum/profile/' + this.props.uuid + '/')
  }

  //
  onTitleClick () {
    window.open('/curriculum/' + this.props.uuid + '/', '_blank')
  }
  //
  // onCopyShareableLink (e) {
  //   copy(window.location.origin + '/curriculum/' + this.props.uuid + '/')
  // }
  //
  // onEditCurriculumSelect (e) {
  //   this.props.onEditCurriculumProfileClick()
  // }
  //
  // onDeleteCurriculum (e) {
  //   this.props.onDeleteCurriculumClick(this.props.uuid)
  // }
  //
  // onForkSelect (e) {
  //   store.dispatch(addCurriculum(this.props.uuid))
  // }

  render () {
    return (
      <Col
        sm={2}
        md={2}
        className={'curriculum-card'}
        style={{'cursor': 'pointer'}}>
        <div onClick={this.onTitleClick} style={{paddingBottom: '1rem', overflow: 'hidden', borderRadius: '15px'}}>
          <Thumbnail image={this.props.image} />
        </div>
        <div>
          <Dropdown
            style={{float: 'right'}}
            id='dropdown-custom-menu'>
            <CurriculumMenuToggle bsRole='toggle' />
            <Dropdown.Menu bsRole='menu' rootCloseEvent={'click'}>
              <MenuItem onSelect={this.onLearnSelect} eventKey='1'><Glyphicon glyph='education' /> Learn</MenuItem>
              <MenuItem onSelect={this.onViewProfileSelect} eventKey='2'><Glyphicon glyph='info-sign' /> View profile</MenuItem>
              {/*<MenuItem onSelect={this.onForkSelect} eventKey='3'><Glyphicon glyph='export' /> Fork</MenuItem>*/}
              {/*<MenuItem onSelect={this.onCopyShareableLink} eventKey='4'><Glyphicon glyph='share-alt' /> Copy shareable link</MenuItem>*/}
              {/*<MenuItem onSelect={this.onDeleteCurriculum} eventKey='5'><Glyphicon glyph='trash' /> Delete</MenuItem>*/}
            </Dropdown.Menu>
          </Dropdown>
          <div onClick={this.onTitleClick} className={'blue-text'} style={{fontSize: '2rem'}}>
            {this.props.name}
          </div>
          <div style={{fontSize: '1.1rem', paddingTop: '0.5rem', textAlign: 'left', margin: '0 0.5rem 0 0.5rem'}}>
            <a href={this.props.author.get_absolute_url} target={'_blank'}>
              {this.props.author.display_name}
            </a> ∙ {this.props.count_lessons } lessons ∙ { this.props.number_of_learners } learners
          </div>
          <div style={{fontSize: '1.1rem', color: 'gray', textAlign: 'left', margin: '0 0.5rem 0 0.5rem'}}>
            Created <Moment fromNow>
              {this.props.created_on}
            </Moment> ∙ Last updated <Moment fromNow>
              {this.props.updated_on}
            </Moment>
          </div>
        </div>
      </Col>
    )
  }
}

CurriculumThumbnailPublic.propTypes = {
  uuid: PropTypes.string.isRequired,
  author: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired
  // onEditCurriculumProfileClick: PropTypes.func.isRequired,
  // onDeleteCurriculumClick: PropTypes.func.isRequired
}
