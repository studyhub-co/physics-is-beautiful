import React from 'react'
import RMathJax from 'react-mathjax'

export class VectorAnswer extends React.Component {
  render () {
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
    return <span>{this.props.answer.expression}</span>
  }
}

export class DefaultAnswer extends React.Component {
  render () {
    return <div>{this.props.answer.text}</div>
  }
}

export class UnitConversion {
  constructor (answer) {
    this.answer = answer
  }
}

export class UnitConversionAnswer extends React.Component {
  render () {
    var component = ''

    var answer = this.props.answer.answer

    if (answer.show_answer) {
      var data = '\\frac{' + answer.numerator + '}{' + answer.denominator + '} = ' + answer.answer
      component = <RMathJax.Node>{data}</RMathJax.Node>
    } else {
      component = <RMathJax.Node>{answer.answer}</RMathJax.Node>
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
