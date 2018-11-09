import React from 'react'
// import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

import { history } from '../../history'

import { Row, Col, Image, Dropdown, Glyphicon, MenuItem } from 'react-bootstrap'

import copy from 'copy-to-clipboard'

import { Thumbnail } from './../thumbnail'

import { store } from '../../app'

class ModuleMenuToggle extends React.Component {
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

export class ModuleThumbnailPublic extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.onTitleClick = this.onTitleClick.bind(this)
    this.onLearnSelect = this.onLearnSelect.bind(this)
    this.onForkSelect = this.onForkSelect.bind(this)
    this.onCopyShareableLink = this.onCopyShareableLink.bind(this)
  }

  onLearnSelect () {
    window.open('/curriculum/modules/' + this.props.module.uuid + '/', '_blank')
  }

  onTitleClick () {
    window.open('/curriculum/modules/' + this.props.module.uuid + '/', '_blank')
  }

  onCopyShareableLink (e) {
    copy(window.location.origin + '/curriculum/module/' + this.props.module.uuid + '/')
  }

  onForkSelect (e) {
    // store.dispatch(addModule(this.props.module.uuid))
  }

  render () {
    return (
      <Col
        sm={2}
        md={2}
        className={'curriculum-card'}
        style={{'cursor': 'pointer'}}>
        <div onClick={this.onTitleClick} style={{paddingBottom: '1rem', overflow: 'hidden', borderRadius: '15px'}}>
          <Thumbnail image={this.props.module.image} />
        </div>
        <div>
          <Dropdown
            style={{float: 'right'}}
            id='dropdown-custom-menu'>
            <ModuleMenuToggle bsRole='toggle' />
            {/*<CustomModuleMenu bsRole='menu'>*/}
            <Dropdown.Menu bsRole='menu' rootCloseEvent={'click'}>
              <MenuItem onSelect={this.onLearnSelect} eventKey='1'><Glyphicon glyph='education' /> Learn</MenuItem>
              <MenuItem onSelect={this.onForkSelect} eventKey='3'><Glyphicon glyph='export' /> Fork to curriculum studio</MenuItem>
              <MenuItem onSelect={this.onCopyShareableLink} eventKey='4'><Glyphicon glyph='share-alt' /> Copy shareable link</MenuItem>
            </Dropdown.Menu>
            {/*</CustomModuleMenu>*/}
          </Dropdown>
          <div onClick={this.onTitleClick} className={'blue-text'} style={{fontSize: '2rem'}}>
            {this.props.module.name}
          </div>
          {/*<div style={{fontSize: '1.1rem', paddingTop: '0.5rem', textAlign: 'left', margin: '0 0.5rem 0 0.5rem'}}>*/}
            {/*<a href={this.props.module.author.get_absolute_url} target={'_blank'}>*/}
              {/*{this.props.module.author.display_name}*/}
            {/*</a> ∙ {this.props.module.count_lessons } lessons ∙ { this.props.module.number_of_learners } learners*/}
          {/*</div>*/}
          <div style={{fontSize: '1.1rem', color: 'gray', textAlign: 'left', margin: '0 0.5rem 0 0.5rem'}}>
            Created <Moment fromNow>
              {this.props.module.created_on}
            </Moment> ∙ Last updated <Moment fromNow>
              {this.props.module.updated_on}
            </Moment>
          </div>
        </div>
      </Col>
    )
  }
}

ModuleThumbnailPublic.propTypes = {
  module: PropTypes.object.isRequired
}
