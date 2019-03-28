import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { FaPlus, FaImage } from 'react-icons/fa'

import {DockableDropTarget, DragItemTypes} from '../../dnd'
import Chapter from './Components/chapter'
import { Thread } from '../../components/reactDjeddit/thread'
import * as resourcesCreators from '../../actions/resources'
import * as profileCreators from '../../actions/profile'
import * as djedditCreators from '../../actions/djeddit'

class TextBookResourceView extends React.Component {
  constructor (props) {
    super(props)
    // enh copy resource from props to state to allow user modify
    this.state = {
      chapterEditModeId: null,
      resourceEditMode: false
    }

    this.titleSet = false

    this.addProblemClick = this.addProblemClick.bind(this)
    this.onChangeChapterValue = this.onChangeChapterValue.bind(this)
    this.onChangeProblemTitle = this.onChangeProblemTitle.bind(this)
    this.onRemoveChapter = this.onRemoveChapter.bind(this)
    this.onRemoveProblem = this.onRemoveProblem.bind(this)
    this.onChangeChapterShowAd = this.onChangeChapterShowAd.bind(this)
  }

  componentDidMount () {
    if (!this.props.profile) {
      this.props.profileActions.fetchProfileMe()
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.resource && !this.props.thread) {
      // reload thread
      this.props.djedditActions.fetchThread(this.props.resource.thread)
    }

    // title / metatags
    if (this.props.resource && !this.titleSet) {
      var title

      if (this.props.resource.metadata) {
        title = this.props.resource.metadata.data.volumeInfo.title
      } else {
        title = 'Unknown resource'
      }
      // authors
      var authorsStr
      if (this.props.resource.metadata.data.volumeInfo.hasOwnProperty('authors')) {
        authorsStr = this.props.resource.metadata.data.volumeInfo.authors.map(function (author, i) {
          return author
        }).join(' ')
      }

      document.title = authorsStr + ' ' + title + ' Solutions - Physics is Beautiful'

      var meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = authorsStr + ' ' + title + ' textbook solutions or solutions manual for all problems and chapters.'
      document.getElementsByTagName('head')[0].appendChild(meta)

      // var resourceOwner = ''
      // if (this.props.resource.hasOwnProperty('owner')) {
      //   resourceOwner = this.props.resource.owner.display_name
      // }

      meta = document.createElement('meta')
      meta.name = 'author'
      meta.content = authorsStr
      document.getElementsByTagName('head')[0].appendChild(meta)

      meta = document.createElement('meta')
      meta.name = 'date'
      meta.content = this.props.resource.updated_on ? this.props.resource.updated_on : this.props.resource.created_on
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
  }

  onRemoveChapter (chapter) {
    if (confirm('Are you sure you want to delete this chapter?')) { // TODO we can use Modal from react bootstrap if needed
      this.props.resourcesActions.removeChapterReloadResource(chapter, this.props.resource)
    }
  }

  onRemoveProblem (problem) {
    if (confirm('Are you sure you want to delete this problem?')) { // TODO we can use Modal from react bootstrap if needed
      this.props.resourcesActions.removeProblemReloadResource(problem, this.props.resource)
    }
  }

  editResourceClick () {
    this.setState({
      resourceEditMode: !this.state.resourceEditMode
    })
  }

  addChapterClick () {
    this.props.resourcesActions.addChapter('Chapter ' + (this.props.resource.sections.length + 1), this.props.resource)
  }

  addProblemClick (chapter) {
    this.setState({
      chapterEditModeId: null
    })
    // add problem to list
    this.props.resourcesActions.addProblem(chapter.id + '.' + (chapter.problems.length + 1), chapter, this.props.resource)
  }

  onChangeChapterValue (value, chapter) {
    // save chapter title
    let newChapter = {id: chapter.id, title: value, position: chapter.position}
    this.props.resourcesActions.updateChapterReloadResource(newChapter, this.props.resource)
  }

  onChangeProblemTitle (value, problem) {
    // update problem title
    let newProblem = {uuid: problem.uuid, title: value, position: problem.position}
    this.props.resourcesActions.updateProblemReloadResource(newProblem, this.props.resource)
  }

  onChapterDroppedBefore (beforeChapter, chapter) {
    let updateChapter = {id: chapter.id}
    if (beforeChapter) {
      updateChapter['position'] = beforeChapter.position
    } else { // at the end of list
      // POST without position
    }

    this.props.resourcesActions.updateChapterReloadResource(updateChapter, this.props.resource)
  }

  onProblemDroppedBefore (problemBefore, droppedProblem, newParentChapter) {
    let updateProblem = {
      uuid: droppedProblem.uuid,
      textbook_section_id: newParentChapter.id
    }

    if (problemBefore) {
      updateProblem['position'] = problemBefore.position
    }

    this.props.resourcesActions.updateProblemReloadResource(updateProblem, this.props.resource)
  }

  onChangeChapterShowAd (chapter, checked) {
    let updateChapter = {id: chapter.id, show_ad: checked, position: chapter.position}
    // this.props.resourcesActions.updateChapter(updateChapter)
    // needs to reload to refres View mode
    this.props.resourcesActions.updateChapterReloadResource(updateChapter, this.props.resource)
  }

  // addGoogleAdClick () {
  //   let ad = {'slot': 111, 'client': 'ca-pub-1780955227395785'}
  //   this.props.googleActions.addAd(ad, this.props.resource)
  // }

  render () {
    var isbn = null
    if (this.props.resource.metadata.data.volumeInfo.hasOwnProperty('industryIdentifiers')) {
      var isbnFound = this.props.resource.metadata.data.volumeInfo.industryIdentifiers.find(x => x.type === 'ISBN_13')
      if (isbnFound) {
        isbn = isbnFound.identifier
      }
    }

    var haveEditAccess = false
    if (this.props.profile &&
        this.props.profile.is_anonymous !== true &&
        this.props.profile.is_staff === true) {
      haveEditAccess = true
    }

    return (
      <Container fluid>
        <Row>
          <Col sm={12} md={12}>
            <span style={{position: 'relative', float: 'right', fontSize: 10}}>
              { haveEditAccess
                ? <span className={'base-circle-edit'}>
                  [<span
                    onClick={() => this.editResourceClick()}
                    className={'blue-text'}
                    style={{cursor: 'pointer'}}>
                    {this.state.resourceEditMode
                      ? 'View'
                      : 'Edit'}
                  </span>]
                </span>
                : null }
            </span>
            <h1 className={'textbook-title text-align-center'}>
              {this.props.resource.metadata ? this.props.resource.metadata.data.volumeInfo.title : 'Unknown resource'} Solutions
            </h1>
          </Col>
        </Row>
        <Row>
          <Col sm={9} md={9}>
            {this.props.resource.sections ? this.props.resource.sections.map(function (chapter, i) { // ============ chapters
              return <Row key={chapter.id}>
                <Col sm={12} md={12}>
                  <DockableDropTarget
                    key={chapter.id}
                    onDrop={(droppedChapter) => { this.onChapterDroppedBefore(chapter, droppedChapter) }}
                    itemType={DragItemTypes.CHAPTER}
                    self={chapter}
                    idAttr={'id'}
                  >
                    <Chapter
                      chapter={chapter}
                      chapterEditModeId={this.state.chapterEditModeId}
                      onChangeProblemTitle={this.onChangeProblemTitle}
                      onChangeChapterValue={this.onChangeChapterValue}
                      onRemoveChapter={this.onRemoveChapter}
                      onRemoveProblem={this.onRemoveProblem}
                      onChangeChapterShowAd={this.onChangeChapterShowAd}
                      onProblemDroppedBefore={
                        (problem, droppedProblem) => {
                          this.onProblemDroppedBefore(problem, droppedProblem, chapter)
                        }
                      }
                      resourceEditMode={this.state.resourceEditMode}
                      addProblemClick={this.addProblemClick}
                      resource={this.props.resource}
                    />
                  </DockableDropTarget>
                </Col>
              </Row>
            }, this)
              : null
            }
            {this.state.resourceEditMode
              ? <DockableDropTarget
                onDrop={(droppedChapter) => { this.onChapterDroppedBefore(null, droppedChapter) }}
                itemType={DragItemTypes.CHAPTER}
                self={null}
                idAttr={'id'}
              >
                <div // Add chapter button
                  style={{cursor: 'pointer'}}
                  onClick={() => this.addChapterClick()}
                  className={'blue-text'}>
                  {/*<Glyphicon glyph='plus' /> Add chapter*/}
                  <FaPlus /> Add chapter
                </div>
                {/* <div // Add google ads button */}
                {/* style={{cursor: 'pointer'}} */}
                {/* onClick={() => this.addGoogleAdClick()} */}
                {/* className={'blue-text'}> */}
                {/* <Glyphicon glyph='plus' /> Add Google ad */}
                {/* </div> */}
              </DockableDropTarget> : null
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
                ? <Image src={this.props.resource.metadata.data.volumeInfo.imageLinks.thumbnail.replace('http', 'https')} />
                : <FaImage /> }
                {/*: <Glyphicon glyph='picture' /> }*/}
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
        <Row>
          <Col sm={12} md={12}>
            { this.props.thread
              ? <Thread
                thread={this.props.thread}
                currentProfile={this.props.profile}
                onSubmitPost={(post) => { this.props.djedditActions.createPostWithRefreshThread(post, this.props.resource.thread) }}
                onSubmitEditPost={(post) => { this.props.djedditActions.updatePostWithRefreshThread(post, this.props.resource.thread) }}
                onDeletePost={(post) => { this.props.djedditActions.deletePostWithRefreshThread(post, this.props.resource.thread) }}
                changePostVote={this.props.djedditActions.changePostVote}
              /> : null }
          </Col>
        </Row>
      </Container>
    )
  }
}

TextBookResourceView.propTypes = {
  // actions
  djedditActions: PropTypes.shape({
    fetchThread: PropTypes.func.isRequired,
    createPostWithRefreshThread: PropTypes.func.isRequired,
    changePostVote: PropTypes.func.isRequired,
    updatePostWithRefreshThread: PropTypes.func.isRequired,
    deletePostWithRefreshThread: PropTypes.func.isRequired
  }),
  resourcesActions: PropTypes.shape({
    addProblem: PropTypes.func.isRequired,
    addChapter: PropTypes.func.isRequired,
    // updateChapter: PropTypes.func.isRequired,
    updateProblemReloadResource: PropTypes.func.isRequired,
    updateChapterReloadResource: PropTypes.func.isRequired,
    removeChapterReloadResource: PropTypes.func.isRequired,
    removeProblemReloadResource: PropTypes.func.isRequired
  }),
  profileActions: PropTypes.shape({
    fetchProfileMe: PropTypes.func.isRequired
  }),
  // data
  profile: PropTypes.object,
  resource: PropTypes.object,
  thread: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    resource: state.resources.resource,
    profile: state.profile.me,
    thread: state.djeddit.thread
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    resourcesActions: bindActionCreators(resourcesCreators, dispatch),
    djedditActions: bindActionCreators(djedditCreators, dispatch),
    profileActions: bindActionCreators(profileCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextBookResourceView)
export { TextBookResourceView as TextBookResourceViewNotConnected }
