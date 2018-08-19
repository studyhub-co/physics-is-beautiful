import React from 'react'
import {DEFAULT_MATHJAX_OPTIONS} from '../constants'
import {Answer} from './answers/correct_answers/correct_answer'
import {CheckContinueButton} from './utils/check_continue_button'

/* global MathJax */

export class Footer extends React.Component {
  componentDidMount () {
    MathJax.Hub.Config(DEFAULT_MATHJAX_OPTIONS)
    MathJax.Hub.Queue(['Typeset', MathJax.Hub])
  }

  componentDidUpdate () {
    MathJax.Hub.Config(DEFAULT_MATHJAX_OPTIONS)
    MathJax.Hub.Queue(['Typeset', MathJax.Hub])
  }

  render () {
    var checkMarks = ''
    var correctMessage = ''
    if (this.props.correct === true) {
      checkMarks = (<span id='correct' className='glyphicon glyphicon-ok-sign pull-right' style={{fontSize: '35px'}} />)
      correctMessage = 'Correct'
    } else if (this.props.correct === false) {
      checkMarks = (<span id='incorrect' className='glyphicon glyphicon-remove-sign pull-right'style={{fontSize: '35px'}} />)
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
      <div id='footer' >
        <div className='row'>
          <div className='col-md-6 text-center' style={{height: (checkMarks ? 'auto' : 0), display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
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
  continueAction: React.PropTypes.func.isRequired,
  checkAction: React.PropTypes.func.isRequired,
  disabledCheck: React.PropTypes.bool
}
