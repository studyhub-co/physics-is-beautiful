import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

import { Row, Col, Image, Dropdown, Glyphicon, MenuItem } from 'react-bootstrap'

import { addCurriculum } from './../actions'

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
    {/*<div className='dotted-menu' onClick={this.handleClick}>*/}
        {/*{this.props.children}*/}
      {/*</div>*/}
    return (
      <Glyphicon glyph={'option-vertical'} onClick={this.handleClick} style={{fontSize: '2rem'}}>
        {this.props.children}
      </Glyphicon>
    )
  }
}

export class CurriculumThumbnail extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.onDropDownMenuItemSelect = this.onDropDownMenuItemSelect.bind(this)
    this.onForkSelect = this.onForkSelect.bind(this)
    this.onEditCurriculumSelect = this.onEditCurriculumSelect.bind(this)
    this.onEditContentSelect = this.onEditContentSelect.bind(this)
    this.onTitleClick = this.onTitleClick.bind(this)
  }

  onEditContentSelect (e) {
    this.props.onClick()
  }

  onTitleClick () {
    window.open('/curriculum/' + this.props.uuid + '/', '_blank')
  }

  onDropDownMenuItemSelect (e) {

  }

  onEditCurriculumSelect (e) {
    this.props.onEditCurriculumProfileClick()
  }

  onForkSelect (e) {
    store.dispatch(addCurriculum(this.props.uuid))
  }

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
              <MenuItem onSelect={this.onEditContentSelect} eventKey='1'><Glyphicon glyph='edit' /> Edit content</MenuItem>
              <MenuItem onSelect={this.onEditCurriculumSelect} eventKey='2'><Glyphicon glyph='pencil' /> Edit profile and settings</MenuItem>
              <MenuItem onSelect={this.onForkSelect} eventKey='3'><Glyphicon glyph='export' /> Fork</MenuItem>
              <MenuItem onSelect={this.onDropDownMenuItemSelect} eventKey='4'><Glyphicon glyph='share-alt' /> Copy shareable link</MenuItem>
              <MenuItem onSelect={this.onDropDownMenuItemSelect} eventKey='5'><Glyphicon glyph='trash' /> Delete</MenuItem>
            </Dropdown.Menu>
          </Dropdown>
          <div onClick={this.onTitleClick} className={'blue-text'} style={{fontSize: '2rem'}}>
            {this.props.name}
          </div>
          <div style={{fontSize: '1.1rem', paddingTop: '0.5rem', textAlign: 'left', margin: '0 0.5rem 0 0.5rem'}}>
            <a href={this.props.author.get_absolute_url} target={'_blank'}>
              {this.props.author.display_name}
            </a> ∙ {this.props.count_lessons } lessons ∙ 2k learners
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

CurriculumThumbnail.propTypes = {
  uuid: PropTypes.string.isRequired
}
