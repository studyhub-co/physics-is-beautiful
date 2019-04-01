import React from 'react'

// import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { Col } from 'react-bootstrap'

import { Thumbnail } from './../thumbnail'
import ThumbnailMenu from './thumbnail_menu'

export class UnitThumbnailPublic extends React.Component {
  render () {
    return (
      <Col
        sm={2}
        md={2}
        className={'curriculum-card'}
        style={{'cursor': 'pointer'}}>
        <div onClick={this.onTitleClick} style={{paddingBottom: '1rem', overflow: 'hidden', borderRadius: '15px'}}>
          <Thumbnail image={this.props.unit.image} />
        </div>
        <div>
          <ThumbnailMenu unit={this.props.unit} />
          <div onClick={this.onTitleClick} className={'blue-text'} style={{fontSize: '2rem'}}>
            {this.props.unit.name}
          </div>
          {/*<div style={{fontSize: '1.1rem', paddingTop: '0.5rem', textAlign: 'left', margin: '0 0.5rem 0 0.5rem'}}>*/}
            {/*<a href={this.props.unit.author.get_absolute_url} target={'_blank'}>*/}
              {/*{this.props.unit.author.display_name}*/}
            {/*</a> ∙ {this.props.unit.count_lessons } lessons ∙ { this.props.unit.number_of_learners } learners*/}
          {/*</div>*/}
          <div style={{fontSize: '1.1rem', color: 'gray', textAlign: 'left', margin: '0 0.5rem 0 0.5rem'}}>
            Created <Moment fromNow>
              {this.props.unit.created_on}
            </Moment> ∙ Last updated <Moment fromNow>
              {this.props.unit.updated_on}
            </Moment>
          </div>
        </div>
      </Col>
    )
  }
}

UnitThumbnailPublic.propTypes = {
  unit: PropTypes.object.isRequired
}
