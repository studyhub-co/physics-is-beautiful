import React from 'react'

// import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { FaChevronLeft } from 'react-icons/fa'

import { Sheet } from '../../components/Sheet'
import * as resourcesCreators from '../../actions/resources'
import history from '../../history'
import { BASE_URL } from '../../utils/config'
import AddTextBookResourceView from './addTextBookResource'
import AddStandardizedTestResourceView from './addStandardizedTestResource'

class AddResourceView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      resouresTypeValue: null,
      wizardStep: 0
    }

    this.handleResouresTypesChange = this.handleResouresTypesChange.bind(this)
    this.onAddResourceStepUpdated = this.onAddResourceStepUpdated.bind(this)
  }

  componentDidMount () {
    this.props.resourcesActions.fetchResourceOptions()
  }

  handleResouresTypesChange (event) {
    this.setState({resouresTypeValue: event.target.value})
  }

  onAddResourceStepUpdated (step) {
    this.setState({wizardStep: step})
  }

  render () {
    var resourceOptions = this.props.resourceOptions
    var resourceTypesOptions = []

    resourceTypesOptions.push(
      <option disabled key={'select'} value={'select'}>
        {'Select resource type...'}
      </option>)

    if (resourceOptions) {
      if (!resourceOptions.hasOwnProperty('actions')) {
        // user can't create resource
        // redirect to login page
        let url = '/accounts/login/?next=' + window.location.pathname
        window.location.replace(url)
        throw new Error('redirecting...')
      }

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
        <Container fluid>
          <Row>
            <Col sm={12} md={12}>
              <a className={'back-button'} onClick={() => { history.push(BASE_URL) }} >
                {/*<span className='glyphicon glyphicon-menu-left' style={{fontSize: 16}} />*/}
                <FaChevronLeft />
                All Resources
              </a>
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={12}>
              <div className={'blue-title'} style={{lineHeight: '5rem'}}>
                Add resource
              </div>
              <hr />
            </Col>
          </Row>
          { this.state.wizardStep < 1 ? <Row>
            <Col sm={12} md={12}>
              <Form.Group controlId='resouresTypes'>
                <Form.Control
                  onChange={this.handleResouresTypesChange}
                  defaultValue={'select'}
                  type={'seleft'}
                  as={'select'}
                  placeholder='Select resource type...'>
                  {resourceTypesOptions}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
            : null }
          <Row>
            <Col sm={12} md={12}>
              { this.state.resouresTypeValue === 'TB'
                ? <AddTextBookResourceView onStepUpdated={this.onAddResourceStepUpdated} />
                : null
              }
              { this.state.resouresTypeValue === 'TS'
                ? <AddStandardizedTestResourceView onStepUpdated={this.onAddResourceStepUpdated} />
                : null
              }
            </Col>
          </Row>
        </Container>
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
  // gapiInitState: PropTypes.bool,
  // dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    resourceOptions: state.resources.resourceOptions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    resourcesActions: bindActionCreators(resourcesCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddResourceView)
export { AddResourceView as AddResourceViewNotConnected }
