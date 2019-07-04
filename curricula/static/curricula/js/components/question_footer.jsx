import React from 'react'
import PropTypes from 'prop-types'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

import { ThreadComponent } from '@vermus/django-react-djeddit-client/'

import {DEFAULT_MATHJAX_OPTIONS} from '../constants'
import {Answer} from './answers/correct_answers/correct_answer'
import {CheckContinueButton} from './utils/check_continue_button'

import { MarkdownMathRender } from './utils/render'

/* global MathJax */

export class Footer extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      showCommentsModal: false
    }

    this.handleShowComments = this.handleShowComments.bind(this)
  }

  handleShowComments () {
    this.setState({ showCommentsModal: !this.state.showCommentsModal })
  }

  componentDidMount () {
    // GLOBAL ( not react MathJax)
    MathJax.Hub.Config(DEFAULT_MATHJAX_OPTIONS)
    MathJax.Hub.Queue(['Typeset', MathJax.Hub])

    let problemSheet = document.querySelectorAll('.problem-sheet')[0]

    if (window.IS_IOS) {
      problemSheet.style.marginBottom = '20px'
    } else {
      problemSheet.style.marginBottom = document.getElementById('footer').clientHeight + 'px'
    }
  }

  componentDidUpdate () {
    MathJax.Hub.Config(DEFAULT_MATHJAX_OPTIONS)
    MathJax.Hub.Queue(['Typeset', MathJax.Hub])
  }

  render () {
    var checkMarks = ''
    var correctMessage = ''
    var backgroundColor = '#dbdbdb'
    var commentsButtonCol = null

    if (typeof this.props.correct !== 'undefined') {
      commentsButtonCol =
        <Col xs={5} md={6} style={{
          alignItems: 'center', justifyContent: 'center', display: 'flex'
        }}>
          <Button
            onClick={this.handleShowComments}
            style={{
              backgroundColor: '#8d33d9',
              borderColor: '#8d33d9',
              borderBottomColor: '#8d33d9',
              padding: '0.5rem 2rem',
              borderRadius: '12rem'}}
          >Comments</Button>
        </Col>
    }

    let correctAnswer = null

    if (this.props.correct === true) {
      checkMarks = (<FaCheckCircle id='correct' className='pull-right' style={{fontSize: '35px'}} />)
      correctMessage = 'Correct'
      backgroundColor = '#bff199'
    } else if (this.props.correct === false) {
      checkMarks = (<FaTimesCircle id='incorrect' className='pull-right' style={{fontSize: '35px'}} />)
      backgroundColor = '#ffd3d1'
      correctMessage = <div>Incorrect</div>
      // if (Array.isArray(this.props.correct_answer)) {
      //   var message = 'Incorrect, the correct answers are:'
      //   if (this.props.correct_answer.length == 1) {
      //     message = 'Incorrect, the correct answer is:'
      //   }
      //   correctMessage = <div>
      //     <span>{message}<br /></span>
      //     {this.props.correct_answer.map((answer, i) => <span key={i}>
      //       {!!i && ', '}
      //       <Answer key={i} answer={answer} />
      //     </span>)}
      //   </div>
      // } else {
      //   correctMessage = <div>
      //     <span>Incorrect, the correct answer is: <br /></span>
      //     <Answer ckey={1} answer={this.props.correct_answer} />
      //   </div>
      // }
      if (Array.isArray(this.props.correct_answer)) {
        correctAnswer = this.props.correct_answer.map((answer, i) => <span key={i}>
          {!!i && ', '}
          <Answer key={i} answer={answer} />
        </span>)
      } else {
        correctAnswer = <Answer ckey={1} answer={this.props.correct_answer} />
      }
    }

    var commentsModal =
      <Modal
        show={this.state.showCommentsModal}
        onHide={this.handleShowComments}
        dialogClassName='modal-90w'
        aria-labelledby='example-custom-modal-styling-title'
      >
        <Modal.Header closeButton>
          <Modal.Title id='example-custom-modal-styling-title'>
            Discussion
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.solutionText &&
              <MarkdownMathRender source={this.props.solutionText} />
          }
          {correctAnswer}
          <ThreadComponent
            threadId={this.props.thread}
          />
        </Modal.Body>
      </Modal>

    return (
      <div id='footer' style={{backgroundColor: backgroundColor,
        position: (window.IS_IOS && window.IS_MOBILE_APP) ? 'relative' : 'fixed'}}>
        <Container fluid>
          <div className='row'>
            <div className='col-5 col-md-6 text-center' style={{
              minHeight: (checkMarks ? '50px' : '1px'),
              height: (checkMarks ? 'none' : 0),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'}}>
              <div id='checkMarks'>{checkMarks}</div>
              <div id='correctMessage'>{correctMessage}</div>
            </div>
            {commentsButtonCol}
          </div>
          {commentsModal}
          <Row>
            <div className='offset-md-3 col-md-6 text-center continue-container'>
              <div id='checkContainer'>
                <CheckContinueButton
                  checkAction={this.props.checkAction}
                  continueAction={this.props.continueAction}
                  isCheck={typeof this.props.correct === 'undefined'}
                  disabledCheck={this.props.disabledCheck} />
              </div>
            </div>
          </Row>
        </Container>
        <div className='progress-bottom-container'>
          <div className='progress'>
            <div
              className='progress-bar progress-bar-info progress-bar-striped'
              id='progressbar'
              role='progressbar'
              aria-valuenow='0'
              aria-valuemin='0'
              aria-valuemax='100'
              style={{width: this.props.progress + '%'}}>
              <span className='sr-only' />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
Footer.propTypes = {
  continueAction: PropTypes.func.isRequired,
  checkAction: PropTypes.func.isRequired,
  disabledCheck: PropTypes.bool,
  solutionText: PropTypes.string,
  thread: PropTypes.number
}
