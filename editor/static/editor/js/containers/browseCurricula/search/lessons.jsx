import React from 'react'

import PropTypes from 'prop-types'

import { Grid, Row, Col } from 'react-bootstrap'

import { connect } from 'react-redux'
import { loadSearchLessons } from '../../../actions'
import { UnitThumbnailPublic } from './../../../components/not_editor/unit_thumbnail_public'

import { RingLoader } from 'react-spinners'

class LessonsSearchView extends React.Component {
  constructor (props) {
    super(props)
    this.doSearch = this.doSearch.bind(this)
  }

  componentWillReceiveProps (props) {
    if (this.props.selectedTab !== props.selectedTab && props.selectedTab === 'Lessons') {
      this.props.loadSearchLessons(this.props.searchString)
    }
  }

  doSearch () {
    this.props.loadSearchLessons(this.props.searchString)
  }

  render () {
    return (<Grid fluid>{this.props.lessonsSearchList
      ? <div> { this.props.lessonsSearchList.results.map(function (unit, i) {
        return <UnitThumbnailPublic
          key={unit.uuid}
          unit={unit} />
      })}
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
    </Grid>
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
    loadSearchLessons: (searchString) => dispatch(loadSearchLessons(searchString)),
    loadPublicLessons: () => dispatch(loadSearchLessons())
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(LessonsSearchView)
export { LessonsSearchView as LessonsSearchViewNotConnected }
