import React from 'react'

import PropTypes from 'prop-types'

import { Container, Row, Col } from 'react-bootstrap'

import InfiniteScroll from 'react-infinite-scroller'

import { connect } from 'react-redux'
import { loadSearchQuestions } from '../../../actions'

import { QuestionThumbnailPublic } from './../../../components/not_editor/question_thumbnail_public'

import { RingLoader } from 'react-spinners'

class QuestionsSearchView extends React.Component {
  constructor (props) {
    super(props)
    this.doSearch = this.doSearch.bind(this)
    this.loadNextPage = this.loadNextPage.bind(this)

    this.state = {
      questions: [],
      hasMoreItems: false,
      nextHref: null
    }
  }

  componentWillReceiveProps (props) {
    if (this.props.selectedTab !== props.selectedTab && props.selectedTab === 'Questions') {
      this.props.loadSearchQuestions(this.props.searchString)
    }

    if (this.props.questionsSearchList !== props.questionsSearchList && props.questionsSearchList) {
      if (props.questionsSearchList.previous == null) {
      // 1st page
        this.setState({
          questions: props.questionsSearchList.results,
          hasMoreItems: Boolean(props.questionsSearchList.next),
          nextHref: props.questionsSearchList.next})
      } else {
      // add to list
        var newlist = [...this.state.questions, ...props.questionsSearchList.results]

        this.setState({
          questions: newlist,
          hasMoreItems: Boolean(props.questionsSearchList.next),
          nextHref: props.questionsSearchList.next})
      }
    }
  }

  loadNextPage (page) {
    if (this.state.hasMoreItems) {
      this.props.loadSearchQuestions(this.props.searchString, this.state.nextHref)
    }
  }

  doSearch () {
    this.props.loadSearchQuestions(this.props.searchString)
  }

  shouldComponentUpdate (nextProps, nextState) {
    return this.props.searchString === nextProps.searchString
  }

  render () {
    var items = []

    this.state.questions.map((question, i) => {
      items.push(
        <QuestionThumbnailPublic
          key={question.uuid}
          question={question} />
      )
    })

    return (<Container fluid>{this.props.questionsSearchList
      ? <div>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadNextPage}
          hasMore={this.state.hasMoreItems}
          loader={<div key={this.state.nextHref} style={{clear: 'both'}} />} // fix https://github.com/CassetteRocks/react-infinite-scroller/issues/14#issuecomment-225835845
        >
          {items}
        </InfiniteScroll>
        { this.props.questionsSearchList.results.length === 0 ? <h4>
        Sorry, we couldn't find any results for this query.
        </h4> : null }
      </div>
      : <Row>
        <Col sm={12} md={12}>
          <div style={{height: '10rem', marginLeft: '50%'}}>
            <RingLoader
              color={'#1caff6'}
              loading={Boolean(true)}
            />
          </div>
        </Col>
      </Row> }
    </Container>
    )
  }
}

QuestionsSearchView.propTypes = {
  // actions
  loadSearchQuestions: PropTypes.func.isRequired,
  searchString: PropTypes.string,
  questionsSearchList: PropTypes.object,
  selectedTab: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    // curriculaSearchList: state.search.curricula,
    questionsSearchList: state.search.questions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    loadSearchQuestions: (searchString, url) => dispatch(loadSearchQuestions(searchString, url)),
    loadPublicQuestions: () => dispatch(loadSearchQuestions())
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(QuestionsSearchView)
export { QuestionsSearchView as QuestionsSearchViewNotConnected }
