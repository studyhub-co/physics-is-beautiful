import React from 'react'
import PropTypes from 'prop-types'

import DataTable from 'react-data-table-component'

// import AceEditor from 'react-ace'
// import brace from 'brace'

// import 'brace/mode/mysql'
// import 'brace/theme/textmate'

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
    let reactDataTables = []

    if (this.props.question.my_sql) {
      JSON.parse(this.props.question.my_sql.schema_SQL_json).map((table) => {
        const tableName = Object.keys(table)[0]
        const dataList = table[tableName]['data']
        const columnList = table[tableName]['columns']
        let reactDataData = []
        let reactDataColumns = []

        // populate columns
        columnList.map((column, index) => {
          reactDataColumns.push({
            name: column,
            selector: '' + index,
            sortable: true
          })
        })

        // populate data
        dataList.map((row, index) => {
          let reactDataRow = {}
          for (let i = 0; i < row.length; i++) {
            reactDataRow[i] = row[i]
          }
          reactDataData.push(reactDataRow)
        })

        let reactTable = {}
        reactTable[tableName] = {columns: reactDataColumns, data: reactDataData}

        reactDataTables.push(reactTable)
      })
    }

    return (
      <div>
        {reactDataTables.map(
          (table, i) => {
            const tableName = Object.keys(table)[0]
            return (
              <div key={i} style={{textAlign: 'left'}}>
                <DataTable
                  title={tableName}
                  columns={table[tableName].columns}
                  data={table[tableName].data}
                />
              </div>
            )
          })}
        {/* <h3>SQL Schema</h3> */}
        {/* <AceEditor */}
        {/* value={this.props.question.my_sql.schema_SQL} */}
        {/* showPrintMargin */}
        {/* showGutter */}
        {/* readOnly={Boolean(true)} */}
        {/* mode='mysql' */}
        {/* theme='textmate' */}
        {/* height={'15rem'} */}
        {/* width={'100%'} */}
        {/* setOptions={{ */}
        {/* enableBasicAutocompletion: false, */}
        {/* enableLiveAutocompletion: false, */}
        {/* enableSnippets: false, */}
        {/* showLineNumbers: true, */}
        {/* tabSize: 2 */}
        {/* }} */}
        {/* /> */}
      </div>
    )
  }
}

QuestionMysql.propspropTypes = {
  question: PropTypes.object.isRequired
}
