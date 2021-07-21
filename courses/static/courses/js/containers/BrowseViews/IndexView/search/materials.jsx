import React from 'react'

import PropTypes from 'prop-types'

import { Container, Row, Col } from 'react-bootstrap'

import InfiniteScroll from 'react-infinite-scroller'

import { connect } from 'react-redux'
import { loadSearchMaterials } from '../../../../actions/studio'

import { MaterialThumbnailPublic } from '../../components/material_thumbnail_public'

import { RingLoader } from 'react-spinners'

class MaterialsSearchView extends React.Component {
  constructor(props) {
    super(props)
    this.doSearch = this.doSearch.bind(this)
    this.loadNextPage = this.loadNextPage.bind(this)

    this.state = {
      materials: [],
      hasMoreItems: false,
      nextHref: null,
    }
  }

  // deprecated TODO replace with componentDidUpdate
  componentWillReceiveProps(props) {
    if (
      this.props.selectedTab !== props.selectedTab &&
      props.selectedTab === 'Materials'
    ) {
      this.props.loadSearchMaterials(this.props.searchString)
    }

    if (
      this.props.materialsSearchList !== props.materialsSearchList &&
      props.materialsSearchList
    ) {
      if (props.materialsSearchList.previous == null) {
        // 1st page
        this.setState({
          materials: props.materialsSearchList.results,
          hasMoreItems: Boolean(props.materialsSearchList.next),
          nextHref: props.materialsSearchList.next,
        })
      } else {
        // add to list
        var newlist = [
          ...this.state.materials,
          ...props.materialsSearchList.results,
        ]

        this.setState({
          materials: newlist,
          hasMoreItems: Boolean(props.materialsSearchList.next),
          nextHref: props.materialsSearchList.next,
        })
      }
    }
  }

  loadNextPage(page) {
    if (this.state.hasMoreItems) {
      this.props.loadSearchMaterials(
        this.props.searchString,
        this.state.nextHref,
      )
    }
  }

  doSearch() {
    this.props.loadSearchMaterials(this.props.searchString)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.searchString === nextProps.searchString
  }

  render() {
    var items = []

    this.state.materials.map((material, i) => {
      items.push(
        <MaterialThumbnailPublic key={material.uuid} material={material} />,
      )
    })

    return (
      <Container fluid>
        {this.props.materialsSearchList ? (
          <div>
            <InfiniteScroll
              pageStart={0}
              loadMore={this.loadNextPage}
              hasMore={this.state.hasMoreItems}
              style={{ display: 'flex', flexWrap: 'wrap' }}
              loader={
                <div key={this.state.nextHref} style={{ clear: 'both' }} />
              } // fix https://github.com/CassetteRocks/react-infinite-scroller/issues/14#issuecomment-225835845
            >
              {items}
            </InfiniteScroll>
            {this.props.materialsSearchList.results.length === 0 && (
              <h4 style={{ padding: '1rem 0' }}>
                Sorry, we couldn&apos;t find any results for this query.
              </h4>
            )}
          </div>
        ) : (
          <Row>
            <Col sm={12} md={12}>
              <div style={{ height: '10rem', marginLeft: '50%' }}>
                <RingLoader color={'#1caff6'} loading={Boolean(true)} />
              </div>
            </Col>
          </Row>
        )}
      </Container>
    )
  }
}

MaterialsSearchView.propTypes = {
  // actions
  loadSearchMaterials: PropTypes.func.isRequired,
  searchString: PropTypes.string,
  materialsSearchList: PropTypes.object,
  selectedTab: PropTypes.string,
}

const mapStateToProps = state => {
  return {
    materialsSearchList: state.studio.search.materials,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    loadSearchMaterials: (searchString, url) =>
      dispatch(loadSearchMaterials(searchString, url)),
    loadPublicMaterials: () => dispatch(loadSearchMaterials()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(MaterialsSearchView)
export { MaterialsSearchView as MaterialsSearchViewNotConnected }
