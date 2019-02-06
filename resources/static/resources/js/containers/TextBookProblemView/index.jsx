import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { Grid, Row, Col, Table, Button, Glyphicon, Modal, Dropdown, MenuItem } from 'react-bootstrap'

import history from '../../history'
import { Sheet } from '../../components/Sheet'
import * as resourcesCreators from '../../actions/resources'
import { BASE_URL } from '../../utils/config'

import {
  handleFileChange,
  onChangeExternalUrl
} from '../AddTextBookResourceSteps/lib'

import { EditableLabel } from '../../utils/editableLabel'
import * as googleCreators from '../../actions/google'
import * as profileCreators from '../../actions/profile'

class TextBookProblemView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showPostSolutionModal: false,
      ordering: 'Top'
    }
    this.onPostSolutionClick = this.onPostSolutionClick.bind(this)
    this.handleClosePostSolutionModal = this.handleClosePostSolutionModal.bind(this)
    this.addSolution = this.addSolution.bind(this)
    this.handleOrderSelect = this.handleOrderSelect .bind(this)
  }

  componentDidMount () {
    if (this.props.match.params && this.props.match.params['uuid']) {
      this.props.resourcesActions.fetchProblem(this.props.match.params['uuid'])
    }
    if (!this.props.resource && this.props.match.params && this.props.match.params['resource_uuid']) {
      this.props.resourcesActions.fetchResource(this.props.match.params['resource_uuid'])
    }
    this.props.googleActions.gapiInitialize()
    this.props.profileActions.fetchProfileMe()
  }

  onPostSolutionClick () {
    if (this.props.profile.is_anonymous === true) {
      let url = '/accounts/login/?next=' + window.location.pathname
      window.location.replace(url)
      throw new Error('redirecting...')
    }
    else {
      this.setState({showPostSolutionModal: !this.state.showPostSolutionModal})
    }
  }

  onClickSolution (uuid) {
    history.push(BASE_URL + this.props.resource.uuid + '/problems/' + this.props.problem.uuid + '/solutions/' + uuid)
  }

  handleClosePostSolutionModal () {
    this.setState({ showPostSolutionModal: !this.state.showPostSolutionModal })
  }

  upDownSolutionClick (solutionUuid, val) {
    this.props.resourcesActions.solutionVoteAndRefreshList(solutionUuid, val, this.props.problem.uuid)
  }

  addSolution (chapter, problem, file) {
    // save new solution for the problem
    this.props.resourcesActions.addSolution(file, problem)
    this.setState({ showPostSolutionModal: false })
  }

  handleOrderSelect (val) {
    this.setState({'ordering': val})
    if (this.props.match.params && this.props.match.params['uuid']) {
      if (val === 'Top') {
        this.props.resourcesActions.fetchProblem(this.props.match.params['uuid'])
      } else if (val === 'New') {
        this.props.resourcesActions.fetchProblem(this.props.match.params['uuid'], '-solutions__created_on')
      }
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
              <Col sm={1} md={1}>
                <Dropdown onSelect={this.handleOrderSelect} id={'dropdown-settings'}>
                  <Dropdown.Toggle className={'common-button'} style={{padding: '1rem'}}>
                    {this.state.ordering}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <MenuItem eventKey='Top'>Top</MenuItem>
                    <MenuItem eventKey='New'>New</MenuItem>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col sm={9} md={9}>
              </Col>
              <Col sm={2} md={2}>
                <Button onClick={() => { this.onPostSolutionClick() }} className={'common-button'}>
                  <Glyphicon glyph='plus' /> Post solution
                </Button>
              </Col>
              <Modal
                show={this.state.showPostSolutionModal}
                onHide={this.handleClosePostSolutionModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Post solution</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div>
                    <span
                      className={'blue-text selectable-file'}
                      style={{ paddingLeft: '2rem', position: 'relative' }}
                    >
                      <input
                        type='file'
                        name='pdf'
                        id={'solution-input-' + this.props.problem.uuid}
                        accept='application/pdf'
                        // onChange={(file) => this.handleFileChange(file, chapter, problem, (...args) => { this.addSolution(...args) })}
                        onChange={(file) =>
                          handleFileChange(file, null, this.props.problem, null, (...args) => { this.addSolution(...args) })}
                        style={{fontSize: '1px'}} />
                      <label htmlFor={'solution-input-' + this.props.problem.uuid} style={{cursor: 'pointer'}}>
                        upload pdf file...
                      </label>
                    </span>
                  </div>
                  <div>
                    <span
                      style={{paddingLeft: '2rem', cursor: 'pointer'}}
                      className={'blue-text'}
                    >
                      <b>
                        <EditableLabel
                          // value={'google drive link'}
                          value={'external link'}
                          onChange={(url) => {
                            if (this.props.gapiInitState) {
                              // onChangeGoogleDriveUrl(url, null, this.props.problem, (...args) => { this.addSolution(...args) })
                              onChangeExternalUrl(url, null, this.props.problem, (...args) => { this.addSolution(...args) })
                            }
                          }
                          }
                          // defaultValue={'google drive link'} />
                          defaultValue={'external link'} />
                      </b>
                    </span>
                  </div>
                  {/*<div>*/}
                    {/*<span*/}
                      {/*style={{paddingLeft: '2rem', cursor: 'pointer'}}*/}
                      {/*className={'blue-text'}*/}
                    {/*>*/}
                      {/*<b>*/}
                        {/*<EditableLabel*/}
                          {/*value={'direct link'}*/}
                          {/*onChange={(url) => {*/}
                            {/*onChangeDirectUrl(url, null, this.props.problem, (...args) => { this.addSolution(...args) })*/}
                          {/*}*/}
                          {/*}*/}
                          {/*defaultValue={'direct link'} />*/}
                      {/*</b>*/}
                    {/*</span>*/}
                  {/*</div>*/}
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={this.handleClosePostSolutionModal}>Close</Button>
                </Modal.Footer>
              </Modal>
            </Row>
            <Row>
              <Col sm={12} md={12}>
                <Table striped bordered condensed hover responsive>
                  <tbody>
                    { this.props.problem
                      ? this.props.problem.solutions.map(function (solution, i) { // ============ chapters
                        return <tr key={solution.uuid}>
                          <td>
                            <Glyphicon
                              glyph='arrow-down'
                              style={{cursor: 'pointer'}}
                              onClick={() => this.upDownSolutionClick(solution.uuid, -1)} />
                            &nbsp;{solution.vote_score}&nbsp;
                            <Glyphicon
                              glyph='arrow-up'
                              style={{cursor: 'pointer'}}
                              onClick={() => this.upDownSolutionClick(solution.uuid, 1)} />
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
                          <td><Glyphicon glyph='comment' />&nbsp;{solution.count_comments}</td>
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
  // actions
  resourcesActions: PropTypes.shape({
    fetchProblem: PropTypes.func.isRequired,
    fetchResource: PropTypes.func.isRequired,
    solutionVoteAndRefreshList: PropTypes.func.isRequired,
    addSolution: PropTypes.func.isRequired
  }),
  googleActions: PropTypes.shape({
    gapiInitialize: PropTypes.func.isRequired
  }).isRequired,
  profileActions: PropTypes.shape({
    fetchProfileMe: PropTypes.func.isRequired
  }),
  // data
  problem: PropTypes.object,
  profile: PropTypes.object,
  resource: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    problem: state.resources.problem,
    resource: state.resources.resource,
    gapiInitState: state.google.gapiInitState,
    profile: state.profile.me,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    googleActions: bindActionCreators(googleCreators, dispatch),
    resourcesActions: bindActionCreators(resourcesCreators, dispatch),
    profileActions: bindActionCreators(profileCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextBookProblemView)
export { TextBookProblemView as TextBookProblemViewNotConnected }
