import React from 'react'
import RMathJax from 'react-mathjax'

import Modal from 'react-bootstrap/Modal'

export class VectorAnswer extends React.Component {
  render () {
    if (this.props.answer.x === 0 && this.props.answer.y === 0) {
      return (<div>Null vector</div>)
    }

    var x, y, xComponent, yComponent = ''
    if (this.props.answer.y) {
      y = <RMathJax.Node inline formula={'\\hat{y}'} />
      yComponent = this.props.answer.y
      if (this.props.answer.x && this.props.answer.y > 0) {
        yComponent = '+' + yComponent
      }
    }
    if (this.props.answer.x) {
      xComponent = this.props.answer.x
      x = <RMathJax.Node inline formula={'\\hat{x}'} />
    }

    return (
      <div>
        <RMathJax.Provider>
          <div>
            <span>{xComponent}</span>
            {x}
            <span>{yComponent}</span>
            {y}
          </div>
        </RMathJax.Provider>
      </div>
    )
  }
}

export class TextAnswer extends React.Component {
  render () {
    return <span>{this.props.answer.text}</span>
  }
}

export class MySQL {
  constructor (answer) {
    // this.query_SQL = answer.query_SQL
    this.text = answer.text
  }
}

export class MySQLAnswer extends React.Component {
  constructor (answer) {
    super()
    this.handleShow = this.handleShow.bind(this)

    this.state = {
      show: false
    }
  }

  handleShow () {
    this.setState({ show: !this.state.show })
  }

  render () {
    return <span>
      <span
        className={'pib-link'}
        onClick={this.handleShow}
      >Click to view</span>
      <Modal show={this.state.show} onHide={this.handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Correct output</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre>{this.props.answer.text}</pre>
        </Modal.Body>
      </Modal>
    </span>
  }
}

export class MathematicalExpressionAnswer extends React.Component {
  render () {
    return <div><RMathJax.Provider><div><RMathJax.Node formula={this.props.answer.expression} /></div></RMathJax.Provider></div>
  }
}

export class DefaultAnswer extends React.Component {
  render () {
    if (this.props.answer.content.text) {
      return <span>{ this.props.answer.content.text }</span>
    } else {
      return <span>the highlighted green card</span>
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
    var originalQuestion = ('' + answer.question_number + '\\ ' + answer.question_unit).split('/')

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
      data += ' = ' + answer.answer_number + '\\ ' + answer.answer_unit
      component = <RMathJax.Node formula={data} />
    }
    if (answer.unit_conversion_type === '20') {
      component = <RMathJax.Node formula={answer.answer_number + '\\ ' + answer.answer_unit} />
    }

    return (
      <div>
        <RMathJax.Provider>
          <div>
            {component}
          </div>
        </RMathJax.Provider>
      </div>
    )
  }
}
