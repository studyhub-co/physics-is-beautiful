import React from 'react'

import PropTypes from 'prop-types'

import { Grid, Row, Col } from 'react-bootstrap'

import { connect } from 'react-redux'
import { loadSeacrhCurricula } from '../../../actions'
import { CurriculumThumbnailPublic } from './../../../components/not_editor/curriculum_thumbnail_public'

import { RingLoader } from 'react-spinners'

class CurriculaSearchView extends React.Component {
  constructor (props) {
    super(props)
    this.doSearch = this.doSearch.bind(this)
  }

  componentDidMount () {
    this.props.loadSeacrhCurricula(this.props.curriculaSearchString)
  }

  doSearch () {
    this.props.loadSeacrhCurricula(this.props.curriculaSearchString)
  }

  render () {
    return (<Grid fluid>{this.props.curriculaSearchList
      ? <div> {
        this.props.curriculaSearchList.results.map(function (curriculum, i) {
          return <CurriculumThumbnailPublic
            key={curriculum.uuid}
            curriculum={curriculum} />
        })}
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
    </Grid>
    )
  }
}

CurriculaSearchView.propTypes = {
  // actions
  loadSeacrhCurricula: PropTypes.func.isRequired,
  curriculaSearchString: PropTypes.string,
  curriculaSearchList: PropTypes.object // if pagination
  //curriculaSearchList: PropTypes.array
}

const mapStateToProps = (state) => {
  return {
    curriculaSearchList: state.search.curricula
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    loadSeacrhCurricula: (curriculaSearchString) => dispatch(loadSeacrhCurricula(curriculaSearchString)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(CurriculaSearchView)
export { CurriculaSearchView as CurriculaSearchViewNotConnected }
