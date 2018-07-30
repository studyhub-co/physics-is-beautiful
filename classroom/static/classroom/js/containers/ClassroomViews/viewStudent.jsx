import React from 'react'

import { push } from 'connected-react-router'

import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'

import { Grid, Row, Col } from 'react-bootstrap'

import { connect } from 'react-redux'

import * as classroomCreators from '../../actions/classroom'

class StudentView extends React.Component {
  componentWillMount () {
    this.props.classroomActions.classroomFetchClassroom(this.props.match.params['uuid'])
  }
  render () {
    return (
      <Grid fluid>
        { this.props.classroom
          ? <div>
            <Row>
              <Col sm={10} md={10}>
                {this.props.classroom.name}
              </Col>
              <Col sm={2} md={2}>
                <span onClick={() => this.props.dispatch(push('classroom'))} className={'pib-link'}>Assignments</span>
              </Col>
            </Row>
            <Row>
              <Col sm={10} md={10} />
              <Col sm={2} md={2}>
                <span onClick={() => this.props.classroomActions.classroomLeaveClassroom(this.props.classroom)} className={'grey-link'}>Leave classroom</span>
              </Col>
            </Row></div>
          : null }
      </Grid>)
  }
}

StudentView.propTypes = {
  classroomActions: PropTypes.shape({
    classroomFetchClassroom: PropTypes.func.isRequired,
    classroomLeaveClassroom: PropTypes.func.isRequired
  }).isRequired,
  classroom: PropTypes.shape()
}

const mapStateToProps = (state) => {
  return {
    classroom: state.classroom.classroomClassroom
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    classroomActions: bindActionCreators(classroomCreators, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentView)
export { StudentView as StudentViewNotConnected }
