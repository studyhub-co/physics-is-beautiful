import React from 'react'

import PropTypes from 'prop-types'

import { Container, Row, Col } from 'react-bootstrap'

import InfiniteScroll from 'react-infinite-scroller'

import { connect } from 'react-redux'
import { loadSearchLessons } from '../../../actions'
import { LessonThumbnailPublic } from './../../../components/not_editor/lesson_thumbnail_public'

import { RingLoader } from 'react-spinners'

class LessonsSearchView extends React.Component {
  constructor (props) {
    super(props)
    this.doSearch = this.doSearch.bind(this)
    this.loadNextPage = this.loadNextPage.bind(this)

    this.state = {
      lessons: [],
      hasMoreItems: false,
      nextHref: null
    }
  }

  componentWillReceiveProps (props) {
    if (this.props.selectedTab !== props.selectedTab && props.selectedTab === 'Lessons') {
      this.props.loadSearchLessons(this.props.searchString)
    }

    if (this.props.lessonsSearchList !== props.lessonsSearchList && props.lessonsSearchList) {
      if (props.lessonsSearchList.previous == null) {
      // 1st page
        this.setState({
          lessons: props.lessonsSearchList.results,
          hasMoreItems: Boolean(props.lessonsSearchList.next),
          nextHref: props.lessonsSearchList.next})
      } else {
      // add to list
        var newlist = [...this.state.lessons, ...props.lessonsSearchList.results]

        this.setState({
          lessons: newlist,
          hasMoreItems: Boolean(props.lessonsSearchList.next),
          nextHref: props.lessonsSearchList.next})
      }
    }
  }

  loadNextPage (page) {
    if (this.state.hasMoreItems) {
      this.props.loadSearchLessons(this.props.searchString, this.state.nextHref)
    }
  }

  doSearch () {
    this.props.loadSearchLessons(this.props.searchString)
  }

  shouldComponentUpdate (nextProps, nextState) {
    return this.props.searchString === nextProps.searchString
  }

  render () {
    var items = []

    this.state.lessons.map((lesson, i) => {
      items.push(
        <LessonThumbnailPublic
          key={lesson.uuid}
          lesson={lesson} />
      )
    })

    return (<Container fluid>{this.props.lessonsSearchList
      ? <div>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadNextPage}
          hasMore={this.state.hasMoreItems}
          loader={<div key={this.state.nextHref} style={{clear: 'both'}} />} // fix https://github.com/CassetteRocks/react-infinite-scroller/issues/14#issuecomment-225835845
        >
          {items}
        </InfiniteScroll>
        { this.props.lessonsSearchList.results.length === 0 ? <h4>
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

LessonsSearchView.propTypes = {
  // actions
  loadSearchLessons: PropTypes.func.isRequired,
  searchString: PropTypes.string,
  lessonsSearchList: PropTypes.object,
  selectedTab: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    // curriculaSearchList: state.search.curricula,
    lessonsSearchList: state.search.lessons
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    loadSearchLessons: (searchString, url) => dispatch(loadSearchLessons(searchString, url)),
    loadPublicLessons: () => dispatch(loadSearchLessons())
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(LessonsSearchView)
export { LessonsSearchView as LessonsSearchViewNotConnected }
