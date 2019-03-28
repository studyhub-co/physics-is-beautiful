import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { Container, Row, Col, Table, Button, Modal, Dropdown, DropdownItem } from 'react-bootstrap'
import { FaPlus, FaEllipsisH, FaChevronLeft, FaArrowDown, FaArrowUp, FaCommentAlt } from 'react-icons/fa'
import AdSense from 'react-adsense'

import history from '../../history'
import { Sheet } from '../../components/Sheet'
import * as resourcesCreators from '../../actions/resources'
import { BASE_URL } from '../../utils/config'
import { slugify } from '../../utils/urls'
import { Thread } from '../../components/reactDjeddit/thread'

import {
  handleFileChange,
  onChangeExternalUrl
} from '../AddTextBookResourceSteps/lib'

import { EditableExternalEventLabel, EditableLabel } from '../../utils/editableLabel'
import * as googleCreators from '../../actions/google'
import * as profileCreators from '../../actions/profile'
import * as djedditCreators from '../../actions/djeddit'

class HorizontalOptionToggle extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    e.preventDefault()
    this.props.onClick(e)
  }

  render () {
    return (
      <span onClick={this.handleClick} style={{cursor: 'pointer'}}>
        <FaEllipsisH />
        {/*<Glyphicon*/}
          {/*glyph='option-horizontal'*/}
          {/*style={{cursor: 'pointer'}}*/}
        {/*/>*/}
      </span>
    )
  }
}

class TextBookProblemView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showPostSolutionModal: false,
      ordering: 'Top',
      solutionEditModeUuid: null
    }
    this.onPostSolutionClick = this.onPostSolutionClick.bind(this)
    this.handleClosePostSolutionModal = this.handleClosePostSolutionModal.bind(this)
    this.addSolution = this.addSolution.bind(this)
    this.handleOrderSelect = this.handleOrderSelect.bind(this)
    this.onChangeSolutionTitle = this.onChangeSolutionTitle.bind(this)
  }

  componentDidMount () {
    if (this.props.match.params && this.props.match.params['uuid']) {
      this.props.resourcesActions.fetchProblem(this.props.match.params['uuid'])
    }
    // if (!this.props.resource && this.props.match.params && this.props.match.params['resource_uuid']) {
    //   this.props.resourcesActions.fetchResource(this.props.match.params['resource_uuid'])
    // }
    this.props.googleActions.gapiInitialize()
    this.props.profileActions.fetchProfileMe()
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.problem && nextProps.problem) {
      this.props.resourcesActions.fetchResource(nextProps.problem.resource_uuid)
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.problem !== this.props.problem) {
      // reload thread
      this.props.djedditActions.fetchThread(this.props.problem.thread)
    }

    // Title / tags
    if (this.props.resource && this.props.problem &&
      (!this.titleSet || prevProps.problem.uuid !== this.props.problem.uuid)) {
      var resourceTitle

      if (this.props.resource.metadata) {
        resourceTitle = this.props.resource.metadata.data.volumeInfo.title
      } else {
        resourceTitle = 'Unknown resource'
      }

      var description

      // authors
      var authorsStr
      if (this.props.resource.metadata.data.volumeInfo.hasOwnProperty('authors')) {
        authorsStr = this.props.resource.metadata.data.volumeInfo.authors.map(function (author, i) {
          return author
        }).join(', ')
      }
      // Principles of Quantum Mechanics 1.11 Solutions - Physics is Beautiful
      document.title = authorsStr + ' ' + resourceTitle + ' ' + this.props.problem.title + ' Solution - Physics is Beautiful'
      // Problem 1.11 PDF solutions from Principles of Quantum Mechanics by R. Shankar
      description = 'Problem ' + this.props.problem.title + ' PDF solution from ' + resourceTitle + ' by ' + authorsStr

      var meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = description
      document.getElementsByTagName('head')[0].appendChild(meta)

      var resourceOwner = ''
      if (this.props.resource.hasOwnProperty('owner')) {
        resourceOwner = this.props.resource.owner.display_name
      }

      meta = document.createElement('meta')
      meta.name = 'author'
      meta.content = resourceOwner
      document.getElementsByTagName('head')[0].appendChild(meta)

      this.titleSet = true
    }
  }

  componentWillUnmount () {
    // clear titile
    document.title = 'Physics is Beautiful'
    // remove meta
    var element = document.getElementsByTagName('meta')['description']
    if (element && element.hasOwnProperty('parentNode')) {
      element.parentNode.removeChild(element)
    }
    element = document.getElementsByTagName('meta')['author']
    if (element && element.hasOwnProperty('parentNode')) {
      element.parentNode.removeChild(element)
    }
    this.titleSet = false
  }

  onPostSolutionClick () {
    if (this.props.profile.is_anonymous === true) {
      let url = '/accounts/login/?next=' + window.location.pathname
      window.location.replace(url)
      throw new Error('redirecting...')
    } else {
      this.setState({showPostSolutionModal: !this.state.showPostSolutionModal})
    }
  }

  onClickSolution (e, solution) {
    if (this.state.solutionEditModeUuid === solution.uuid) { return } // do not redirect while edit mode
    // history.push(BASE_URL + this.props.resource.uuid + '/problems/' + this.props.problem.uuid + '/solutions/' + uuid)

    if (this.props.resource && this.props.problem) {
      //path={BASE_URL + ':resource_title([A-Za-z0-9_-]+)/problems/:problem_title([A-Za-z0-9_-]+)/solutions/:solution_title([A-Za-z0-9_-]+)/:uuid'}
      var resourceTitle = this.props.resource.metadata.data.volumeInfo.title
      var problemTitle = this.props.problem.title

      history.push(BASE_URL +
        slugify(resourceTitle) + '/problems/' +
        slugify(problemTitle) + '/solutions/' +
        slugify(solution.title) + '/' + solution.uuid + '/'
      )
    }
  }

  handleClosePostSolutionModal () {
    this.setState({ showPostSolutionModal: !this.state.showPostSolutionModal })
  }

  // Vote solution click
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

  handleSolutionMenuClick (val, solution) {
    if (val === 'Edit') {
      this.setState({solutionEditModeUuid: solution.uuid})
    } else if (val === 'Delete') {
      if (confirm('Are you sure you want to delete this solution?')) {
        this.props.resourcesActions.removeSolutionReloadProblem({uuid: solution.uuid}, this.props.problem)
      }
    }
  }

  onChangeSolutionTitle (value, solution) {
    if (!value) return
    let newSolution = {uuid: solution.uuid, title: value}
    this.props.resourcesActions.updateSolutionReloadProblem(newSolution, this.props.problem)
    this.setState({solutionEditModeUuid: null})
  }

  render () {
    var self = this
    let getHaveSolutionEditAccess = function (solution) {

      if (self.props.profile &&
          self.props.profile.is_anonymous !== true &&
         (self.props.profile.is_staff === true || self.props.profile.id === solution.posted_by.id)) {
        return true
      }
      return false
    }

    if (this.props.resource) {
      var resourceTitle = this.props.resource.metadata.data.volumeInfo.title
      var resourceUrl = BASE_URL + slugify(resourceTitle) + '/' + this.props.resource.uuid + '/'
      //history.push(BASE_URL + this.props.match.params['resource_uuid'])
    }

    return (
      <Sheet>
        <Container fluid>
          <Row>
            <Col sm={12} md={12}>
              <a className={'back-button'} onClick={() => { history.push(resourceUrl) }} >
                {/*<span className='glyphicon glyphicon-menu-left' style={{fontSize: 16}} />*/}
                <FaChevronLeft />
                All problems
              </a>
            </Col>
          </Row>
        </Container>
        { this.props.problem
          ? <Container fluid>
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
                    <DropdownItem eventKey='Top'>Top</DropdownItem>
                    <DropdownItem eventKey='New'>New</DropdownItem>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col sm={9} md={9} />
              <Col sm={2} md={2}>
                <Button onClick={() => { this.onPostSolutionClick() }} className={'common-button'}>
                  {/*<Glyphicon glyph='plus' /> Post solution*/}
                  <FaPlus /> Post solution
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
                          value={'external link'}
                          onChange={(url) => {
                            if (this.props.gapiInitState) {
                              onChangeExternalUrl(url, null, this.props.problem, (...args) => { this.addSolution(...args) })
                            }
                          }
                          }
                          defaultValue={'external link'} />
                      </b>
                    </span>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={this.handleClosePostSolutionModal}>Close</Button>
                </Modal.Footer>
              </Modal>
            </Row>
            <Row>
              <Col sm={12} md={12}>
                <Table striped bordered size='sm' hover responsive>
                  <tbody>
                    { this.props.problem
                      ? this.props.problem.solutions.map(function (solution, i) { // ============ chapters
                        return <tr key={solution.uuid}>
                          <td>
                            <FaArrowDown
                              style={{cursor: 'pointer'}}
                              onClick={() => this.upDownSolutionClick(solution.uuid, -1)} />
                            &nbsp;{solution.vote_score}&nbsp;
                            <FaArrowUp
                              style={{cursor: 'pointer'}}
                              onClick={() => this.upDownSolutionClick(solution.uuid, 1)} />
                            {/*<Glyphicon*/}
                              {/*glyph='arrow-down'*/}
                              {/*style={{cursor: 'pointer'}}*/}
                              {/*onClick={() => this.upDownSolutionClick(solution.uuid, -1)} />*/}
                            {/*&nbsp;{solution.vote_score}&nbsp;*/}
                            {/*<Glyphicon*/}
                              {/*glyph='arrow-up'*/}
                              {/*style={{cursor: 'pointer'}}*/}
                              {/*onClick={() => this.upDownSolutionClick(solution.uuid, 1)} />*/}
                          </td>
                          <td>{solution.pdf ? <div className={'pdf-ico'} /> : null}</td>
                          <td>
                            {/* Solution title */}
                            <div
                              className={'title blue-text'}
                              style={{cursor: 'pointer'}}
                              onClick={(e) => this.onClickSolution(e, solution)}>
                              <EditableExternalEventLabel
                                editableLabel={Boolean(false)}
                                value={solution.title}
                                onChange={(value) => { this.onChangeSolutionTitle(value, solution) }}
                                editMode={this.state.solutionEditModeUuid === solution.uuid}
                              />
                              {/*{solution.title}*/}
                            </div>
                            <div className={'small-text gray-text'}>
                              Posted by <a href={solution.posted_by.get_absolute_url} target={'_blank'}>
                                {solution.posted_by.display_name}
                              </a>&nbsp;-&nbsp;
                              <Moment fromNow>{solution.created_on}</Moment></div>
                          </td>
                          {/*<td style={{textAlign: 'center'}}><Glyphicon glyph='comment' />&nbsp;{solution.count_comments}</td>*/}
                          <td style={{textAlign: 'center'}}><FaCommentAlt />&nbsp;{solution.count_comments}</td>
                          { getHaveSolutionEditAccess(solution)
                            ? <td className={'solution-dropdown-menu'}>
                              <Dropdown
                                onSelect={(val) => { this.handleSolutionMenuClick(val, solution) }}
                                id={'dropdown-settings' + solution.uuid}
                              >
                                {/*<HorizontalOptionToggle bsRole='toggle' data-boundary='body' />*/}
                                <Dropdown.Toggle as={HorizontalOptionToggle} />
                                <Dropdown.Menu>
                                  <DropdownItem eventKey='Edit'>Edit</DropdownItem>
                                  <DropdownItem eventKey='Delete'>Delete</DropdownItem>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td> : null }
                        </tr>
                      }, this) : null }
                  </tbody>
                </Table>
                <div style={{marginTop: 20, marginBottom: 20}}>
                  <AdSense.Google
                    client='ca-pub-1780955227395785'
                    slot='4334626488'
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={12}>
                { this.props.thread
                  ? <Thread
                    thread={this.props.thread}
                    currentProfile={this.props.profile}
                    onSubmitPost={(post) => { this.props.djedditActions.createPostWithRefreshThread(post, this.props.problem.thread) }}
                    onSubmitEditPost={(post) => { this.props.djedditActions.updatePostWithRefreshThread(post, this.props.problem.thread) }}
                    onDeletePost={(post) => { this.props.djedditActions.deletePostWithRefreshThread(post, this.props.problem.thread) }}
                    changePostVote={this.props.djedditActions.changePostVote}
                  /> : null }
              </Col>
            </Row>
          </Container>
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
    addSolution: PropTypes.func.isRequired,
    updateSolutionReloadProblem: PropTypes.func.isRequired,
    removeSolutionReloadProblem: PropTypes.func.isRequired
  }),
  djedditActions: PropTypes.shape({
    fetchThread: PropTypes.func.isRequired,
    createPostWithRefreshThread: PropTypes.func.isRequired,
    changePostVote: PropTypes.func.isRequired,
    updatePostWithRefreshThread: PropTypes.func.isRequired,
    deletePostWithRefreshThread: PropTypes.func.isRequired
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
  resource: PropTypes.object,
  thread: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    problem: state.resources.problem,
    resource: state.resources.resource,
    gapiInitState: state.google.gapiInitState,
    profile: state.profile.me,
    thread: state.djeddit.thread
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    googleActions: bindActionCreators(googleCreators, dispatch),
    djedditActions: bindActionCreators(djedditCreators, dispatch),
    resourcesActions: bindActionCreators(resourcesCreators, dispatch),
    profileActions: bindActionCreators(profileCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextBookProblemView)
export { TextBookProblemView as TextBookProblemViewNotConnected }
