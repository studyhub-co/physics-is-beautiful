import React from 'react'

import PropTypes from 'prop-types'
import { Row, Col, Image, FormGroup, InputGroup, DropdownButton, DropdownItem } from 'react-bootstrap'
import { FaEdit } from 'react-icons/fa'

export default class StaffUserRow extends React.Component {
  render () {
    return (
      <Row className={'staff-user-row'}>
        <Col sm={2} md={2}>
          { this.props.staff.avatar_url
            ? <Image
              responsive
              src={this.props.staff.avatar_url}
              rounded />
            : null}
        </Col>
        <Col sm={6} md={6}>
          {this.props.staff.display_name}
        </Col>
        <Col sm={2} md={2}>
          <span style={{textTransform: 'capitalize '}}>{this.props.post}</span>
        </Col>
        <Col sm={2} md={2}>
          { this.props.post !== 'owner'
            ? <FormGroup>
              <InputGroup>
                <DropdownButton
                  componentClass={InputGroup.Button}
                  id='input-dropdown-addon'
                  // title={<Glyphicon glyph='edit' />}
                  title={<FaEdit />}
                >
                  <DropdownItem key='e' onSelect={this.props.onRemoveFromCollaboratorsClick}>Remove from collaborators</DropdownItem>
                </DropdownButton>
              </InputGroup>
            </FormGroup> : null }
        </Col>
      </Row>
    )
  }
}

StaffUserRow.propTypes = {
  staff: PropTypes.object.isRequired,
  onRemoveFromCollaboratorsClick: PropTypes.func,
  post: PropTypes.string.isRequired
}
