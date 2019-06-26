import React from 'react'
import PropTypes from 'prop-types'

import AceEditor from 'react-ace'
import brace from 'brace'

import 'brace/mode/mysql'
import 'brace/theme/textmate'

export class QuestionMysql extends React.Component {
  constructor () {
    super()
    this.state = {
      collapsed: true
    }
  }

  onChange (event) {
    this.setState({collapsed: !this.state.collapsed})
  }

  render () {
    return (
      <div>
        <h3>SQL Schema</h3>
        <AceEditor
          value={this.props.question.my_sql.schema_SQL}
          showPrintMargin
          showGutter
          readOnly={Boolean(true)}
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
      </div>
    )
  }
}

QuestionMysql.propspropTypes = {
  question: PropTypes.object.isRequired
}
