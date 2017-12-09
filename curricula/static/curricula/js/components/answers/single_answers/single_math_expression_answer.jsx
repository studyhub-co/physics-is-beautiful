import React from 'react'
import RMathJax from 'react-mathjax'
import ReactHover from 'react-hover'
import {DEFAULT_MATHJAX_OPTIONS} from '../../../constants'

/* global MathQuill */

export class SingleMathematicalExpressionAnswer extends React.Component {
  constructor () {
    super()
    this.questionId = null
    // this.stoppedProcessing = false
    // this.state = {
    //   processing: false
    // }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.uuid !== this.props.uuid) {
      // reset answer
      this.answer.latex('')
      this.props.updateAnswer(null)
    }
  }

  componentDidMount () {
    var MQ = MathQuill.getInterface(2)
    // this.answer = MQ.MathField($('#math-field-answer')[0], {
    this.answer = MQ.MathField(document.getElementById('math-field-answer'), {
      handlers: {
        // spaceBehavesLikeTab: true, // FIXME it is does not work, must not place in handlers, if it really need
        edit: () => {
          // this.data = this.answer.latex()
          this.props.updateAnswer([
            this.props.question.uuid,
            {
              mathematical_expression: {representation: this.answer.latex()}
            }
          ])
        }
      }
    })
  }

  // componentDidUpdate () {
  //   if (this.stoppedProcessing) {
  //     this.stoppedProcessing = false
  //     this.setState({processing: false})
  //   }
  // }

  // checkAnswer () {
  //   if (this.data) {
  //     this.setState({processing: true})
  //     this.props.question.submitAnswer(
  //       this.props.question.uuid,
  //       {
  //         mathematical_expression: {representation: this.data}
  //       }
  //     )
  //   }
  // }

  insertXHat () {
    this.answer.focus()
    this.answer.write('\\hat{x}')
  }

  insertYHat () {
    this.answer.focus()
    this.answer.write('\\hat{y}')
  }

  reset () {
    this.answer.latex('')
    // this.stoppedProcessing = true
  }

  render () {
    // var disabled = ''
    // if (this.props.answer) {
    //   disabled = ' disabled'
    // }
    // if (this.state.processing) {
    //   disabled = ' disabled'
    // }
    if (this.questionId && this.props.question.uuid && this.props.question.uuid != this.questionId) {
      this.reset()
    }
    this.questionId = this.props.question.uuid
    var x, y
    var hoverStyle = {
      height: '30px',
      overflowY: 'auto',
      outline: '1px solid black',
      width: '60px',
      background: '#ffffff',
      position: 'absolute',
      color: 'black'
    }
    if (this.props.xHat) {
      x = (
        <a
          className={'btn btn-primary btn-lg mathClickEntryButton'}
          style={{minHeight: '40px'}}
          onClick={this.insertXHat.bind(this)}
        >
          <ReactHover options={{shiftX: 200, shiftY: 200}}>
            <ReactHover.Trigger>
              <RMathJax.Node inline>{'\\hat{x}'}</RMathJax.Node>
            </ReactHover.Trigger>
            <ReactHover.Hover>
              <span style={hoverStyle}>\hat x</span>
            </ReactHover.Hover>
          </ReactHover>
        </a>
      )
    }
    if (this.props.yHat) {
      y = (
        <a
          className={'btn btn-primary btn-lg mathClickEntryButton'}
          style={{minHeight: '40px'}}
          onClick={this.insertYHat.bind(this)}
        >
          <ReactHover options={{shiftX: 200, shiftY: 200}}>
            <ReactHover.Trigger>
              <RMathJax.Node inline>{'\\hat{y}'}</RMathJax.Node>
            </ReactHover.Trigger>
            <ReactHover.Hover>
              <span style={hoverStyle}>\hat y</span>
            </ReactHover.Hover>
          </ReactHover>
        </a>
      )
    }
    var mathFieldStyle = {
      width: 200,
      fontSize: 30
    }
    return (
      <div className='bounding-box'>
        <p style={{marginBottom: 5}}><span id='math-field-answer' style={mathFieldStyle}></span></p>
        <RMathJax.Context {...DEFAULT_MATHJAX_OPTIONS}>
          <div style={{marginBottom: 10}}>
            {x}{y}
          </div>
        </RMathJax.Context>
        {/*<div className={'button-group' + (this.props.answer === null ? '' : ' hidden')} id='vectorButton' >*/}
          {/*<a className={'btn btn-primary' + disabled} id='checkAnswer' onClick={this.checkAnswer.bind(this)}>Check</a>*/}
        {/*</div>*/}
        <p>{ this.props.question.is_correct }</p>
        {/*<ContinueButton continueClick={this.props.continueAction} hidden={this.props.answer === null} />*/}
      </div>
    )
  }
}
SingleMathematicalExpressionAnswer.propTypes = {
  updateAnswer: React.PropTypes.func.isRequired
}
