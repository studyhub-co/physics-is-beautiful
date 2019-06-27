import React from 'react'
import PropTypes from 'prop-types'

import Form from 'react-bootstrap/Form'

import AceEditor from 'react-ace'
import brace from 'brace'

import 'brace/mode/mysql'
import 'brace/theme/textmate'

export class MYSQLAnswer extends React.Component {
  constructor (props) {
    super(props)
    this.changeQuerySQL = this.changeQuerySQL.bind(this)
    this.state = {
      query_SQL: ''
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.question.uuid !== this.props.question.uuid) {
      // reset answer
      this.reset()
    }
  }

  reset () {
    this.setState({QuerySQL: ''})
  }

  changeQuerySQL (value) {
    this.props.updateAnswer([this.props.question.uuid, {
      my_sql: {
        query_SQL: value
      }}])
    this.setState({QuerySQL: value})
  }

  render () {
    var hasAnswer = false // user gave answer
    if (this.props.answer || this.props.question.is_correct) {
      hasAnswer = true
    }

    const sqlQueryPlaceHolder = 'Query Panel\n' +
      'Use this panel to create SQL query for SELECT from database'

    return (
      <div className='bounding-box'>
        <Form.Group>
          <AceEditor
            placeholder={sqlQueryPlaceHolder}
            onChange={this.changeQuerySQL}
            value={this.state.QuerySQL}
            readOnly={hasAnswer}
            showPrintMargin
            showGutter
            mode='mysql'
            theme='textmate'
            height={'15rem'}
            width={'100%'}
            setOptions={{
              enableBasicAutocompletion: false,
              enableLiveAutocompletion: false,
              enableSnippets: false,
              showLineNumbers: true,
              tabSize: 2
            }}
          />
          <br />
          {this.props && this.props.text
            ? <div>
              <br />
              <h3>You output</h3>
              <pre>{this.props.text}</pre>
            </div>
            : null
          }
        </Form.Group>
      </div>
    )
  }
}
