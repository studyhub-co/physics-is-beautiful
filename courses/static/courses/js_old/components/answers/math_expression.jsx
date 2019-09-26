import React from 'react'
import PropTypes from 'prop-types'
import RMathJax from 'react-mathjax'
// import ReactHover from 'react-hover'
import {DEFAULT_MATHJAX_OPTIONS} from '../../constants'

/* global MathQuill */

export class MathematicalExpressionAnswer extends React.Component {
  constructor () {
    super()
    this.questionId = null
    // this.stoppedProcessing = false
    // this.state = {
    //   processing: false
    // }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.question.uuid !== this.props.question.uuid) {
      // reset answer
      this.reset()
    }
  }

  componentDidMount () {
    this.props.updateAnswer(null)
    var MQ = MathQuill.getInterface(2)
    // this.answer = MQ.MathField($('#math-field-answer')[0], {
    this.answer = MQ.MathField(document.getElementById('math-field-answer'), {
      handlers: {
        edit: (mathField) => {
          // if change by API (not user), then not fire
          if (mathField.data.fromJsCall) { return }
          if (mathField.latex()) {
            this.props.updateAnswer([
              this.props.question.uuid,
              {
                mathematical_expression: {representation: mathField.latex()}
              }
            ])
          } else {
            this.props.updateAnswer(null)
          }
        }
      }
    })
    window.IS_MOBILE_APP ? this.answer.blur() : this.answer.focus()
  }

  insertLatex (val) {
    if (this.props.answer) { return }
    if (val === '⌫') {
      this.answer.keystroke('Backspace')
    } else {
      this.answer.write(val)
    }

    if (!window.IS_MOBILE_APP) {
      this.answer.focus()
    }
  }

  reset () {
    this.answer.data.fromJsCall = true
    this.answer.latex('')
    this.answer.data.fromJsCall = false
    this.props.updateAnswer(null)
    // this.stoppedProcessing = true
  }

  componentDidUpdate () {
    // mathquill focus is lost after render
    if (this.props.answer == null && !window.IS_MOBILE_APP) {
      this.answer.focus()
    } else {
      this.answer.blur()
    }
  }

  render () {
    // var disabled = ''
    // if (this.props.answer) {
    //   disabled = ' disabled'
    // }
    // if (this.state.processing) {
    //   disabled = ' disabled'
    // }

    this.questionId = this.props.question.uuid
    // var x, y
    var hoverStyle = {
      height: '30px',
      overflowY: 'auto',
      outline: '1px solid black',
      width: '60px',
      background: '#ffffff',
      position: 'absolute',
      color: 'black'
    }

    var buttons = []

    var that = this

    if (this.props.vectorComponentButtons) {
      var buttonsLst = ['\\hat{x}', '\\hat{y}', '1', '2', '3', '4', '+', '-']

      if (window.IS_MOBILE_APP) {
        buttonsLst.push('⌫')
      }

      for (var i = 0; i < buttonsLst.length; i++) {
        var button = (
          <a
            className={'btn btn-light btn-lg mathClickEntryButton'}
            style={{minHeight: '40px'}}
            onClick={this.insertLatex.bind(that, buttonsLst[i])}
          >
            {/*<RMathJax.Node inline>{buttonsLst[i]}</RMathJax.Node>*/}
            <RMathJax.Node inline formula={buttonsLst[i]} />
          </a>
        )
        buttons.push(button)
      }
    }

    // if (this.props.xHat) {
    //   x = (
    //     <a
    //       className={'btn btn-primary btn-lg mathClickEntryButton'}
    //       style={{minHeight: '40px'}}
    //       onClick={this.insertXHat.bind(this)}
    //     >
    //       <ReactHover options={{shiftX: 200, shiftY: 200}}>
    //         <ReactHover.Trigger>
    //           <RMathJax.Node inline>{'\\hat{x}'}</RMathJax.Node>
    //         </ReactHover.Trigger>
    //         <ReactHover.Hover>
    //           <span style={hoverStyle}>\hat x</span>
    //         </ReactHover.Hover>
    //       </ReactHover>
    //     </a>
    //   )
    // }
    // if (this.props.yHat) {
    //   y = (
    //     <a
    //       className={'btn btn-primary btn-lg mathClickEntryButton'}
    //       style={{minHeight: '40px'}}
    //       onClick={this.insertYHat.bind(this)}
    //     >
    //       <ReactHover options={{shiftX: 200, shiftY: 200}}>
    //         <ReactHover.Trigger>
    //           <RMathJax.Node inline>{'\\hat{y}'}</RMathJax.Node>
    //         </ReactHover.Trigger>
    //         <ReactHover.Hover>
    //           <span style={hoverStyle}>\hat y</span>
    //         </ReactHover.Hover>
    //       </ReactHover>
    //     </a>
    //   )
    // }
    var disabled = 'auto'
    if (this.props.answer) {
      disabled = 'none'
    }
    var mathFieldStyle = {
      width: 200,
      fontSize: 30,
      pointerEvents: disabled
    }

    return (
      <div className='bounding-box'>
        <p style={{marginBottom: 5}}><span id='math-field-answer' style={mathFieldStyle} /></p>
        <RMathJax.Provider {...DEFAULT_MATHJAX_OPTIONS}>
          <div style={{marginBottom: 10}}>
            {buttons.map(function (button, index) {
              return <span key={index}>{ button }</span>
            })}
          </div>
        </RMathJax.Provider>
        {/*<RMathJax.Provider {...DEFAULT_MATHJAX_OPTIONS}>*/}
          {/*<div style={{marginBottom: 10}}>*/}
            {/*{buttons.map(function (button, index) {*/}
              {/*return <span key={index}>{ button }</span>*/}
            {/*})}*/}
            {/*/!* {x}{y} *!/*/}
          {/*</div>*/}
        {/*</RMathJax.Provider>*/}
        <p>{ this.props.question.is_correct }</p>
      </div>
    )
  }
}
MathematicalExpressionAnswer.propTypes = {
  updateAnswer: PropTypes.func.isRequired
}
