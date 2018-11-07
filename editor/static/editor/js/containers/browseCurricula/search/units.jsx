import React from 'react'

import PropTypes from 'prop-types'

import { Grid, Row, Col } from 'react-bootstrap'

import { connect } from 'react-redux'
import { loadSeacrhCurricula } from '../../../actions'
import { CurriculumThumbnailPublic } from './../../../components/not_editor/curriculum_thumbnail_public'

import { RingLoader } from 'react-spinners'

class UnitsSearchView extends React.Component {
  constructor (props) {
    super(props)
    this.doSearch = this.doSearch.bind(this)
  }

  componentDidMount () {
    // this.props.loadSeacrhCurricula(this.props.curriculaSearchString)
  }

  doSearch () {
    // this.props.loadSeacrhCurricula(this.props.curriculaSearchString)
  }

  render () {
    return (<Grid fluid>{this.props.unitsSearchList
      ? this.props.unitsSearchList.results.map(function (unit, i) {
        return <CurriculumThumbnailPublic
          key={curriculum.uuid}
          curriculum={curriculum} />
      })
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
  loadSeacrhCurricula: PropTypes.func.isRequired,
  curriculaSearchString: PropTypes.string,
  // curriculaSearchList: PropTypes.object # if pagination
  curriculaSearchList: PropTypes.array
}

const mapStateToProps = (state) => {
  return {
    curriculaSearchList: state.search.curricula,
    unitsSearchList: state.search.units
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    loadSeacrhUnits: (unitSearchString) => dispatch(loadSearchUnits(unitSearchString)),
    loadPublicUnits: () => dispatch(loadPublicUnits())
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(UnitsSearchView)
export { UnitsSearchView as UnitsSearchViewNotConnected }
