import React from 'react'
import RMathJax from 'react-mathjax'

import AceEditor from 'react-ace'
import DataTable from 'react-data-table-component'

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
    this.query_SQL = answer.query_SQL
    this.expected_output_json = answer.expected_output_json
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
    const reactDataData = []
    const reactDataColumns = []

    if (this.props.answer.expected_output_json) {
      const dataDict = JSON.parse(this.props.answer.expected_output_json)

      // populate columns
      dataDict.columns.map((column, index) => {
        reactDataColumns.push({
          name: column,
          selector: '' + index,
          sortable: true
        })
      })

      // populate data
      dataDict.data.map((row, index) => {
        let reactDataRow = {}
        for (let i = 0; i < row.length; i++) {
          reactDataRow[i] = row[i]
        }
        reactDataData.push(reactDataRow)
      })
    }

    return <div>
      <AceEditor
        value={this.props.answer.query_SQL}
        readOnly={Boolean(true)}
        showPrintMargin
        showGutter
        mode='mysql'
        theme='textmate'
        height={'5rem'}
        width={'100%'}
        setOptions={{
          enableBasicAutocompletion: false,
          enableLiveAutocompletion: false,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2
        }}
      />
      {reactDataColumns.length > 0
        ? <div>
          {reactDataColumns.length > 0 &&
            <DataTable
              noHeader
              pagination={Boolean(true)}
              paginationPerPage={3}
              columns={reactDataColumns}
              data={reactDataData}
            />
          }
        </div> : null }
    </div>
  }
}

export class MathematicalExpressionAnswer extends React.Component {
  render () {
    return <div><RMathJax.Provider>
      <div>
        <RMathJax.Node formula={this.props.answer.expression} />
      </div>
    </RMathJax.Provider></div>
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
