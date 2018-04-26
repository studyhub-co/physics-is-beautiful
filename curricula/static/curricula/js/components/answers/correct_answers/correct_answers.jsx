import React from 'react'
import RMathJax from 'react-mathjax'

export class VectorAnswer extends React.Component {
  render () {

    if (this.props.answer.x == 0 && this.props.answer.y == 0){
      return (<div>Null vector</div>)
    }

    var x, y, xComponent, yComponent = ''
    if (this.props.answer.y) {
      y = <RMathJax.Node inline>{'\\hat{y}'}</RMathJax.Node>
      yComponent = this.props.answer.y
      if (this.props.answer.x && this.props.answer.y > 0) {
        yComponent = '+' + yComponent
      }
    }
    if (this.props.answer.x) {
      xComponent = this.props.answer.x
      x = <RMathJax.Node inline>{'\\hat{x}'}</RMathJax.Node>
    }

    return (
      <div>
        <RMathJax.Context>
          <div>
            <span>{xComponent}</span>
            {x}
            <span>{yComponent}</span>
            {y}
          </div>
        </RMathJax.Context>
      </div>
    )
  }
}

export class TextAnswer extends React.Component {
  render () {
    return <span>{this.props.answer.text}</span>
  }
}

export class MathematicalExpressionAnswer extends React.Component {
  render () {
    return <div><RMathJax.Context><div><RMathJax.Node inline>{this.props.answer.expression}</RMathJax.Node></div></RMathJax.Context></div>
  }
}

export class DefaultAnswer extends React.Component {
  render () {
    if (this.props.answer.content.text) {
      return <span>{ this.props.answer.content.text }</span>
    } else {
      return <span>Highlighted in the green card</span>
    }
  }
}

export class UnitConversion {
  constructor (answer, question) {
    this.answer = answer
    this.question = question
  }
}

export class UnitConversionAnswer extends React.Component {
  render () {
    var component = ''

    var answer = this.props.answer.answer
    var originalQuestion = (''+answer.question_number+'\\ '+answer.question_unit).split('/')

    if (answer.unit_conversion_type === '10' || '30') {
      var qsDenom = ''
      if (typeof originalQuestion[1] !== 'undefined') {
        qsDenom = originalQuestion[1]
      }
      var data = '\\frac{' + originalQuestion[0] + '}{' + qsDenom + '} '
      for (var i = 0; i < answer.conversion_steps.length; i++) {
        if (answer.conversion_steps[i]['numerator'] && answer.conversion_steps[i]['denominator']) {
          data += ' | \\frac{' + answer.conversion_steps[i]['numerator'] + '}{' + answer.conversion_steps[i]['denominator'] + '} '
        }
      }
      data += ' = ' + answer.answer_number+"\\ "+answer.answer_unit;
      component = <RMathJax.Node>{data}</RMathJax.Node>
    }
    if (answer.unit_conversion_type === '20') {
      component = <RMathJax.Node>{answer.answer_number+"\\ "+answer.answer_unit}</RMathJax.Node>
    }

    return (
      <div>
        <RMathJax.Context>
          <div>
            {component}
          </div>
        </RMathJax.Context>
      </div>
    )
  }
}
