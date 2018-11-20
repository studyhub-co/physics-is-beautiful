import React from 'react'

import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Sheet } from '../../components/Sheet'

import { Grid, Row, Col, Button, Glyphicon } from 'react-bootstrap'

import { AddResourceView } from '../../containers/index'

// import * as tabsCreators from '../../actions/tab'

import { Route } from 'react-router'

class IndexView extends React.Component {

  render () {
    var baseUrl =  this.props.match.url.replace(/\/$/, '')
    var addResourceUrl = baseUrl + '/add/'
    // var editUrl = baseUrl + '/:uuid/edit/'

    return (
      <Sheet>
        <Route path={addResourceUrl} component={AddResourceView} />
        <Grid fluid>
          <Row>
            <Col sm={10} md={10}>
              <div className={'blue-title'} style={{lineHeight: '7rem'}}>
                Resources
              </div>
            </Col>
            <Col sm={2} md={2}>
              <Button onClick={this.searchButtonClick}>
                <Glyphicon glyph='plus' /> Add resource
              </Button>
            </Col>
          </Row>
        </Grid>
      </Sheet>
    )
  }
}

IndexView.propTypes = {
  // tabActions: PropTypes.shape({
  //   changeSelectedTab: PropTypes.func.isRequired
  // }).isRequired,
  // googleActions: PropTypes.shape({
  //   googleFetchClassroomList: PropTypes.func.isRequired,
  //   gapiInitialize: PropTypes.func.isRequired,
  //   googleSaveClassroomsWithStudents: PropTypes.func.isRequired
  // }).isRequired,
  // classroomActions: PropTypes.shape({
  //   classroomCreateClassroom: PropTypes.func.isRequired,
  //   classroomFetchTeacherClassroomsList: PropTypes.func.isRequired,
  //   classroomFetchStudentClassroomsList: PropTypes.func.isRequired,
  //   classroomJoinClassroom: PropTypes.func.isRequired
  // }).isRequired,
  // tab: PropTypes.string,
  // classroomList: PropTypes.array,
  // classroomStudentList: PropTypes.array,
  // googleClassroomsList: PropTypes.array,
  // gapiInitState: PropTypes.bool,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    // tab: state.tab.tab,
    // classroomList: state.classroom.classroomList,
    // classroomStudentList: state.classroom.classroomStudentList,
    // googleClassroomsList: state.google.googleClassroomsList,
    // gapiInitState: state.google.gapiInitState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    // tabActions: bindActionCreators(tabsCreators, dispatch),
    // classroomActions: bindActionCreators(classroomCreators, dispatch),
    // googleActions: bindActionCreators(googleCreators, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexView)
export { IndexView as IndexViewNotConnected }
