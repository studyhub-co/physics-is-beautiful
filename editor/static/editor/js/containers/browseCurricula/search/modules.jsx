import React from 'react'

import PropTypes from 'prop-types'

import InfiniteScroll from 'react-infinite-scroller'

import { Container, Row, Col } from 'react-bootstrap'

import { connect } from 'react-redux'
import { loadSearchModules } from '../../../actions'
import { ModuleThumbnailPublic } from './../../../components/not_editor/module_thumbnail_public'

import { RingLoader } from 'react-spinners'

class ModulesSearchView extends React.Component {
  constructor (props) {
    super(props)
    this.doSearch = this.doSearch.bind(this)
    this.loadNextPage = this.loadNextPage.bind(this)

    this.state = {
      modules: [],
      hasMoreItems: false,
      nextHref: null
    }
  }

  componentWillReceiveProps (props) {
    if (this.props.selectedTab !== props.selectedTab && props.selectedTab === 'Modules') {
      this.props.loadSearchModules(this.props.searchString)
    }

    if (this.props.modulesSearchList !== props.modulesSearchList && props.modulesSearchList) {
      if (props.modulesSearchList.previous == null) {
      // 1st page
        this.setState({
          modules: props.modulesSearchList.results,
          hasMoreItems: Boolean(props.modulesSearchList.next),
          nextHref: props.modulesSearchList.next})
      } else {
      // add to list
        var newlist = [...this.state.modules, ...props.modulesSearchList.results]

        this.setState({
          modules: newlist,
          hasMoreItems: Boolean(props.modulesSearchList.next),
          nextHref: props.modulesSearchList.next})
      }
    }
  }

  loadNextPage (page) {
    if (this.state.hasMoreItems) {
      this.props.loadSearchModules(this.props.searchString, this.state.nextHref)
    }
  }

  doSearch () {
    this.props.loadSearchModules(this.props.searchString)
  }

  shouldComponentUpdate (nextProps, nextState) {
    return this.props.searchString === nextProps.searchString
  }

  render () {
    var items = []

    this.state.modules.map((module, i) => {
      items.push(
        <ModuleThumbnailPublic
          key={module.uuid}
          module={module} />
      )
    })

    return (<Container fluid>{this.props.modulesSearchList
      ? <div>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadNextPage}
          hasMore={this.state.hasMoreItems}
          loader={<div key={this.state.nextHref} style={{clear: 'both'}} />} // fix https://github.com/CassetteRocks/react-infinite-scroller/issues/14#issuecomment-225835845
        >
          <Row>
            {items}
          </Row>
        </InfiniteScroll>
        { this.props.modulesSearchList.results.length === 0 ? <h4>
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

ModulesSearchView.propTypes = {
  // actions
  loadSearchModules: PropTypes.func.isRequired,
  searchString: PropTypes.string,
  modulesSearchList: PropTypes.object,
  selectedTab: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    // curriculaSearchList: state.search.curricula,
    modulesSearchList: state.search.modules
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    loadSearchModules: (searchString, url) => dispatch(loadSearchModules(searchString, url)),
    loadPublicModules: () => dispatch(loadSearchModules())
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(ModulesSearchView)
export { ModulesSearchView as ModulesSearchViewNotConnected }
