import React from 'react'

import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import history from '../../history'

import { PopupWindow } from '../../components/PopupWindow'

import * as classroomCreators from '../../actions/classroom'
import * as tabCreators from '../../actions/tab'

class EditClassroomView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      classRoomformValues: {
        name: ''
      }
    }
  }

  componentWillMount () {
    this.props.tabActions.changeSelectedTab('teacher', 'tab', true)
  }

  handleClassrromFormChange (e) {
    this.setState({'classRoomformValues': { [e.target.name]: e.target.value }})
  }

  saveClassroom (e) {
    e.preventDefault()
    const value = this.loginForm.getValue()
    if (value) {
      // this.props.actions.saveClassroom()
    }
  }

  render () {
    return (
      <PopupWindow goBack={history.goBack}>
        <form onSubmit={this.saveClassroom}>
          <div>Name of you classroom:</div>
          <div>
            <input type='text' name='name' value={this.state.value} onChange={this.handleClassrromFormChange} />
          </div>
        </form>
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
