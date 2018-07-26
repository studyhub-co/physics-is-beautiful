import React from 'react'

import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'

import * as classroomCreators from '../../actions/classroom'

import { connect } from 'react-redux'

class JoinClassroomView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      code: '',
      codeIsValid: false
    }
    this.handleCodeChange = this.handleCodeChange.bind(this)
    this.joinClassroom = this.joinClassroom.bind(this)
  }

  joinClassroom (e) {
    e.preventDefault()
    if (this.state.codeIsValid) {
      this.props.classroomActions.classroomJoinClassroom(this.state.code)
    }
  }

  validateCode () {
    if (this.state.code && this.state.code.length ===  6) {
      this.setState({'codeIsValid': true})
    } else {
      this.setState({'codeIsValid': false})
    }
  }

  handleCodeChange (e) {
    this.setState({'code': e.target.value},
      this.validateCode
    )
  }

  render () {
    return (
      <div className="pop-up-windows">
        Enter your teacher's classroom code below:
        <form className="form-inline" onSubmit={this.joinClassroom}>
          <div>
            <input maxLength={'6'} type='text' name='name' className={'form-control input-sm'} onChange={this.handleCodeChange} />
          </div>
          <button disabled={!this.state.codeIsValid}
            className={'classroom-common-button' + (this.state.codeIsValid ? '' : ' disabled-button')}
            type='submit'>
            Join classroom
          </button>
        </form>
      </div>
    )
  }
}

JoinClassroomView.propTypes = {
  classroomActions: PropTypes.shape({
    classroomJoinClassroom: PropTypes.func.isRequired
  }).isRequired
}

const mapStateToProps = (state) => {
  return {
    classroom: state.classroom.classroom
    // tab: state.tab.tab
    // curriculaList: state.curricula.curriculaList,
    // curriculaOtherList: state.curricula.curriculaOtherList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    classroomActions: bindActionCreators(classroomCreators, dispatch),
    // tabActions: bindActionCreators(tabCreators, dispatch),
    // curriculaActions: bindActionCreators(curriculaCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinClassroomView)
export { JoinClassroomView as EditClassroomViewNotConnected }
