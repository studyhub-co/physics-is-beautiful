import React from 'react'

// import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { Col, Image, Row } from 'react-bootstrap'

import ThumbnailMenu from './thumbnail_menu'
import { DEFAULT_MATHJAX_OPTIONS } from '../label'

export class QuestionThumbnailPublic extends React.Component {
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
              {this.props.question ? <Image fluid src={this.props.question.image} /> : null }
            </div>
          </Col>
          <Col
            sm={10}
            md={10}
          >
            <ThumbnailMenu question={this.props.question} />
            <div style={{fontSize: '2rem'}} onClick={this.onTitleClick}>
              {this.props.question.text}
            </div>
            <div style={{fontSize: '1.5rem', margin: '1rem 0 1rem 0'}} onClick={this.onTitleClick}>
              {this.props.question.lesson.name}
            </div>
            {/*<div style={{fontSize: '1.1rem', paddingTop: '0.5rem', textAlign: 'left', margin: '0 0.5rem 0 0.5rem'}}>*/}
              {/*<a href={this.props.question.author.get_absolute_url} target={'_blank'}>*/}
                {/*{this.props.question.author.display_name}*/}
              {/*</a> ∙ {this.props.question.count_questions } questions ∙ { this.props.question.number_of_learners } learners*/}
            {/*</div>*/}
            <div style={{fontSize: '1.1rem', color: 'gray', textAlign: 'left', margin: '0 0.5rem 0 0'}}>
              Created <Moment fromNow>
                {this.props.question.created_on}
              </Moment> ∙ Last updated <Moment fromNow>
                {this.props.question.updated_on}
              </Moment>
            </div>
          </Col>
        </Row>
      </Col>
    )
  }
}

QuestionThumbnailPublic.propTypes = {
  question: PropTypes.object.isRequired
}
