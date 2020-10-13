import React from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import { RingLoader } from 'react-spinners'

import InfiniteScroll from 'react-infinite-scroller'

import { loadSearchCourses } from '../../../../actions/studio'
import CourseThumbnailPublic from '../../components/course_thumbnail_public'

class CoursesSearchView extends React.Component {
  constructor (props) {
    super(props)
    this.doSearch = this.doSearch.bind(this)
    this.loadNextPage = this.loadNextPage.bind(this)

    this.state = {
      courses: [],
      hasMoreItems: false,
      nextHref: null
    }
  }

  componentDidMount () {
    this.props.loadSearchCourses(this.props.coursesSearchString)
  }

  componentWillReceiveProps (props) {
    if (this.props.selectedTab !== props.selectedTab && props.selectedTab === 'Courses') {
      this.props.loadSearchCourses(this.props.searchString)
    }

    if (this.props.coursesSearchList !== props.coursesSearchList && props.coursesSearchList) {
      if (props.coursesSearchList.previous == null) {
      // 1st page
        this.setState({
          courses: props.coursesSearchList.results,
          hasMoreItems: Boolean(props.coursesSearchList.next),
          nextHref: props.coursesSearchList.next})
      } else {
      // add to list
        var newlist = [...this.state.courses, ...props.coursesSearchList.results]

        this.setState({
          courses: newlist,
          hasMoreItems: Boolean(props.coursesSearchList.next),
          nextHref: props.coursesSearchList.next})
      }
    }
  }

  loadNextPage (page) {
    if (this.state.hasMoreItems) {
      this.props.loadSearchCourses(this.props.searchString, this.state.nextHref)
    }
  }

  doSearch () {
    this.props.loadSearchCourses(this.props.coursesSearchString)
  }

  render () {
    var items = []

    this.state.courses.map((course, i) => {
      items.push(
        <CourseThumbnailPublic
          key={course.uuid}
          course={course} />
      )
    })

    return (<Container fluid>{this.props.coursesSearchList
      ? <div>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadNextPage}
          hasMore={this.state.hasMoreItems}
          loader={<div key={this.state.nextHref} style={{clear: 'both'}} />} // fix https://github.com/CassetteRocks/react-infinite-scroller/issues/14#issuecomment-225835845
        >
          {items}
        </InfiniteScroll>
        { this.props.coursesSearchList.results.length === 0 ? <h4>
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

CoursesSearchView.propTypes = {
  // actions
  loadSearchCourses: PropTypes.func.isRequired,
  coursesSearchString: PropTypes.string,
  coursesSearchList: PropTypes.object, // if pagination
  // coursesSearchList: PropTypes.array
  searchString: PropTypes.string,
  lessonsSearchList: PropTypes.object,
  selectedTab: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    coursesSearchList: state.studio.search.courses
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    loadSearchCourses: (coursesSearchString, url) => dispatch(loadSearchCourses(coursesSearchString, url)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(CoursesSearchView)
export { CoursesSearchView as CoursesSearchViewNotConnected }
