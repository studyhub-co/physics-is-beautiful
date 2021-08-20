import React from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import InfiniteScroll from 'react-infinite-scroller'

import { loadSearchUnits } from '../../../../actions/studio'
import { UnitThumbnailPublic } from './../../components/unit_thumbnail_public'

import { RingLoader } from 'react-spinners'

class UnitsSearchView extends React.Component {
  constructor(props) {
    super(props)
    this.doSearch = this.doSearch.bind(this)
    this.loadNextPage = this.loadNextPage.bind(this)

    this.state = {
      units: [],
      hasMoreItems: false,
      nextHref: null,
    }
  }

  // deprecated TODO replace with componentDidUpdate
  componentWillReceiveProps(props) {
    if (
      this.props.selectedTab !== props.selectedTab &&
      props.selectedTab === 'Units'
    ) {
      this.props.loadSearchUnits(this.props.searchString)
    }
    if (
      this.props.unitsSearchList !== props.unitsSearchList &&
      props.unitsSearchList
    ) {
      if (props.unitsSearchList.previous == null) {
        // 1st page
        this.setState({
          units: props.unitsSearchList.results,
          hasMoreItems: Boolean(props.unitsSearchList.next),
          nextHref: props.unitsSearchList.next,
        })
      } else {
        // add to list
        var newlist = [...this.state.units, ...props.unitsSearchList.results]

        this.setState({
          units: newlist,
          hasMoreItems: Boolean(props.unitsSearchList.next),
          nextHref: props.unitsSearchList.next,
        })
      }
    }
  }

  doSearch() {
    this.props.loadSearchUnits(this.props.searchString)
  }

  loadNextPage(page) {
    if (this.state.hasMoreItems) {
      this.props.loadSearchUnits(this.props.searchString, this.state.nextHref)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.searchString === nextProps.searchString
  }

  render() {
    var items = []

    this.state.units.map((unit, i) => {
      items.push(<UnitThumbnailPublic key={unit.uuid} unit={unit} />)
    })

    return (
      <Container fluid>
        {this.props.unitsSearchList ? (
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
              <Row className="justify-content-around justify-content-md-start">
                {items}
              </Row>
            </InfiniteScroll>
            {this.props.unitsSearchList.results.length === 0 ? (
              <h4 style={{ padding: '1rem 0' }}>
                Sorry, we couldn&apos;t find any results for this query.
              </h4>
            ) : null}
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

UnitsSearchView.propTypes = {
  // actions
  loadSearchUnits: PropTypes.func.isRequired,
  searchString: PropTypes.string,
  unitsSearchList: PropTypes.object,
  selectedTab: PropTypes.string,
}

const mapStateToProps = state => {
  return {
    unitsSearchList: state.studio.search.units,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    loadSearchUnits: (unitSearchString, url) =>
      dispatch(loadSearchUnits(unitSearchString, url)),
    loadPublicUnits: () => dispatch(loadSearchUnits()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(UnitsSearchView)
export { UnitsSearchView as UnitsSearchViewNotConnected }
