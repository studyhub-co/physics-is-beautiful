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
    // this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.question.uuid !== this.props.question.uuid) {
      // reset answer
      this.reset()
    }
  }

  reset () {
    this.setState({text: null})
  }

  render () {
    const sqlQueryPlaceHolder = 'Query Panel\n' +
      'Use this panel to create SQL query for SELECT from database'

    // console.log(this.props);
    
    return (
      <div className='bounding-box'>
        <Form.Group>
          <AceEditor
            placeholder={sqlQueryPlaceHolder}
            onChange={this.changeQuerySQL}
            value={this.props.query_SQL}
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
              <h3>Expected output</h3>
              <pre>{this.props.text}</pre>
            </div>
            : null

          }
        </Form.Group>
      </div>
    )
  }
}
