import React from 'react'
import PropTypes from 'prop-types'

import { Row, Col, Image, Dropdown, Glyphicon, MenuItem} from 'react-bootstrap'

export class AssignmentTeacherRow extends React.Component {
  handleSettingsClick (e) {
    this.props.onSettingsMenuClick(e)
  }

  constructor (props) {
    super(props)
    this.handleSettingsClick = this.handleSettingsClick.bind(this)
  }

  render () {
    var className = 'student-classroom-row'

    return (
      <Row className={className}>
        <Col sm={1} md={1}>
          <div className={'gray-text small-text'}>
            {this.props.assignment && this.props.assignment.image
              ? <Image
                responsive
                src={this.props.assignment.image}
                circle />
              : null}
          </div>
        </Col>
        <Col sm={4} md={4}>
          <div onClick={this.props.onAssignmentsClick} className={'blue-title pointer'}>{this.props.assignment.name}</div>
          <div className={'gray-text small-text'}>
            {this.props.assignment.count_lessons} lesson{this.props.assignment.count_lessons > 1 ? 's' : null}
          </div>
        </Col>
        <Col sm={2} md={2} className={'vcenter'}>
          <div className={'gray-text small-text'}>
            {new Date(this.props.assignment.start_on).toLocaleDateString()}
            <br />
            {new Date(this.props.assignment.start_on).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </div>
        </Col>
        <Col sm={2} md={2} className={'vcenter'}>
          <span className={'gray-text small-text'}>
            {new Date(this.props.assignment.due_on).toLocaleDateString()}&nbsp;
            <br />
            {new Date(this.props.assignment.due_on).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </span>
        </Col>
        <Col sm={2} md={2} className={'vcenter'}>
          <span className={'green-completed-box'}>{this.props.assignment ? this.props.assignment.count_students_completed_assingment : null}</span>
          <span className={'yellow-delayed-box'}>{this.props.assignment ? this.props.assignment.count_students_delayed_assingment : null}</span>
          <span className={'red-missed-box'}>{this.props.assignment ? this.props.assignment.count_students_missed_assingment : null}</span>
        </Col>
        <Col sm={1} md={1}>
          <Dropdown onSelect={this.handleSettingsClick} id={'dropdown-settings'}>
            <Dropdown.Toggle className={'classroom-common-button'} style={{padding: '1rem'}}>
              <Glyphicon glyph='cog' />&nbsp;
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <MenuItem eventKey='delete'>Delete assignment</MenuItem>
              <MenuItem eventKey='edit'>Edit assignment</MenuItem>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    )
  }
}

AssignmentTeacherRow.propTypes = {
  assignment: PropTypes.object,
  onAssignmentsClick: PropTypes.func.isRequired,
  onSettingsMenuClick: PropTypes.func.isRequired
}
