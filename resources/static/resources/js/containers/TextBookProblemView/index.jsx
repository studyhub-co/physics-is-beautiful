import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { Grid, Row, Col, Table, Button, Glyphicon, FormGroup, InputGroup, FormControl } from 'react-bootstrap'

import history from '../../history'
import { Sheet } from '../../components/Sheet'
import * as resourcesCreators from '../../actions/resources'
import { BASE_URL } from '../../utils/config'

class TextBookProblemView extends React.Component {
  componentDidMount () {
    if (this.props.match.params && this.props.match.params['uuid']) {
      this.props.resourcesActions.fetchProblem(this.props.match.params['uuid'])
    }
    if (!this.props.resource && this.props.match.params && this.props.match.params['resource_uuid']) {
      this.props.resourcesActions.fetchResource(this.props.match.params['resource_uuid'])
    }
  }

  onPostSolutionClick () {
    // TODO
    // upload file/link
    // add solution info to solutions list
  }

  onClickSolution (uuid) {
    history.push(BASE_URL + this.props.resource.uuid + '/problems/' + this.props.problem.uuid + '/solutions/' + uuid)
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
              <Col sm={10} md={10}>
                {/* TODO sort */}
              </Col>
              <Col sm={2} md={2}>
                <Button onClick={() => { this.onPostSolutionClick() }} className={'common-button'}>
                  <Glyphicon glyph='plus' /> Post solution
                </Button>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={12}>
                <Table striped bordered condensed hover responsive>
                  <tbody>
                    { this.props.problem
                      ? this.props.problem.solutions.map(function (solution, i) { // ============ chapters
                        return <tr key={solution.position}>
                          <td>
                            <Glyphicon
                              glyph='arrow-down'
                              style={{cursor: 'pointer'}}
                              onClick={() => this.upDownSolutionClick(solution.id, -1)} />
                            &nbsp;90k&nbsp;
                            <Glyphicon
                              glyph='arrow-up'
                              style={{cursor: 'pointer'}}
                              onClick={() => this.upDownSolutionClick(solution.id, 1)} />
                          </td>
                          <td>{solution.pdf ? <div className={'pdf-ico'} /> : null}</td>
                          <td>
                            <div
                              className={'title blue-text'}
                              style={{cursor: 'pointer'}}
                              onClick={() => this.onClickSolution(solution.uuid)}>{solution.title}</div>
                            <div className={'small-text gray-text'}>
                              Posted by <a href={solution.posted_by.get_absolute_url} target={'_blank'}>
                                {solution.posted_by.display_name}
                              </a>&nbsp;-&nbsp;
                              <Moment fromNow>{solution.created_on}</Moment></div>
                          </td>
                          <td><Glyphicon glyph='comment' />&nbsp;1.7k</td>
                          <td></td>
                        </tr>
                      }, this) : null }
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
  resource: PropTypes.object
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
