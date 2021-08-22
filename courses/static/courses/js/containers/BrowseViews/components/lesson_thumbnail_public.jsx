import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { Col } from 'react-bootstrap'
import copy from 'copy-to-clipboard'

import history from '../../../history'
import { BASE_URL } from '../../../utils/config'
import { Thumbnail } from '../../../components/thumbnail'
import ThumbnailMenu from './thumbnail_menu'

export class LessonThumbnailPublic extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.onTitleClick = this.onTitleClick.bind(this)
    this.onLearnSelect = this.onLearnSelect.bind(this)
    this.onForkSelect = this.onForkSelect.bind(this)
    this.onCopyShareableLink = this.onCopyShareableLink.bind(this)
  }

  onLearnSelect() {
    history.push('/courses/lessons/' + this.props.lesson.uuid + '/', '_self')
  }

  onTitleClick() {
    history.push('/courses/lessons/' + this.props.lesson.uuid + '/', '_self')
  }

  onCopyShareableLink(e) {
    // todo it's better to replace with history's generated url here
    copy(
      window.location.origin +
        BASE_URL +
        'courses/lesson/' +
        this.props.lesson.uuid +
        '/',
    )
  }

  onForkSelect(e) {
    // store.dispatch(addLesson(this.props.lesson.uuid))
  }

  render() {
    return (
      <Col
        // xl={2}
        lg={3}
        md={4}
        sm={6}
        xs={12}
        className={'course-card'}
        style={{ cursor: 'pointer' }}
      >
        <div
          onClick={this.onTitleClick}
          style={{
            paddingBottom: '1rem',
            overflow: 'hidden',
            borderRadius: '15px',
            height: '13rem',
          }}
        >
          <Thumbnail image={this.props.lesson.image} />
        </div>
        <div>
          <ThumbnailMenu lesson={this.props.lesson} />
          <div
            onClick={this.onTitleClick}
            className={'blue-text'}
            style={{
              fontSize: '2rem',
              textAlign: 'justify',
              padding: '0 0.5rem',
            }}
          >
            {this.props.lesson.name}
          </div>
          <div
            style={{
              fontSize: '1rem',
              color: 'gray',
              textAlign: 'left',
              margin: '0 0.5rem 0 0.5rem',
            }}
          >
            Created <Moment fromNow>{this.props.lesson.created_on}</Moment> ∙
            Last updated <Moment fromNow>{this.props.lesson.updated_on}</Moment>
          </div>
        </div>
      </Col>
    )
  }
}

LessonThumbnailPublic.propTypes = {
  lesson: PropTypes.object.isRequired,
}
