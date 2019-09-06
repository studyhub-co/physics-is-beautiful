import React from 'react'
import { connect } from 'react-redux'

import { changeAnswerMYSQL } from '../actions'

import { MySQLAnswer } from '../components/mysql_answer'

const mapStateToProps = (state, ownProps) => {
  var ans = state.answers[ownProps.uuid]
  return {
    text: ans.text,
    schema_SQL: ans.schema_SQL,
    query_SQL: ans.query_SQL,
    schema_is_valid: ans.schema_is_valid
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChangeMySQL: (schema_SQL, query_SQL) =>
      dispatch(changeAnswerMYSQL(ownProps.uuid, schema_SQL, query_SQL))
  }
}

export const MySQLAnswerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MySQLAnswer)
