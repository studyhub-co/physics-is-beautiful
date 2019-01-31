import React from 'react'

import PropTypes from 'prop-types'

import { DragSource } from 'react-dnd'

import { Glyphicon, Row, Col } from 'react-bootstrap'

import { EditableLabel } from '../../../utils/editableLabel'

import history from '../../../history'
import { BASE_URL } from '../../../utils/config'
import { DragItemTypes } from '../../../dnd'

// export default class Problem extends React.Component {
let ProblemClass = class Problem extends React.Component {
  render () {
    return (
      this.props.connectDragPreview(
        <div style={{display: this.props.isDragging ? 'none' : 'block'}}>
          <Row key={this.props.problem.uuid} className={'blue-text'}>
            <Col sm={2} md={2} style={{paddingLeft: '3rem'}}>
              {this.props.resourceEditMode
                ? <div>
                  {this.props.connectDragSource(<span className='drag-handle' style={{width: '1rem', height: '1rem'}} />)}
                  <EditableLabel
                    value={this.props.problem.title}
                    onChange={(value) => { this.props.onChangeProblemTitle(value, this.props.problem) }}
                  />
                  <span
                    className={'red-text'}
                    style={{cursor: 'pointer', paddingLeft: '1rem'}}
                    onClick={() => { this.props.onRemoveProblem(this.props.problem) }}
                    title={'Remove the chapter'}
                  >
                    {/* remove chapter button */}
                    <Glyphicon glyph='remove' />&nbsp;
                  </span>
                </div>
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
    )
  }
}

ProblemClass.propTypes = {
  problem: PropTypes.object,
  resourceEditMode: PropTypes.bool,
  resource: PropTypes.object,
  onChangeProblemTitle: PropTypes.func.isRequired,
  onRemoveProblem: PropTypes.func.isRequired
}

const dragSource = {
  beginDrag (props) {
    return props.problem
  }
}

function collect (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

export default DragSource(DragItemTypes.PROBLEM, dragSource, collect)(ProblemClass)
