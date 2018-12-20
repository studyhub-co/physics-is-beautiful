import React from 'react'

import PropTypes from 'prop-types'

import Moment from 'react-moment'

import { Glyphicon, Grid, Row, Col, FormControl, Checkbox, Form, Button } from 'react-bootstrap'

export class Post extends React.Component {
  render () {
    return (
      <Grid fluid>
        <Row>
          <Col sm={1} md={1} xs={1} className={'text-align-center'}>
            <div>
              <Glyphicon
                glyph='arrow-up'
                style={{cursor: 'pointer'}}
                onClick={() => this.upDownClick(this.props.post.uid, 1)} />
            </div>
            <div>
              {this.props.post.score}
            </div>
            <div>
              <Glyphicon
                glyph='arrow-down'
                style={{cursor: 'pointer'}}
                onClick={() => this.upDownSolutionClick(this.props.post.uid, -1)} />
            </div>
          </Col>
          <Col sm={11} md={11}>
            <Row className={'gray-text'}>
              <Col sm={1} md={1} xs={1}>
                user_name
              </Col>
              <Col sm={2} md={2} xs={2}>
                <Moment fromNow>{this.props.post.created_on}</Moment>
              </Col>
              <Col sm={2} md={2} xs={2}>
                {this.props.post.modified_on !== this.props.post.created_on
                  ? <span>edited <Moment fromNow>{this.props.post.modified_on}</Moment></span>
                  : null
                }
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={12}>
                { this.props.post.content }
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    )
  }
}

Post.propTypes = {
  post: PropTypes.object,
  onAction: PropTypes.func
}
