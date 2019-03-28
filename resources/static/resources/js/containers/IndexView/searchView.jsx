import React from 'react'

import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import InfiniteScroll from 'react-infinite-scroller'
import { RingLoader } from 'react-spinners'

import * as resourcesCreators from '../../actions/resources'
import ResourceThumbnail from '../../components/resourceThumbnail'

class ResourceSearchView extends React.Component {
  constructor (props) {
    super(props)
    this.doSearch = this.doSearch.bind(this)
    this.loadNextPage = this.loadNextPage.bind(this)

    this.state = {
      resources: [],
      hasMoreItems: false,
      nextHref: null
    }
  }

  componentDidMount () {
    this.props.resourcesActions.loadSearchResources(this.props.resourceSearchString)
  }

  componentWillReceiveProps (props) {
    if (props.resourceSearchList) {
      if (props.resourceSearchList.previous == null) {
        // 1st page
        this.setState({
          resources: props.resourceSearchList.results,
          hasMoreItems: Boolean(props.resourceSearchList.next),
          nextHref: props.resourceSearchList.next
        })
      } else {
        // add to list
        var newlist = [...this.state.resources, ...props.resourceSearchList.results]

        this.setState({
          resources: newlist,
          hasMoreItems: Boolean(props.resourceSearchList.next),
          nextHref: props.resourceSearchList.next
        })
      }
    }
  }

  loadNextPage (page) {
    if (this.state.hasMoreItems) {
      this.props.resourcesActions.loadSearchResources(this.props.resourceSearchString, this.state.nextHref)
    }
  }

  doSearch () {
    this.props.resourcesActions.loadSearchResources(this.props.resourceSearchString)
  }

  render () {
    var items = []
    this.state.resources.map((resource, i) => {
      items.push(
        <div key={resource.uuid} style={{float: 'left'}}>
          <ResourceThumbnail resource={resource} />
        </div>
      )
    })

    return (<Container fluid>{this.props.resourceSearchList
      ? <div>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadNextPage}
          hasMore={this.state.hasMoreItems}
          loader={<div key={this.state.nextHref} style={{clear: 'both'}} />} // fix https://github.com/CassetteRocks/react-infinite-scroller/issues/14#issuecomment-225835845
        >
          {items}
        </InfiniteScroll>
        { this.props.resourceSearchList.results.length === 0 ? <h4>
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

ResourceSearchView.propTypes = {
  // actions
  resourcesActions: PropTypes.shape({
    loadSearchResources: PropTypes.func.isRequired
  }),
  // data
  searchString: PropTypes.string,
  resourceSearchString: PropTypes.string,
  resourceSearchList: PropTypes.object, // if pagination
  // dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    resourceSearchList: state.resources.resourceSearchList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    resourcesActions: bindActionCreators(resourcesCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(ResourceSearchView)
export { ResourceSearchView as ResourceSearchViewNotConnected }
