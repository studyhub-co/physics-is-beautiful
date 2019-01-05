import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Sheet } from '../../components/Sheet'

import * as resourcesCreators from '../../actions/resources'

import { Grid, Row, Col, Image, Button, Glyphicon, FormGroup, InputGroup, FormControl } from 'react-bootstrap'

import { BASE_URL } from '../../utils/config'
import history from '../../history'
import { EditableLabel, EditableExternalEventLabel } from '../../utils/editableLabel'

class TextBookResourceView extends React.Component {
  constructor (props) {
    super(props)
    // TODO copy resource from props to state to allow user modify
    this.state = {
      chapterEditMode: null,
      problemEditMode: null
    }
  }

  editChapterClick (id) {
    this.setState({
      chapterEditMode: id
    })
  }

  onChangeChapterValue (value, id) {
    // TODO save title in state
  }

  onChangeProblemTitle (value, id) {
    // TODO save title in state
  }

  render () {
    var isbn = null
    if (this.props.resource.metadata.data.volumeInfo.hasOwnProperty('industryIdentifiers')) {
      var isbnFound = this.props.resource.metadata.data.volumeInfo.industryIdentifiers.find(x => x.type === 'ISBN_13')
      if (isbnFound) {
        isbn = isbnFound.identifier
      }
    }

    return (
      <Grid fluid>
        <Row>
          <Col sm={12} md={12}>
            <h1 className={'blue-title text-align-center'}>
              {this.props.resource.metadata ? this.props.resource.metadata.data.volumeInfo.title : 'Unknown resource'}
            </h1>
          </Col>
        </Row>
        <Row>
          <Col sm={9} md={9}>
            {this.props.resource.sections ? this.props.resource.sections.map(function (chapter, i) { // ============ chapters
              return <Row key={chapter.position}>
                <Col sm={12} md={12}>
                  <span className={'blue-title'}>
                    <EditableExternalEventLabel
                      value={chapter.title}
                      onChange={(value) => { this.onChangeChapterValue(value, chapter.id) }}
                      editMode={this.state.chapterEditMode === chapter.id}
                    />
                  </span>
                  <span style={{position: 'relative', paddingLeft: '1rem'}}>
                    <span className={'base-circle-edit'}>
                      [<span
                        onClick={() => this.editChapterClick(chapter.id)}
                        className={'blue-text'}
                        style={{cursor: 'pointer'}}
                      >
                        Edit
                      </span>]
                    </span>
                  </span>
                  {chapter.problems ? chapter.problems.map(function (problem, i) { // ============ problems
                    return <Row key={problem.uuid} className={'blue-text'}>
                      <Col sm={2} md={2}>
                        <EditableLabel
                          value={problem.title}
                          onChange={(value) => { this.onChangeProblemTitle(value, problem.uuid) }}
                        />
                      </Col>
                      <Col sm={9} md={9}>
                        { problem.count_solutions > 0
                          ? <span
                            style={{cursor: 'pointer'}}
                            onClick={() => { history.push(BASE_URL + this.props.resource.uuid + '/problems/' + problem.uuid) }}>
                            {problem.count_solutions} solution{problem.count_solutions > 1 ? 's' : null}
                          </span>
                          : 'No solutions'
                        }
                      </Col>
                      <Col sm={1} md={1}>
                        {/* TODO drop down menu for request more solutions */}
                      </Col>
                    </Row>
                  }, this)
                    : null
                  }
                </Col>
              </Row>
            }, this)
              : null
            }
          </Col>
          <Col sm={3} md={3}>
            <div
              style={{paddingBottom: '1rem',
                fontSize: '20rem',
                overflow: 'hidden',
                textAlign: 'center'}}>
              { this.props.resource.metadata &&
              this.props.resource.metadata.data.volumeInfo.hasOwnProperty('imageLinks') &&
              this.props.resource.metadata.data.volumeInfo.imageLinks.thumbnail
                ? <Image src={this.props.resource.metadata.data.volumeInfo.imageLinks.thumbnail} />
                : <Glyphicon glyph='picture' /> }
            </div>
            { this.props.resource.metadata
              ? <div style={{backgroundColor: '#EDEDED', padding: '1rem'}}>
                <Row>
                  <Col sm={4} md={4}>
                    <b>Author:</b>
                  </Col>
                  <Col sm={8} md={8}>
                    { this.props.resource.metadata.data.volumeInfo.hasOwnProperty('authors')
                      ? <div>{this.props.resource.metadata.data.volumeInfo.authors.map(function (author, i) {
                        return <span key={author} style={{paddingRight: '1rem'}}>
                          {author}
                          {this.props.resource.metadata.data.volumeInfo.authors.length - 1 !== i ? ',' : null}
                        </span>
                      }, this)}</div> : null
                    }
                  </Col>
                </Row>
                <Row>
                  <Col sm={4} md={4}>
                    <b>Language:</b>
                  </Col>
                  <Col sm={8} md={8}>
                    { this.props.resource.metadata.data.volumeInfo.hasOwnProperty('language')
                      ? <div>
                        { this.props.resource.metadata.data.volumeInfo.language }
                      </div> : null }
                  </Col>
                </Row>
                <Row>
                  <Col sm={4} md={4}>
                    <b>Published:</b>
                  </Col>
                  <Col sm={8} md={8}>
                    { this.props.resource.metadata.data.volumeInfo.hasOwnProperty('publishedDate')
                      ? <div>
                        { this.props.resource.metadata.data.volumeInfo.publishedDate }
                      </div> : null }
                  </Col>
                </Row>
                <Row>
                  <Col sm={4} md={4}>
                    <b>Publisher:</b>
                  </Col>
                  <Col sm={8} md={8}>
                    { this.props.resource.metadata.data.volumeInfo.hasOwnProperty('publisher')
                      ? <div>
                        { this.props.resource.metadata.data.volumeInfo.publisher }
                      </div> : null }
                  </Col>
                </Row>
                <Row>
                  <Col sm={4} md={4}>
                    <b>ISBN:</b>
                  </Col>
                  <Col sm={8} md={8}>
                    { isbn }
                  </Col>
                </Row>
              </div> : 'Book data not found'}
          </Col>
        </Row>
      </Grid>
    )
  }
}

TextBookResourceView.propTypes = {
  // actions
  // resourcesActions: PropTypes.shape({
  //   fetchResource: PropTypes.func.isRequired
  // }),
  // data
  resource: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    //resource: state.resources.resource
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    resourcesActions: bindActionCreators(resourcesCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextBookResourceView)
export { TextBookResourceView as TextBookResourceViewNotConnected }