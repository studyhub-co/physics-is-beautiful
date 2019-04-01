import React from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import { RingLoader } from 'react-spinners'

import InfiniteScroll from 'react-infinite-scroller'

import { loadSearchCurricula } from '../../../actions'
import { CurriculumThumbnailPublic } from './../../../components/not_editor/curriculum_thumbnail_public'

class CurriculaSearchView extends React.Component {
  constructor (props) {
    super(props)
    this.doSearch = this.doSearch.bind(this)
    this.loadNextPage = this.loadNextPage.bind(this)

    this.state = {
      curricula: [],
      hasMoreItems: false,
      nextHref: null
    }
  }

  componentDidMount () {
    this.props.loadSearchCurricula(this.props.curriculaSearchString)
  }

  componentWillReceiveProps (props) {
    if (this.props.selectedTab !== props.selectedTab && props.selectedTab === 'Curricula') {
      this.props.loadSearchCurricula(this.props.searchString)
    }

    if (this.props.curriculaSearchList !== props.curriculaSearchList && props.curriculaSearchList) {
      if (props.curriculaSearchList.previous == null) {
      // 1st page
        this.setState({
          curricula: props.curriculaSearchList.results,
          hasMoreItems: Boolean(props.curriculaSearchList.next),
          nextHref: props.curriculaSearchList.next})
      } else {
      // add to list
        var newlist = [...this.state.curricula, ...props.curriculaSearchList.results]

        this.setState({
          curricula: newlist,
          hasMoreItems: Boolean(props.curriculaSearchList.next),
          nextHref: props.curriculaSearchList.next})
      }
    }
  }

  loadNextPage (page) {
    if (this.state.hasMoreItems) {
      this.props.loadSearchCurricula(this.props.searchString, this.state.nextHref)
    }
  }

  doSearch () {
    this.props.loadSearchCurricula(this.props.curriculaSearchString)
  }

  render () {
    var items = []

    this.state.curricula.map((curriculum, i) => {
      items.push(
        <CurriculumThumbnailPublic
          key={curriculum.uuid}
          curriculum={curriculum} />
      )
    })

    return (<Container fluid>{this.props.curriculaSearchList
      ? <div>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadNextPage}
          hasMore={this.state.hasMoreItems}
          loader={<div key={this.state.nextHref} style={{clear: 'both'}} />} // fix https://github.com/CassetteRocks/react-infinite-scroller/issues/14#issuecomment-225835845
        >
          {items}
        </InfiniteScroll>
        { this.props.curriculaSearchList.results.length === 0 ? <h4>
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

CurriculaSearchView.propTypes = {
  // actions
  loadSearchCurricula: PropTypes.func.isRequired,
  curriculaSearchString: PropTypes.string,
  curriculaSearchList: PropTypes.object, // if pagination
  // curriculaSearchList: PropTypes.array
  searchString: PropTypes.string,
  lessonsSearchList: PropTypes.object,
  selectedTab: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    curriculaSearchList: state.search.curricula
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    loadSearchCurricula: (curriculaSearchString, url) => dispatch(loadSearchCurricula(curriculaSearchString, url)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(CurriculaSearchView)
export { CurriculaSearchView as CurriculaSearchViewNotConnected }
