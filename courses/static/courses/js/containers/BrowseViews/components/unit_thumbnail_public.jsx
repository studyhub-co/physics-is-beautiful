import React from 'react'

import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { Col } from 'react-bootstrap'

import history from '../../../history'
import { Thumbnail } from '../../../components/thumbnail'
import ThumbnailMenu from './thumbnail_menu'

export class UnitThumbnailPublic extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.onTitleClick = this.onTitleClick.bind(this)
  }

  onTitleClick() {
    // history.push('/courses/units/' + this.props.unit.uuid + '/', '_self')
    // we have no units url now
    history.push(`/courses/${this.props.unit.course}/#${this.props.unit.uuid}`)
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
          <Thumbnail image={this.props.unit.image} />
        </div>
        <div>
          <ThumbnailMenu unit={this.props.unit} />
          <div
            onClick={this.onTitleClick}
            className={'blue-text'}
            style={{
              fontSize: '1.7rem',
              textAlign: 'justify',
              padding: '0 0.5rem',
            }}
          >
            {this.props.unit.name}
          </div>
          <div
            style={{
              fontSize: '1rem',
              color: 'gray',
              textAlign: 'left',
              margin: '0 0.5rem 0 0.5rem',
            }}
          >
            Created <Moment fromNow>{this.props.unit.created_on}</Moment> ∙ Last
            updated <Moment fromNow>{this.props.unit.updated_on}</Moment>
          </div>
        </div>
      </Col>
    )
    // we can try to use cards in the future
    // render () {
    //   return (
    //     <Card
    //       // className={'curriculum-card'}
    //       style={{'cursor': 'pointer', maxWidth: '25rem'}}
    //     >
    //       {/*<div onClick={this.onTitleClick} style={{paddingBottom: '1rem', overflow: 'hidden', borderRadius: '15px'}}>*/}
    //         {/*<Thumbnail image={this.props.unit.image} />*/}
    //       {/*</div>*/}
    //       <Card.Img variant='top' src={this.props.unit.image} />
    //       <Card.Body>
    //         <ThumbnailMenu unit={this.props.unit} />
    //         <div onClick={this.onTitleClick} className={'blue-text'} style={{fontSize: '1.75rem'}}>
    //           {this.props.unit.name}
    //         </div>
    //         <div style={{fontSize: '0.9rem', color: 'gray', textAlign: 'left', margin: '0 0.5rem 0 0.5rem'}}>
    //           Created <Moment fromNow>
    //             {this.props.unit.created_on}
    //           </Moment> ∙ Last updated <Moment fromNow>
    //             {this.props.unit.updated_on}
    //           </Moment>
    //         </div>
    //       </Card.Body>
    //     </Card>
    //   )
  }
}

UnitThumbnailPublic.propTypes = {
  unit: PropTypes.object.isRequired,
}
