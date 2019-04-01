import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { Col } from 'react-bootstrap'
import copy from 'copy-to-clipboard'

import { Thumbnail } from './../thumbnail'
import ThumbnailMenu from './thumbnail_menu'

// class LessonMenuToggle extends React.Component {
//   constructor (props, context) {
//     super(props, context)
//     this.handleClick = this.handleClick.bind(this)
//   }
//
//   handleClick (e) {
//     e.preventDefault()
//     this.props.onClick(e)
//   }
//
//   render () {
//     return (
//       <Glyphicon glyph={'option-vertical'} onClick={this.handleClick} style={{fontSize: '2rem'}}>
//         {this.props.children}
//       </Glyphicon>
//     )
//   }
// }

export class LessonThumbnailPublic extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.onTitleClick = this.onTitleClick.bind(this)
    this.onLearnSelect = this.onLearnSelect.bind(this)
    this.onForkSelect = this.onForkSelect.bind(this)
    this.onCopyShareableLink = this.onCopyShareableLink.bind(this)
  }

  onLearnSelect () {
    window.open('/curriculum/lessons/' + this.props.lesson.uuid + '/', '_blank')
  }

  onTitleClick () {
    window.open('/curriculum/lessons/' + this.props.lesson.uuid + '/', '_blank')
  }

  onCopyShareableLink (e) {
    copy(window.location.origin + '/curriculum/lesson/' + this.props.lesson.uuid + '/')
  }

  onForkSelect (e) {
    // store.dispatch(addLesson(this.props.lesson.uuid))
  }

  render () {
    return (
      <Col
        sm={2}
        md={2}
        className={'curriculum-card'}
        style={{'cursor': 'pointer'}}>
        <div onClick={this.onTitleClick} style={{paddingBottom: '1rem', overflow: 'hidden', borderRadius: '15px'}}>
          <Thumbnail image={this.props.lesson.image} />
        </div>
        <div>
          <ThumbnailMenu lesson={this.props.lesson} />
          {/*<Dropdown*/}
            {/*style={{float: 'right'}}*/}
            {/*id='dropdown-custom-menu'>*/}
            {/*<LessonMenuToggle bsRole='toggle' />*/}
            {/*/!*<CustomLessonMenu bsRole='menu'>*!/*/}
            {/*<Dropdown.Menu bsRole='menu' rootCloseEvent={'click'}>*/}
              {/*<MenuItem onSelect={this.onLearnSelect} eventKey='1'><Glyphicon glyph='education' /> Learn</MenuItem>*/}
              {/*<MenuItem onSelect={this.onForkSelect} eventKey='3'><Glyphicon glyph='export' /> Fork to curriculum studio</MenuItem>*/}
              {/*<MenuItem onSelect={this.onCopyShareableLink} eventKey='4'><Glyphicon glyph='share-alt' /> Copy shareable link</MenuItem>*/}
            {/*</Dropdown.Menu>*/}
            {/*/!*</CustomLessonMenu>*!/*/}
          {/*</Dropdown>*/}
          <div onClick={this.onTitleClick} className={'blue-text'} style={{fontSize: '2rem'}}>
            {this.props.lesson.name}
          </div>
          {/*<div style={{fontSize: '1.1rem', paddingTop: '0.5rem', textAlign: 'left', margin: '0 0.5rem 0 0.5rem'}}>*/}
            {/*<a href={this.props.lesson.author.get_absolute_url} target={'_blank'}>*/}
              {/*{this.props.lesson.author.display_name}*/}
            {/*</a> ∙ {this.props.lesson.count_lessons } lessons ∙ { this.props.lesson.number_of_learners } learners*/}
          {/*</div>*/}
          <div style={{fontSize: '1.1rem', color: 'gray', textAlign: 'left', margin: '0 0.5rem 0 0.5rem'}}>
            Created <Moment fromNow>
              {this.props.lesson.created_on}
            </Moment> ∙ Last updated <Moment fromNow>
              {this.props.lesson.updated_on}
            </Moment>
          </div>
        </div>
      </Col>
    )
  }
}

LessonThumbnailPublic.propTypes = {
  lesson: PropTypes.object.isRequired
}
