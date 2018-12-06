import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Sheet } from '../../components/Sheet'

import * as resourcesCreators from '../../actions/resources'

import { Grid, Row, Col, Button, Glyphicon, FormGroup, InputGroup, FormControl } from 'react-bootstrap'

import { BASE_URL } from '../../utils/config'
import history from '../../history'

class ResourceView extends React.Component {
  componentDidMount () {
    if (this.props.match.params && this.props.match.params['uuid']) {
      this.props.resourcesActions.fetchResource(this.props.match.params['uuid'])
    }
  }

  render () {
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
              <div className={''}>
                sefdfds
              </div>
            </Col>
          </Row>
        </Grid>
      </Sheet>
    )
  }
}

ResourceView.propTypes = {
  // // actions
  resourcesActions: PropTypes.shape({
    fetchResource: PropTypes.func.isRequired
  }),
  // data
  resource: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    resource: state.resources.resource
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    resourcesActions: bindActionCreators(resourcesCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResourceView)
export { ResourceView as IndexViewNotConnected }