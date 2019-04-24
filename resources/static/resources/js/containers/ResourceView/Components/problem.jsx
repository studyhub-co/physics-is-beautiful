import React from 'react'

import PropTypes from 'prop-types'

import { DragSource } from 'react-dnd'

import { Row, Col } from 'react-bootstrap'
import { FaTimes } from 'react-icons/fa'

import { EditableLabel } from '../../../utils/editableLabel'

import history from '../../../history'
import { BASE_URL } from '../../../utils/config'
import { slugify } from '../../../utils/urls'
import { DragItemTypes } from '../../../dnd'

// export default class Problem extends React.Component {
let ProblemClass = class Problem extends React.Component {
  render () {
    var problemViewUrl = null

    if (this.props.resource && this.props.problem) {
      var resourceTitle = this.props.resource.metadata.data.volumeInfo.title
      var problemTitle = this.props.problem.title

      problemViewUrl = BASE_URL + slugify(resourceTitle) + '/problems/' +
        slugify(problemTitle) + '/' + this.props.problem.uuid + '/'
    }

    return (
      this.props.connectDragPreview(
        <div style={{display: this.props.isDragging ? 'none' : 'block'}}>
          <Row
            key={this.props.problem.uuid}
            className={'problem-row'}
            onClick={() => {
              if (!this.props.resourceEditMode) {
                // history.push(BASE_URL + this.props.resource.uuid + '/problems/' + this.props.problem.uuid)
                history.push(problemViewUrl)
              }
            }}
          >
            <Col xs={4} md={3} >
              {this.props.resourceEditMode
                ? <div>
                  {this.props.connectDragSource(<span className='drag-handle' style={{width: '1rem', height: '1rem'}} />)}
                  <span
                    className={'red-text'}
                    style={{cursor: 'pointer', paddingRight: '1rem'}}
                    onClick={() => { this.props.onRemoveProblem(this.props.problem) }}
                    title={'Remove the chapter'}
                  >
                    {/* remove chapter button */}
                    {/*<Glyphicon glyph='remove' />&nbsp;*/}
                    <FaTimes />&nbsp;
                  </span>
                  <EditableLabel
                    value={this.props.problem.title}
                    onChange={(value) => { this.props.onChangeProblemTitle(value, this.props.problem) }}
                  />
                </div>
                : <span style={{paddingLeft: '2rem'}} >
                  {this.props.problem.title}
                </span>
              }
            </Col>
            <Col xs={8} md={9}>
              <span
                style={{cursor: 'pointer'}}
                className={'solution-count'}
                onClick={() => {
                  history.push(problemViewUrl)
                }}
                // onClick={() => { history.push(BASE_URL + this.props.resource.uuid + '/problems/' + this.props.problem.uuid) }}
                // onClick={() => { history.push(BASE_URL + slugify(resourceTitle) + '/problems/' + slugify(problemTitle) + '/' + this.props.problem.uuid) }}
              >
                {/* /resources/resource_title/problems/problem_title/problem_uuid */}
                {this.props.problem.count_solutions} solution{this.props.problem.count_solutions !== 1 ? 's' : null}
              </span>
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
