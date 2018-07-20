import React from 'react'

import { connect } from 'react-redux'

class SettingsClassroomView extends React.Component {

}

const mapStateToProps = (state) => {
  return {
    // tab: state.tab.tab
    curriculaList: state.curricula.curriculaList,
    curriculaOtherList: state.curricula.curriculaOtherList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    // classroomActions: bindActionCreators(classroomCreators, dispatch),
    // tabActions: bindActionCreators(tabCreators, dispatch),
    // curriculaActions: bindActionCreators(curriculaCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsClassroomView)
export { SettingsClassroomView as EditClassroomViewNotConnected }