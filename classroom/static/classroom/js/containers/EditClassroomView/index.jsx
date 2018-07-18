import React from 'react'

import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { PopupWindow } from '../../components/PopupWindow'

import * as classroomCreators from '../../actions/classroom'
import * as tabCreators from '../../actions/tab'

class EditClassroomView extends React.Component {
  componentWillMount () {
    this.props.tabActions.changeSelectedTab('teacher', 'tab', true)
  }
  // goToProtected () {
  //   this.props.dispatch(push('/protected'))
  // }

  render () {
    return (
      <PopupWindow>
        <div>Edit classroom</div>
      </PopupWindow>
    )
  }
}

EditClassroomView.propTypes = {
  tabActions: PropTypes.shape({
    changeSelectedTab: PropTypes.func.isRequired
  }).isRequired
  // tab: PropTypes.string
}
EditClassroomView.defaultProps = {
  // statusText: '',
  // userName: ''
}

const mapStateToProps = (state) => {
  return {
    // tab: state.tab.tab
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(classroomCreators, dispatch),
    tabActions: bindActionCreators(tabCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditClassroomView)
export { EditClassroomView as EditClassroomViewNotConnected }
