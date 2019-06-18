import React from 'react'
import { connect } from 'react-redux'

import { changeAnswerSchemaSQL } from '../actions'

import { MySQLAnswer } from '../components/mysql_answer'

const mapStateToProps = (state, ownProps) => {
  var ans = state.answers[ownProps.uuid]
  return {
    text: ans.text,
    schema_SQL: ans.schema_SQL,
    query_SQL: ans.query_SQL
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // onTextChange: newText => dispatch(changeAnswerText(ownProps.uuid, newText)),
    onChangeSchemaSQL: schemaSQL => dispatch(changeAnswerSchemaSQL(ownProps.uuid, schemaSQL))
  }
}

export const MySQLAnswerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MySQLAnswer)
