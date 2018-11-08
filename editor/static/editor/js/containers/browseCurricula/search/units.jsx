import React from 'react'

import PropTypes from 'prop-types'

import { Grid, Row, Col } from 'react-bootstrap'

import { connect } from 'react-redux'
import { loadSearchUnits } from '../../../actions'
import { UnitThumbnailPublic } from './../../../components/not_editor/unit_thumbnail_public'

import { RingLoader } from 'react-spinners'

class UnitsSearchView extends React.Component {
  constructor (props) {
    super(props)
    this.doSearch = this.doSearch.bind(this)
  }

  componentDidMount () {
    // this.props.loadSearchUnits(this.props.searchString)
  }

  componentWillReceiveProps (props) {
    // TODO refresh units if Untis tab
  }

  doSearch () {
    this.props.loadSearchUnits(this.props.searchString)
  }

  render () {
    return (<Grid fluid>{this.props.unitsSearchList
      ? <div> { this.props.unitsSearchList.results.map(function (unit, i) {
        return <UnitThumbnailPublic
          key={unit.uuid}
          unit={unit} />
      })}
      { this.props.unitsSearchList.results.length === 0 ? <h4>
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

UnitsSearchView.propTypes = {
  // actions
  loadSearchUnits: PropTypes.func.isRequired,
  searchString: PropTypes.string,
  unitsSearchList: PropTypes.object,
  selectedTab: PropTypes.string,
}

const mapStateToProps = (state) => {
  return {
    // curriculaSearchList: state.search.curricula,
    unitsSearchList: state.search.units
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    loadSearchUnits: (unitSearchString) => dispatch(loadSearchUnits(unitSearchString)),
    loadPublicUnits: () => dispatch(loadSearchUnits())
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(UnitsSearchView)
export { UnitsSearchView as UnitsSearchViewNotConnected }
