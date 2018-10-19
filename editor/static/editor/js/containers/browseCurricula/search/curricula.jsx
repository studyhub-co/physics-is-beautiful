import React from 'react'

import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { loadSeacrhCurricula } from '../../../actions'
import { CurriculumThumbnailPublic } from './../../../components/curriculum_thumbnail_public'

class CurriculaSearchView extends React.Component {
  // constructor (props) {
  //   super(props)
  // }

  componentDidMount () {
    this.props.loadSeacrhCurricula(this.props.curriculaSearchString)
  }

  render () {
    return (<div>{this.props.curriculaSearchList
      ? this.props.curriculaSearchList.map(function (curriculum, i) {
        return <CurriculumThumbnailPublic
          key={curriculum.uuid}
          {...curriculum} />
      })
      : <span>Please wait</span>}</div>)
  }
}

CurriculaSearchView.propTypes = {
  // actions
  loadSeacrhCurricula: PropTypes.func.isRequired,
  curriculaSearchString: PropTypes.string,
  // curriculaSearchList: PropTypes.object # if pagination
  curriculaSearchList: PropTypes.array
}

const mapStateToProps = (state) => {
  return {
    curriculaSearchList: state.curricula.curriculaSearchList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    loadSeacrhCurricula: (curriculaSearchString) => dispatch(loadSeacrhCurricula(curriculaSearchString)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurriculaSearchView)
export { CurriculaSearchView as CurriculaSearchViewNotConnected }
