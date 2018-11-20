import React from 'react'

import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Sheet } from '../../components/Sheet'

import * as resourcesCreators from '../../actions/resources'

import { Grid, Row, Col, Button, Glyphicon, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

import history from '../../history'
import { BASE_URL } from '../../utils/config'
import AddTextBookResourceView from './addTextBookResource'

class AddResourceView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {resouresTypeValue: null}

    this.handleResouresTypesChange = this.handleResouresTypesChange.bind(this);

  }

  componentDidMount () {
    this.props.resourcesActions.fetchResourceOptions()
  }

  handleResouresTypesChange (event) {
    this.setState({resouresTypeValue: event.target.value})
  }

  render () {
    var resourceOptions = this.props.resourceOptions
    var resourceTypesOptions = []

    resourceTypesOptions.push(
      <option disabled key={'select'} value={'select'}>
        {'Select resource type...'}
      </option>)

    if (resourceOptions) {
      var resourceTypeChoices = resourceOptions.actions.POST.resource_type.choices
      for (var x = 0; x < resourceTypeChoices.length; x++) {
        resourceTypesOptions.push(
          <option key={resourceTypeChoices[x].value} value={resourceTypeChoices[x].value}>
            {resourceTypeChoices[x].display_name}
          </option>)
      }
    }

    return (
      <Sheet>
        <Grid fluid>
          <Row>
            <Col sm={12} md={12}>
              <a className={'back-button'} onClick={() => { history.push(BASE_URL) }} >
                <span className='glyphicon glyphicon-menu-left' style={{fontSize: 16}} />
                All Resources
              </a>
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={12}>
              <div className={'blue-title'} style={{lineHeight: '7rem'}}>
                Add resource
              </div>
              <hr />
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={12}>
              <FormGroup controlId='resouresTypes'>
                <FormControl
                  onChange={this.handleResouresTypesChange}
                  defaultValue={'select'}
                  componentClass='select'
                  placeholder='Select resource type...'>
                  {resourceTypesOptions}
                </FormControl>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={12}>
              { this.state.resouresTypeValue === 'TB'
                ? <AddTextBookResourceView />
                : null
              }
            </Col>
          </Row>
        </Grid>
      </Sheet>
    )
  }
}

AddResourceView.propTypes = {
  resourcesActions: PropTypes.shape({
    fetchResourceOptions: PropTypes.func.isRequired
  }).isRequired,
  resourceOptions: PropTypes.object
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
  // dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    resourceOptions: state.resources.resourceOptions,
    // tab: state.tab.tab,
    // classroomStudentList: state.classroom.classroomStudentList,
    // googleClassroomsList: state.google.googleClassroomsList,
    // gapiInitState: state.google.gapiInitState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    resourcesActions: bindActionCreators(resourcesCreators, dispatch)
    // tabActions: bindActionCreators(tabsCreators, dispatch),
    // classroomActions: bindActionCreators(classroomCreators, dispatch),
    // googleActions: bindActionCreators(googleCreators, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddResourceView)
export { AddResourceView as AddResourceViewNotConnected }
