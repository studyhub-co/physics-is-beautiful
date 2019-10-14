import React from 'react'

import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { Col, Image, Row } from 'react-bootstrap'

import ThumbnailMenu from './thumbnail_menu'
import { DEFAULT_MATHJAX_OPTIONS } from '../../../components/label'

export class MaterialThumbnailPublic extends React.Component {
  // constructor (props, context) {
  //   super(props, context)
  // }

  componentDidMount () {
    MathJax.Hub.Config(DEFAULT_MATHJAX_OPTIONS)
    MathJax.Hub.Queue(['Typeset', MathJax.Hub])
  }

  render () {
    return (
      <Col
        sm={12}
        md={12}
        className={'staff-user-row'}>
        <Row>
          <Col
            sm={2}
            md={2}
          >
            <div style={{padding: '1rem', overflow: 'hidden', borderRadius: '15px'}}>
              {this.props.material ? <Image fluid src={this.props.material.image} /> : null }
            </div>
          </Col>
          <Col
            sm={10}
            md={10}
          >
            <ThumbnailMenu material={this.props.material} />
            <div style={{fontSize: '2rem'}} onClick={this.onTitleClick}>
              {this.props.material.name}
            </div>
            <div style={{fontSize: '1.5rem', margin: '1rem 0 1rem 0'}} onClick={this.onTitleClick}>
              {this.props.material.lesson.name}
            </div>
            <div style={{fontSize: '1rem', color: 'gray', textAlign: 'left', margin: '0 0.5rem 0 0'}}>
              Created <Moment fromNow>
                {this.props.material.created_on}
              </Moment> ∙ Last updated <Moment fromNow>
                {this.props.material.updated_on}
              </Moment>
            </div>
          </Col>
        </Row>
      </Col>
    )
  }
}

MaterialThumbnailPublic.propTypes = {
  material: PropTypes.object.isRequired
}
