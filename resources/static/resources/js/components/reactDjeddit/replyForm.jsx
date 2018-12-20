import React from 'react'

import PropTypes from 'prop-types'

import { Grid, Row, Col, FormControl, Checkbox, Form, Button } from 'react-bootstrap'

export class ReplyForm extends React.Component {
  render () {
    return (
      <div>
       reply form
      </div>
    )
  }
}

ReplyForm.propTypes = {
  parentComment: PropTypes.object,
  onAction: PropTypes.func
}
