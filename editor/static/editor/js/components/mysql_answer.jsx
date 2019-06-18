import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export class MySQLAnswer extends React.Component {
  constructor (props) {
    super(props)
    // this.changeText = this.changeText.bind(this)
    this.handleClickBuldSchemaSQL = this.handleClickBuldSchemaSQL.bind(this)
    this.changeSchemaSQL = this.changeSchemaSQL.bind(this)
    this.state = {
      schema_SQL: props.schema_SQL,
      query_SQL: props.query_SQL,
      text: props.text,
      schemaIsOk: false
    }
  }

  changeSchemaSQL (event) {
    this.setState({
      schema_SQL: event.target.value
    })
  }

  handleClickBuldSchemaSQL () {
    if (this.state.schema_SQL) {
      this.props.onChangeSchemaSQL(this.state.schema_SQL)
    }

    // if (this.timeout) clearTimeout(this.timeout)
    // this.setState({
    //   text: event.target.value
    // })
    // this.timeout = setTimeout(() => {
    //   this.props.onTextChange(this.state.text)
    // }, 500)
  }

  render () {
    const schemaPlaceHolder = 'Schema Panel\n' +
      'Use this panel to setup your database problem (CREATE TABLE, INSERT, ' +
      'and whatever other statements you need to prepare a representative ' +
      'sample of your real database).'

    const sqlQueryPlaceHolder = 'Query Panel\n' +
      'Use this panel to create SQL query for SELECT from database'

    return (
      <Form.Group>
        <Form.Control
          as='textarea'
          rows='5'
          value={this.state.schema_SQL}
          onChange={this.changeSchemaSQL}
          placeholder={schemaPlaceHolder}
        />
        <br />
        <Button
          variant='primary'
          onClick={this.handleClickBuldSchemaSQL}
        >
          Build Schema
        </Button>
        <br /><br />
        <Form.Control
          disabled={!this.schemaIsOk}
          as='textarea'
          rows='5'
          value={this.state.query_SQL }
          // onChange={this.changeText}
          placeholder={sqlQueryPlaceHolder}
        />
        <br />
        <Button
          disabled={!this.schemaIsOk}
          variant='primary'
          onClick={this.handleClick}
        >
          Generate output & save answer
        </Button>
      </Form.Group>
    )
  }
}
