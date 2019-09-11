import React from 'react'
import PropTypes from 'prop-types'

// import { Row, Col, Form } from 'react-bootstrap'
import { Form } from 'react-bootstrap'

export class GoogleClassroomRow extends React.Component {
  handleChange (classroom) {
    this.props.onGoogleClassroomClick(this.props.classroom)
  }

  render () {
    var disabled = false
    for (var x = 0; x < this.props.existingClassroomsList.length; x++) {
      if (this.props.existingClassroomsList[x].external_classroom &&
       this.props.existingClassroomsList[x].external_classroom.external_id === this.props.classroom.id) {
        disabled = true
      }
    }

    var className = 'google-classroom-row blue-title'
    var opts = {}
    if (disabled) {
      opts['checked'] = 'checked'
    }

    return (
      <div className={className}>
        <Form>
          <Form.Group controlId={`googleCRCheckbox-${this.props.classroom.id}`}>
            <Form.Check
            >
              <Form.Check.Input
                disabled={disabled}
                onChange={() => this.handleChange(this.props.classroom)}
                {...opts}
                style={{position: 'relative', verticalAlign: 'middle'}}
              />
              <Form.Check.Label
                style={{position: 'relative', verticalAlign: 'middle'}}
              >
                &nbsp;{this.props.classroom.name}&nbsp;{this.props.classroom.section}
              </Form.Check.Label>
            </Form.Check>
          </Form.Group>
        </Form>
        {/* <Col sm={1} md={1}> */}
        {/* <InputGroup.Checkbox */}
        {/* disabled={disabled} */}
        {/* onChange={() => this.handleChange(this.props.classroom)} */}
        {/* {...opts} */}
        {/* /> */}
        {/* </Col> */}
        {/* <Col sm={11} md={11}> */}
        {/* <span */}
        {/* className={'blue-title'}>{this.props.classroom.name} {this.props.classroom.section} */}
        {/* </span> */}
        {/* </Col> */}
        {/* </Row> */}
      </div>
    )
  }
}

GoogleClassroomRow.propTypes = {
  onGoogleClassroomClick: PropTypes.func.isRequired,
  existingClassroomsList: PropTypes.array.isRequired,
  classroom: PropTypes.object.isRequired // google classrooom
}
