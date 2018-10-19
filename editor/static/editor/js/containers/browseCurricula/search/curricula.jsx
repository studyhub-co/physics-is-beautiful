import React from 'react'

import PropTypes from 'prop-types'

import { connect } from 'react-redux'

class CurriculaSearchView extends React.Component {
  render () {
    return (<div>results</div>)
  }
}

CurriculaSearchView.propTypes = {
  curriculaSearchList: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    curriculaSearchList: state.curricula.curriculaSearchList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurriculaSearchView)
export { CurriculaSearchView as CurriculaSearchViewNotConnected }
