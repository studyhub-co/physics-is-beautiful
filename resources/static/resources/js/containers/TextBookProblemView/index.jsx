import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Sheet } from '../../components/Sheet'

import * as resourcesCreators from '../../actions/resources'

import { Grid, Row, Col, Table, Button, Glyphicon, FormGroup, InputGroup, FormControl } from 'react-bootstrap'

import { BASE_URL } from '../../utils/config'
import history from '../../history'

class TextBookProblemView extends React.Component {
  componentDidMount () {
    if (this.props.match.params && this.props.match.params['uuid']) {
      this.props.resourcesActions.fetchProblem(this.props.match.params['uuid'])
    }
    if (!this.props.resource && this.props.match.params && this.props.match.params['resource_uuid']) {
      this.props.resourcesActions.fetchResource(this.props.match.params['resource_uuid'])
    }
  }

  render () {
    return (
      <Sheet>
        <Grid fluid>
          <Row>
            <Col sm={12} md={12}>
              <a className={'back-button'} onClick={() => { history.push(BASE_URL + this.props.match.params['resource_uuid'])}} >
                <span className='glyphicon glyphicon-menu-left' style={{fontSize: 16}} />
                All problems
              </a>
            </Col>
          </Row>
        </Grid>
        { this.props.problem
          ? <Grid fluid>
            <Row>
              <Col sm={12} md={12}>
                <div className={'text-align-center blue-title'}>{this.props.resource && this.props.resource.metadata
                  ? this.props.resource.metadata.data.volumeInfo.title
                  : 'Unknown resource'}
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={12}>
                <h1 style={{fontSize: '3rem'}} className={'text-align-center gray-text'}>{this.props.problem.title}</h1>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={12}>
                <Table striped bordered condensed hover responsive>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td colSpan="2">Larry the Bird</td>
                      <td>@twitter</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Grid>
          : null }
      </Sheet>
    )
  }
}

TextBookProblemView.propTypes = {
  // // actions
  resourcesActions: PropTypes.shape({
    fetchProblem: PropTypes.func.isRequired,
    fetchResource: PropTypes.func.isRequired
  }),
  // data
  problem: PropTypes.object,
  resource: PropTypes.object,
}

const mapStateToProps = (state) => {
  return {
    problem: state.resources.problem,
    resource: state.resources.resource
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    resourcesActions: bindActionCreators(resourcesCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextBookProblemView)
export { TextBookProblemView as TextBookProblemViewNotConnected }
