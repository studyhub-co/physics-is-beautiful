import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { CurriculumRow } from '../components/CurriculumRow'

import * as curriculaCreators from '../actions/curricula'

class SelectCurriculum extends React.Component {
  componentWillMount () {
    // load curricula
    this.props.curriculaActions.curriculaFetchCurriculaList()
    // load other curricula
    this.props.curriculaActions.curriculaFetchOtherCurriculaList()
  }

  selectCurriculumUuid (curriculum) {
    this.setState({
      selectedCurriculumUuid: curriculum.uuid
    })
    this.props.selectedCurriculumChanged(curriculum)
  }

  render () {
    return (
      <div>
        <div>Select curriculum:</div>
        <div style={{color: 'rgb(8, 209, 255)'}}>My curricula</div>
        {this.props.curriculaList ? <div>{ this.props.curriculaList.map(function (curriculum, i) {
          return <div key={i} onClick={() => { this.selectCurriculumUuid(curriculum) }}>
            <CurriculumRow curriculum={curriculum} selectedUuid={this.props.selectedUuid} />
          </div>
        }, this)}
        </div> : null }
        <div className={'create-curriculum-button curriculum-card'} onClick={() => { window.open('/editor/', '_blank') }}>+ Create new curriculum</div>
        <div className={'blue-text'}>Physics is Beautiful curricula:</div>
        {this.props.curriculaOtherList ? <div>{ this.props.curriculaOtherList.map(function (curriculum, i) {
          return <div key={i} onClick={() => { this.selectCurriculumUuid(curriculum) }}>
            <CurriculumRow curriculum={curriculum} selectedUuid={this.props.selectedUuid} />
          </div>
        }, this)}
        </div> : null }
        <div className={'gray-text pointer'} onClick={() => { window.open('/editor/', '_blank') }}>Browse other curricula</div>
      </div>
    )
  }
}

SelectCurriculum.propTypes = {
  curriculaActions: PropTypes.shape({
    curriculaFetchCurriculaList: PropTypes.func.isRequired,
    curriculaFetchOtherCurriculaList: PropTypes.func.isRequired
  }).isRequired,
  curriculaList: PropTypes.array,
  curriculaOtherList: PropTypes.array,
  selectedCurriculumChanged: PropTypes.func,
  selectedUuid: PropTypes.any
}
SelectCurriculum.defaultProps = {
}

const mapStateToProps = (state) => {
  return {
    curriculaList: state.curricula.curriculaList,
    curriculaOtherList: state.curricula.curriculaOtherList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    curriculaActions: bindActionCreators(curriculaCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectCurriculum)
export { SelectCurriculum as SelectCurriculumNotConnected }
