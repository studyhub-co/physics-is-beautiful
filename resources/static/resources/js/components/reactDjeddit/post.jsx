import React from 'react'

import PropTypes from 'prop-types'

import Moment from 'react-moment'

import { Glyphicon, Grid, Row, Col, FormControl, Checkbox, Form, Button } from 'react-bootstrap'

export class Post extends React.Component {
  render () {
    return (
      <div>
        { this.props.post
          ? <Grid fluid style={{padding: 0}}>
            <Row>
              <Col sm={1} md={1} xs={1} style={{padding: 0, width: 'fit-content'}}>
                <div className={'text-align-center'}>
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
                </div>
              </Col>
              <Col sm={11} md={11}>
                <Row className={'gray-text'}>
                  <Col md={1} sm={2} xs={4}>
                    {this.props.post.created_by
                      ? <a href={this.props.post.created_by.get_absolute_url} target={'_blank'}>
                        {this.props.post.created_by.display_name}
                      </a> : 'Guest'
                    }
                  </Col>
                  <Col md={2} sm={3} xs={3}>
                    <Moment fromNow>{this.props.post.created_on}</Moment>
                  </Col>
                  <Col md={2} sm={3} xs={4}>
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
                <Row>
                  <Col sm={12} md={12}>
                    <span className='pib-link'>Reply</span>
                    &nbsp;
                    <span className='pib-link'>Share</span>
                    {/*<button>Report</button>*/}
                    {/*<button>Save</button>*/}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Grid> : null }
      </div>
    )
  }
}

Post.propTypes = {
  post: PropTypes.object,
  onAction: PropTypes.func
}
