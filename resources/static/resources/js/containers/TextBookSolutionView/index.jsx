import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { Grid, Row, Col, Button, Glyphicon, FormGroup, InputGroup, FormControl, Form } from 'react-bootstrap'
// import { Document } from 'react-pdf' // https://github.com/wojtekmaj/react-pdf/issues/52
// import { Document, setOptions } from 'react-pdf/dist/entry.webpack'
// setOptions({ workerSrc: 'react-pdf/dist/pdf.worker.min.js' })

import PDF from 'react-pdf-js'

import history from '../../history'
import { Sheet } from '../../components/Sheet'
import * as resourcesCreators from '../../actions/resources'
import { BASE_URL } from '../../utils/config'

class TextBookSolutionView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      pdfScale: 1
    }
    this.handlePrevious = this.handlePrevious.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.onDocumentComplete = this.onDocumentComplete.bind(this)
    this.handleChangeNumberOfPdfPage = this.handleChangeNumberOfPdfPage.bind(this)
    this.onZoomPdfClick = this.onZoomPdfClick.bind(this)
  }

  componentDidMount () {
    if (this.props.match.params && this.props.match.params['uuid']) {
      this.props.resourcesActions.fetchSolution(this.props.match.params['uuid'])
    }
    if (!this.props.resource && this.props.match.params && this.props.match.params['problem_uuid']) {
      this.props.resourcesActions.fetchProblem(this.props.match.params['problem_uuid'])
    }
    if (!this.props.resource && this.props.match.params && this.props.match.params['resource_uuid']) {
      this.props.resourcesActions.fetchResource(this.props.match.params['resource_uuid'])
    }
  }

  onPrevNextSolutionClick () {
    // TODO
    // upload file/link
    // add solution info to solutions list
  }

  onDocumentComplete (pages) {
    this.setState({ currentPdfpage: 1, pdfPages: pages })
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
        <Form inline>
          <FormGroup>
            {previousButton}&nbsp;
            <InputGroup>
              <FormControl
                type='text'
                value={page}
                onChange={this.handleChangeNumberOfPdfPage}
                onKeyUp={this.handleChangeNumberOfPdfPageInputKeyUp}
              />
              <InputGroup.Addon>
                 / {pages}
              </InputGroup.Addon>
            </InputGroup>
            &nbsp;{nextButton}
            &nbsp;<Button onClick={() => { this.onZoomPdfClick(0.3) }} className={'common-button'}>
              <Glyphicon glyph='plus' />
            </Button>
            &nbsp;<Button onClick={() => { this.onZoomPdfClick(-0.3) }} className={'common-button'}>
              <Glyphicon glyph='minus' />
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

    return (
      <Sheet>
        <Grid fluid>
          <Row>
            <Col sm={12} md={12}>
              <a
                className={'back-button'}
                onClick={() => { history.push(BASE_URL + this.props.match.params['resource_uuid'] + '/problems/' + this.props.match.params['problem_uuid'])}} >
                <span className='glyphicon glyphicon-menu-left' style={{fontSize: 16}} />
                All solutions
              </a>
            </Col>
          </Row>
        </Grid>
        { this.props.solution && this.props.problem && this.props.resource
          ? <Grid fluid>
            <Row>
              <Col sm={12} md={12}>
                <div className={'text-align-center blue-title'}>{this.props.resource.metadata
                  ? this.props.resource.metadata.data.volumeInfo.title
                  : 'Unknown resource'}
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={12}>
                <div style={{fontSize: '3rem'}} className={'text-align-center gray-text'}>{this.props.problem.title}</div>
              </Col>
            </Row>
            <Row>
              <Col sm={1} md={1}>
                <div>
                  <Glyphicon
                    glyph='arrow-up'
                    style={{cursor: 'pointer'}}
                    onClick={() => this.upDownSolutionClick(this.props.solution.id, 1)} />
                </div>
                <div>
                      90k
                </div>
                <div>
                  <Glyphicon
                    glyph='arrow-down'
                    style={{cursor: 'pointer'}}
                    onClick={() => this.upDownSolutionClick(this.props.solution.id, -1)} />
                </div>
              </Col>
              <Col sm={1} md={1}>
                {this.props.solution.pdf ? <div className={'pdf-ico'} /> : null}
              </Col>
              <Col sm={5} md={5}>
                <div className={'small-text gray-text'}>
                  Posted by <a href={this.props.solution.posted_by.get_absolute_url} target={'_blank'}>
                    {this.props.solution.posted_by.display_name}
                  </a>&nbsp;-&nbsp;
                  <Moment fromNow>{this.props.solution.created_on}</Moment>
                </div>
                <div><h1 className={'gray-text title'}>{this.props.solution.title}</h1></div>
              </Col>
              <Col sm={4} md={4}>
                <Button onClick={() => { this.onPrevNextSolutionClick() }} className={'common-button'}>
                  <Glyphicon glyph='plus' /> Previous solution
                </Button>
                <Button onClick={() => { this.onPrevNextSolutionClick() }} className={'common-button'}>
                  <Glyphicon glyph='plus' /> Next solution
                </Button>
              </Col>
            </Row>
            {/*<Row>*/}
              {/*<Col sm={12} md={12} className={'text-align-center'}>*/}
              {/*</Col>*/}
            {/*</Row>*/}
            <Row>
              <Col sm={12} md={12} className={'text-align-center'}>
                {/*<Document file={this.props.solution.pdf.file} />*/}
                <PDF
                  file={this.props.solution.pdf.file}
                  onDocumentComplete={this.onDocumentComplete}
                  page={this.state.currentPdfpage}
                  scale={this.state.pdfScale}
                />
                {pagination}
              </Col>
            </Row>
          </Grid>
          : null }
      </Sheet>
    )
  }
}

TextBookSolutionView.propTypes = {
  // // actions
  resourcesActions: PropTypes.shape({
    fetchProblem: PropTypes.func.isRequired,
    fetchResource: PropTypes.func.isRequired,
    fetchSolution: PropTypes.func.isRequired
  }),
  // data
  problem: PropTypes.object,
  resource: PropTypes.object,
  solution: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    problem: state.resources.problem,
    resource: state.resources.resource,
    solution: state.resources.solution
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    resourcesActions: bindActionCreators(resourcesCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextBookSolutionView)
export { TextBookSolutionView as TextBookSolutionViewNotConnected }
