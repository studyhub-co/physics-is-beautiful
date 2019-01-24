import React from 'react'

import PropTypes from 'prop-types'

import { Row, Col } from 'react-bootstrap'

import { EditableLabel } from '../../../utils/editableLabel'

import history from '../../../history'
import { BASE_URL } from '../../../utils/config'

export default class Problem extends React.Component {
  render () {
    return (
      <div>
        <Row key={this.props.problem.uuid} className={'blue-text'}>
          <Col sm={2} md={2}>
            {this.props.resourceEditMode
              ? <EditableLabel
                value={this.props.problem.title}
                onChange={(value) => { this.props.onChangeProblemTitle(value, this.props.problem.uuid) }}
              />
              : this.props.problem.title
            }
          </Col>
          <Col sm={9} md={9}>
            <span
              style={{cursor: 'pointer'}}
              onClick={() => { history.push(BASE_URL + this.props.resource.uuid + '/problems/' + this.props.problem.uuid) }}>
              {this.props.problem.count_solutions} solution{this.props.problem.count_solutions > 1 ? 's' : null}
            </span>
          </Col>
          <Col sm={1} md={1}>
            {/* TODO drop down menu for request more solutions */}
          </Col>
        </Row>
      </div>)
  }
}

Problem.propTypes = {
  problem: PropTypes.object,
  resourceEditMode: PropTypes.bool,
  resource: PropTypes.object,
  onChangeProblemTitle: PropTypes.func.isRequired
}
