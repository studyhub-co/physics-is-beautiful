import React from 'react'
import PropTypes from 'prop-types'

import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

import {DEFAULT_MATHJAX_OPTIONS} from '../constants'
import {Answer} from './answers/correct_answers/correct_answer'
import {CheckContinueButton} from './utils/check_continue_button'

// import { relative } from 'path'

/* global MathJax */

export class Footer extends React.Component {
  componentDidMount () {
    // GLOBAL ( not react MathJax)
    MathJax.Hub.Config(DEFAULT_MATHJAX_OPTIONS)
    MathJax.Hub.Queue(['Typeset', MathJax.Hub])

    let problemSheet = document.querySelectorAll('.problem-sheet')[0]
    problemSheet.style.marginBottom = document.getElementById('footer').clientHeight + 'px'
  }

  componentDidUpdate () {
    MathJax.Hub.Config(DEFAULT_MATHJAX_OPTIONS)
    MathJax.Hub.Queue(['Typeset', MathJax.Hub])

    // let problemSheet = document.querySelectorAll('.problem-sheet')[0]
    // problemSheet.style.marginBottom = document.getElementById('footer').clientHeight + 'px'
  }

  render () {
    var checkMarks = ''
    var correctMessage = ''
    var backgroundColor = '#dbdbdb'
    if (this.props.correct === true) {
      // checkMarks = (<span id='correct' className='glyphicon glyphicon-ok-sign pull-right' style={{fontSize: '35px'}} />)
      checkMarks = (<FaCheckCircle id='correct' className='pull-right' style={{fontSize: '35px'}} />)
      correctMessage = 'Correct'
      backgroundColor = '#bff199'
    } else if (this.props.correct === false) {
      // checkMarks = (<span id='incorrect' className='glyphicon glyphicon-remove-sign pull-right'style={{fontSize: '35px'}} />)
      checkMarks = (<FaTimesCircle id='incorrect' className='pull-right' style={{fontSize: '35px'}} />)
      backgroundColor = '#ffd3d1'

      if (Array.isArray(this.props.correct_answer)) {
        var message = 'Incorrect, the correct answers are:'
        if (this.props.correct_answer.length == 1) {
          message = 'Incorrect, the correct answer is:'
        }
        correctMessage = <div>
          <span>{message}<br /></span>
          {this.props.correct_answer.map((answer, i) => <span key={i}>
            {!!i && ', '}
            <Answer key={i} answer={answer} />
          </span>)}
        </div>
      } else {
        correctMessage = <div>
          <span>Incorrect, the correct answer is: <br /></span>
          <Answer ckey={1} answer={this.props.correct_answer} />
        </div>
      }
      // continueButton = (
      //   <button id='checkButton' type='button' onClick={this.props.continueAction}>
      //       Continue
      //   </button>
      // )
    }

    return (
      <div id='footer' style={{backgroundColor: backgroundColor,
        position: (navigator.platform.match(/iPhone|iPod|iPad/) && window.IS_MOBILE_APP) ? 'relative' : 'fixed'}}>
        <div className='row'>
          <div className='col-md-6 text-center' style={{
            minHeight: (checkMarks ? '50px' : '1px'),
            height: (checkMarks ? 'none' : 0),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'}}>

            <div id='checkMarks'>{checkMarks}</div>
            <div id='correctMessage'>{correctMessage}</div>
          </div>
          <div className='col-md-6 text-center'>
            <div id='checkContainer'>
              <CheckContinueButton
                checkAction={this.props.checkAction}
                continueAction={this.props.continueAction}
                isCheck={typeof this.props.correct === 'undefined'}
                disabledCheck={this.props.disabledCheck} />
            </div>
          </div>
        </div>
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
  disabledCheck: PropTypes.bool
}
