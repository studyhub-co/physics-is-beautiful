import React from 'react'

import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { Col } from 'react-bootstrap'
import copy from 'copy-to-clipboard'
import { BASE_URL } from '../../../utils/config'
import { Thumbnail } from '../../../components/thumbnail'
import ThumbnailMenu from './thumbnail_menu'

export class ModuleThumbnailPublic extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.onTitleClick = this.onTitleClick.bind(this)
    this.onLearnSelect = this.onLearnSelect.bind(this)
    this.onCopyShareableLink = this.onCopyShareableLink.bind(this)
  }

  onLearnSelect () {
    history.push('/courses/modules/' + this.props.module.uuid + '/', '_self')
  }

  onTitleClick () {
    history.push('/courses/modules/' + this.props.module.uuid + '/', '_self')
  }

  onCopyShareableLink (e) {
    copy(window.location.origin + BASE_URL + 'courses/module/' + this.props.module.uuid + '/')
  }

  render () {
    return (
      <Col
        xl={2}
        lg={3}
        md={4}
        sm={6}
        xs={12}
        className={'course-card'}
        style={{'cursor': 'pointer'}}>
        <div
          onClick={this.onTitleClick}
          style={{paddingBottom: '1rem', overflow: 'hidden', borderRadius: '15px'}}
        >
          <Thumbnail image={this.props.module.image} />
        </div>
        <div>
          <ThumbnailMenu module={this.props.module} />
          <div onClick={this.onTitleClick} className={'blue-text'} style={{fontSize: '2rem'}}>
            {this.props.module.name}
          </div>
          <div style={{fontSize: '1rem', color: 'gray', textAlign: 'left', margin: '0 0.5rem 0 0.5rem'}}>
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
