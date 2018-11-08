import React from 'react'

import PropTypes from 'prop-types'

import { Grid, Row, Col } from 'react-bootstrap'

import { connect } from 'react-redux'
import { loadSearchModules } from '../../../actions'
import { UnitThumbnailPublic } from './../../../components/not_editor/unit_thumbnail_public'

import { RingLoader } from 'react-spinners'

class ModulesSearchView extends React.Component {
  constructor (props) {
    super(props)
    this.doSearch = this.doSearch.bind(this)
  }

  componentWillReceiveProps (props) {
    if (this.props.selectedTab !== props.selectedTab && props.selectedTab === 'Modules') {
      this.props.loadSearchModules(this.props.searchString)
    }
  }

  doSearch () {
    this.props.loadSearchModules(this.props.searchString)
  }

  render () {
    return (<Grid fluid>{this.props.modulesSearchList
      ? <div> { this.props.modulesSearchList.results.map(function (unit, i) {
        return <UnitThumbnailPublic
          key={unit.uuid}
          unit={unit} />
      })}
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
    </Grid>
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
    loadSearchModules: (searchString) => dispatch(loadSearchModules(searchString)),
    loadPublicModules: () => dispatch(loadSearchModules())
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(ModulesSearchView)
export { ModulesSearchView as ModulesSearchViewNotConnected }
