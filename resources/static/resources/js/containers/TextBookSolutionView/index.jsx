import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { Container, Row, Col, Button, FormGroup, InputGroup, FormControl, Form } from 'react-bootstrap'
import { FaPlus, FaMinus, FaChevronRight, FaChevronLeft, FaArrowUp, FaArrowDown } from 'react-icons/fa'

import PDF from 'react-pdf-js/dist/index'

import { Thread } from '../../components/reactDjeddit/thread'
import history from '../../history'
import { Sheet } from '../../components/Sheet'

// import { Document } from 'react-pdf' // https://github.com/wojtekmaj/react-pdf/issues/52
// import { Document, setOptions } from 'react-pdf/dist/entry.webpack'
// setOptions({ workerSrc: 'react-pdf/dist/pdf.worker.min.js' })

// !=== part of google proxy pdf viewer
// import { downloadGoogleDriveUrl } from '../AddTextBookResourceSteps/lib'

import * as resourcesCreators from '../../actions/resources'
import * as djedditCreators from '../../actions/djeddit'
import * as profileCreators from '../../actions/profile'

import { BASE_URL } from '../../utils/config'
import * as googleCreators from '../../actions/google'
import AdSense from 'react-adsense'
import { slugify } from '../../utils/urls'

class TextBookSolutionView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      pdfScale: 1,
      externalPdfUrlFile: null,
      pdfPages: 0,
      currentPdfPage: 0
    }

    this.titleSet = false

    this.handlePrevious = this.handlePrevious.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.onDocumentComplete = this.onDocumentComplete.bind(this)
    this.handleChangeNumberOfPdfPage = this.handleChangeNumberOfPdfPage.bind(this)
    this.onZoomPdfClick = this.onZoomPdfClick.bind(this)
    // this.onSubmitPost = this.onSubmitPost.bind(this)
    // this.onEditPost = this.onEditPost.bind(this)
    // this.onDeletePost = this.onDeletePost.bind(this)

    // !=== part of google proxy pdf viewer
    // this.loadExternalGooglePdf = this.loadExternalGooglePdf.bind(this)
  }

  componentDidMount () {
    this.props.googleActions.gapiInitialize()
    if (this.props.match.params && this.props.match.params['uuid']) {
      this.props.resourcesActions.fetchSolution(this.props.match.params['uuid'])
    }
    // if (!this.props.resource && this.props.match.params && this.props.match.params['problem_uuid']) {
    //   this.props.resourcesActions.fetchProblem(this.props.match.params['problem_uuid'])
    // }
    // if (!this.props.resource && this.props.match.params && this.props.match.params['resource_uuid']) {
    //   this.props.resourcesActions.fetchResource(this.props.match.params['resource_uuid'])
    // }
    this.props.profileActions.fetchProfileMe()
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.solution && nextProps.solution) {
      this.props.resourcesActions.fetchProblem(nextProps.solution.textbook_problem_uuid)
    }
    if (!this.props.problem && nextProps.problem) {
      this.props.resourcesActions.fetchResource(nextProps.problem.resource_uuid)
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.solution !== this.props.solution) {
      // reload thread
      this.props.djedditActions.fetchThread(this.props.solution.thread)

      // !=== part of google proxy pdf viewer
      // we can't login in to google (auth popup will be blocked by browser)
      // if (this.props.gapiInitState && this.props.solution.pdf.external_url) {
      //   // so load pdf only if user already logged in
      //   if (gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token &&
      //     this.props.solution.pdf.external_url.startsWith('https://drive.google.com/')) {
      //     this.loadExternalGooglePdf(this.props.solution.pdf.external_url)
      //   }
      // }
    }

    if (this.props.resource && this.props.solution &&
      (!this.titleSet ||
        prevProps.problem.uuid !== this.props.problem.uuid ||
        prevProps.solution.uuid !== this.props.solution.uuid)) {
      var resourceTitle

      if (this.props.resource.metadata) {
        resourceTitle = this.props.resource.metadata.data.volumeInfo.title
      } else {
        resourceTitle = 'Unknown resource'
      }

      // Principles of Quantum Mechanics: 1.11 Solution - Physics is Beautiful
      document.title = resourceTitle + ': ' + this.props.problem.title + ': ' + this.props.solution.title +
        ' Solution - Physics is Beautiful'

      var description

      // authors
      var authorsStr
      if (this.props.resource.metadata.data.volumeInfo.hasOwnProperty('authors')) {
        authorsStr = this.props.resource.metadata.data.volumeInfo.authors.map(function (author, i) {
          return author
        }).join(', ')
      }
      // Solution to problem 1.11 from Principles of Quantum Mechanics by R. Shankar: problem_set_07_solution.pdf
      description = 'Solution to problem ' + this.props.problem.title + ' from ' +
        resourceTitle + ' by ' + authorsStr + ': ' + this.props.solution.title

      var meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = description
      document.getElementsByTagName('head')[0].appendChild(meta)

      var solutionOwner = ''
      if (this.props.solution.hasOwnProperty('posted_by')) {
        solutionOwner = this.props.solution.posted_by.display_name
      }

      meta = document.createElement('meta')
      meta.name = 'author'
      meta.content = solutionOwner
      document.getElementsByTagName('head')[0].appendChild(meta)

      this.titleSet = true
    }
  }

  // !=== part of google proxy pdf viewer
  // loadExternalGooglePdf (url) {
  //   downloadGoogleDriveUrl(url, (response) => {
  //     let pdfURL = null
  //     pdfURL = URL.createObjectURL(response)
  //     this.setState({externalPdfUrlFile: pdfURL})
  //   })
  // }

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

  onPrevNextSolutionClick (value) {
    if (this.props.solution && this.props.problem) {
      var resourceTitle = this.props.resource.metadata.data.volumeInfo.title
      var problemTitle = this.props.problem.title

      for (let x = 0; x < this.props.problem.solutions.length; x++) {
        if (this.props.problem.solutions[x].uuid === this.props.solution.uuid) {
          if (value === 'next') {
            if (typeof this.props.problem.solutions[x + 1] !== 'undefined') {
              this.props.resourcesActions.fetchSolution(this.props.problem.solutions[x + 1].uuid)
              // history.push(BASE_URL +
              //   this.props.resource.uuid +
              //   '/problems/' +
              //   this.props.problem.uuid +
              //   '/solutions/' +
              //   this.props.problem.solutions[x + 1].uuid)
              history.push(BASE_URL +
                slugify(resourceTitle) + '/problems/' +
                slugify(problemTitle) + '/solutions/' +
                slugify(this.props.problem.solutions[x + 1].title) + '/' + this.props.problem.solutions[x + 1].uuid + '/'
              )
            }
          } else {
            if (typeof this.props.problem.solutions[x - 1] !== 'undefined') {
              this.props.resourcesActions.fetchSolution(this.props.problem.solutions[x - 1].uuid)

              history.push(BASE_URL +
                slugify(resourceTitle) + '/problems/' +
                slugify(problemTitle) + '/solutions/' +
                slugify(this.props.problem.solutions[x - 1].title) + '/' + this.props.problem.solutions[x - 1].uuid + '/'
              )

            //   history.push(BASE_URL +
            //     this.props.resource.uuid +
            //     '/problems/' +
            //     this.props.problem.uuid +
            //     '/solutions/' +
            //     this.props.problem.solutions[x - 1].uuid)
            }
          }
        }
      }
    }
  }

  onDocumentComplete (pages) {
    this.setState({ currentPdfpage: 1, pdfPages: pages })
    if (window.innerWidth < 595) {
      this.setState({pdfScale: window.innerWidth / 1000})
    }
  }

  handlePrevious () {
    this.setState({ currentPdfpage: this.state.currentPdfpage - 1 })
  }

  handleNext () {
    this.setState({ currentPdfpage: this.state.currentPdfpage + 1 })
  }

  handleChangeNumberOfPdfPage (e) {
    let page = parseInt(e.target.value.replace(/\D/g, ''))
    if (page > 0 && page < this.state.pdfPages) {
      this.setState({currentPdfpage: page})
    }
  }

  onZoomPdfClick (val) {
    this.setState({ pdfScale: this.state.pdfScale + val })
  }

  handleChangeNumberOfPdfPageInputKeyUp (e) {
    if (e.keyCode === 13) { // 'enter' key
      this.handleChangeNumberOfPdfPage(e)
    }
  }

  upDownSolutionClick (solutionId, val) {
    this.props.resourcesActions.solutionVoteAndRefresh(solutionId, val)
  }

  // onSubmitPost (post) {
  //   this.props.djedditActions.createPostWithRefreshThread(post, this.props.solution.thread)
  // }
  //
  // onEditPost (post) {
  //   this.props.djedditActions.updatePostWithRefreshThread(post, this.props.solution.thread)
  // }
  //
  // onDeletePost (post) {
  //   this.props.djedditActions.deletePostWithRefreshThread(post, this.props.solution.thread)
  // }

  renderPagination (page, pages) {
    let previousButton = <Button onClick={() => { this.handlePrevious() }} className={'common-button'}>Previous</Button>
    if (page === 1) {
      previousButton = <Button disabled className={'common-button disabled-button'}>Previous</Button>
    }
    let nextButton = <Button onClick={() => { this.handleNext() }} className={'common-button'}>Next</Button>
    if (page === pages) {
      nextButton = <Button disabled className={'common-button disabled-button'}>Next</Button>
    }

    return (
      <div>
        <Form inline className={'justify-content-center'}>
          <FormGroup style={{marginBottom: 0}}>
            {previousButton}&nbsp;
            <InputGroup style={{maxWidth: 80}}>
              <FormControl
                type='text'
                value={page}
                onChange={this.handleChangeNumberOfPdfPage}
                onKeyUp={this.handleChangeNumberOfPdfPageInputKeyUp}
              />
              <InputGroup.Text>
                 / {pages}
              </InputGroup.Text>
            </InputGroup>
            &nbsp;{nextButton}
            &nbsp;<Button onClick={() => { this.onZoomPdfClick(0.3) }} className={'common-button'}>
              {/*<Glyphicon glyph='plus' />*/}
              <FaPlus />
            </Button>
            &nbsp;<Button onClick={() => { this.onZoomPdfClick(-0.3) }} className={'common-button'}>
              {/*<Glyphicon glyph='minus' />*/}
              <FaMinus />
            </Button>
          </FormGroup>
        </Form>
      </div>
    )
  }

  render () {
    let pagination = null
    if (this.state.pdfPages) {
      pagination = this.renderPagination(this.state.currentPdfpage, this.state.pdfPages)
    }

    let prevSolutionDisabled = ''
    let nextSolutionDisabled = ''

    if (this.props.problem && this.props.solution) {
      if (
        this.props.problem.solutions[this.props.problem.solutions.length - 1].uuid === this.props.solution.uuid) {
        nextSolutionDisabled = ' disabled-button'
      }

      if (this.props.problem.solutions[0].uuid === this.props.solution.uuid) {
        prevSolutionDisabled = ' disabled-button'
      }
    }

    let pdfFile = null

    if (this.props.solution) {
      // !=== part of google proxy pdf viewer
      // if (this.props.solution.pdf.external_url) {
      //   if (this.props.solution.pdf.external_url.startsWith('https://drive.google.com/'))
      //   {if (this.state.externalPdfUrlFile) {
      //     // file donwloaded
      //     pdfFile = this.state.externalPdfUrlFile
      //     } else {
      //       pdfFile = this.props.solution.pdf.file
      //     }
      //   }

      pdfFile = this.props.solution.pdf.file
    }

    var problemUrl = null

    if (this.props.resource && this.props.problem.title) {
      var resourceTitle = this.props.resource.metadata.data.volumeInfo.title
      var problemTitle = this.props.problem.title

      problemUrl = BASE_URL + slugify(resourceTitle) + '/problems/' +
        slugify(problemTitle) + '/' + this.props.problem.uuid + '/'
    }

    // history.push(BASE_URL + this.props.match.params['resource_uuid'] + '/problems/' + this.props.match.params['problem_uuid'])

    return (
      <Sheet>
        <Container fluid>
          <Row>
            <Col sm={12} md={12}>
              <a
                className={'back-button'}
                onClick={() => { history.push(problemUrl) }} >
                {/*<span className='glyphicon glyphicon-menu-left' style={{fontSize: 16}} />*/}
                <FaChevronLeft />
                All solutions
              </a>
            </Col>
          </Row>
        </Container>
        { this.props.solution && this.props.problem && this.props.resource
          ? <Container fluid>
            <Row>
              <Col sm={12} md={12}>
                <div className={'text-align-center blue-title'}>
                  { this.props.resource.metadata
                    ? this.props.resource.metadata.data.volumeInfo.title
                    : 'Unknown resource' }
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={12}>
                <div style={{fontSize: '3rem'}} className={'text-align-center gray-text'}>{this.props.problem.title}</div>
              </Col>
            </Row>
            <Row className={'text-align-center'}>
              <Col sm={1} md={1}>
                <div>
                  <FaArrowUp
                    style={{cursor: 'pointer'}}
                    onClick={() => this.upDownSolutionClick(this.props.solution.uuid, 1)} />
                  {/*<Glyphicon*/}
                    {/*glyph='arrow-up'*/}
                    {/*style={{cursor: 'pointer'}}*/}
                    {/*onClick={() => this.upDownSolutionClick(this.props.solution.uuid, 1)} />*/}
                </div>
                <div>
                  {this.props.solution.vote_score}
                </div>
                <div>
                  <FaArrowDown
                    style={{cursor: 'pointer'}}
                    onClick={() => this.upDownSolutionClick(this.props.solution.uuid, -1)} />
                  {/*<Glyphicon*/}
                    {/*glyph='arrow-down'*/}
                    {/*style={{cursor: 'pointer'}}*/}
                    {/*onClick={() => this.upDownSolutionClick(this.props.solution.uuid, -1)} />*/}
                </div>
              </Col>
              <Col sm={1} md={1}>
                {this.props.solution.pdf ? <div className={'pdf-ico'} /> : null}
              </Col>
              <Col sm={5} md={5}>
                <div><a href={this.props.solution.pdf.external_url || this.props.solution.pdf.file}>
                  <h1 className={'solution-title'}>
                    {this.props.solution.title}</h1>
                </a>
                </div>
                <div className={'small-text gray-text'}>
                  Posted by <a href={this.props.solution.posted_by.get_absolute_url} target={'_blank'}>
                    {this.props.solution.posted_by.display_name}
                  </a>&nbsp;-&nbsp;
                  <Moment fromNow>{this.props.solution.created_on}</Moment>
                </div>

              </Col>
              <Col sm={5} md={5}>
                <button
                  onClick={() => { this.onPrevNextSolutionClick('prev') }}
                  className={'common-button' + prevSolutionDisabled}
                  disabled={prevSolutionDisabled === '' ? Boolean(false) : Boolean(true)}
                  style={{marginTop: 0}}
                >
                  <FaChevronLeft /> Previous solution
                  {/*<Glyphicon glyph='menu-left' /> Previous solution*/}
                </button>
                &nbsp;
                <button
                  onClick={() => { this.onPrevNextSolutionClick('next') }}
                  className={'common-button' + nextSolutionDisabled}
                  disabled={nextSolutionDisabled === '' ? Boolean(false) : Boolean(true)}
                  style={{marginTop: 0}}
                >
                  {/*Next solution <Glyphicon glyph='menu-right' />*/}
                  Next solution <FaChevronRight />
                </button>
              </Col>
            </Row>
            <Row className={'justify-content-center'}>
              <Col className={'text-center'}>
                {pagination}
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={12} className={'text-align-center'}>
                <div style={{overflowX: 'auto', position: 'relative'}}>
                  {/* <Document file={this.props.solution.pdf.file} /> */}
                  { this.props.solution.pdf.external_url && !pdfFile
                    ? <Button
                      onClick={() => { this.loadExternalGooglePdf(this.props.solution.pdf.external_url) }}
                      className={'common-button'}>
                      Click to load file from Google Drive
                    </Button> : null
                  }
                  {/* TODO fix it*/}
                  { pdfFile
                    ? <PDF
                    // ref={(el) => { this.pdfRef = el }}
                    // fillWidth={Boolean(true)} // not supported anymore
                      key={this.props.solution.pdf.id}
                      file={pdfFile}
                      onDocumentComplete={this.onDocumentComplete}
                      page={this.state.currentPdfpage}
                      scale={this.state.pdfScale}
                    /> : null }
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
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
                    // onSubmitPost={this.onSubmitPost}
                    // onSubmitEditPost={this.onEditPost}
                    // onDeletePost={this.onDeletePost}
                    onSubmitPost={(post) => { this.props.djedditActions.createPostWithRefreshThread(post, this.props.solution.thread) }}
                    onSubmitEditPost={(post) => { this.props.djedditActions.updatePostWithRefreshThread(post, this.props.solution.thread) }}
                    onDeletePost={(post) => { this.props.djedditActions.deletePostWithRefreshThread(post, this.props.solution.thread) }}
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

TextBookSolutionView.propTypes = {
  // actions
  resourcesActions: PropTypes.shape({
    fetchProblem: PropTypes.func.isRequired,
    fetchResource: PropTypes.func.isRequired,
    fetchSolution: PropTypes.func.isRequired,
    solutionVoteAndRefresh: PropTypes.func.isRequired
  }),
  djedditActions: PropTypes.shape({
    fetchThread: PropTypes.func.isRequired,
    createPostWithRefreshThread: PropTypes.func.isRequired,
    changePostVote: PropTypes.func.isRequired,
    updatePostWithRefreshThread: PropTypes.func.isRequired,
    deletePostWithRefreshThread: PropTypes.func.isRequired
  }),
  profileActions: PropTypes.shape({
    fetchProfileMe: PropTypes.func.isRequired
  }),
  googleActions: PropTypes.shape({
    gapiInitialize: PropTypes.func.isRequired
  }).isRequired,
  // data
  problem: PropTypes.object,
  resource: PropTypes.object,
  solution: PropTypes.object,
  thread: PropTypes.object,
  profile: PropTypes.object,
  // gapiInitState: PropTypes.bool
}

const mapStateToProps = (state) => {
  return {
    problem: state.resources.problem,
    resource: state.resources.resource,
    solution: state.resources.solution,
    thread: state.djeddit.thread,
    profile: state.profile.me,
    gapiInitState: state.google.gapiInitState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    resourcesActions: bindActionCreators(resourcesCreators, dispatch),
    djedditActions: bindActionCreators(djedditCreators, dispatch),
    profileActions: bindActionCreators(profileCreators, dispatch),
    googleActions: bindActionCreators(googleCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextBookSolutionView)
export { TextBookSolutionView as TextBookSolutionViewNotConnected }
