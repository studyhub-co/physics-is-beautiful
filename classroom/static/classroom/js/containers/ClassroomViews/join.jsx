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

  // componentWillReceiveProps (props) {
  //   if(props.classroom && props.classroom){
  //     // redirect ro classroom page
  //
  //   }
  // }

  render () {
    return (
      <div className="pop-up-windows text-align-center">
        <div>Enter your teacher's classroom code below:</div>
        <form className="form-inline" onSubmit={this.joinClassroom}>
          <div>
            <input maxLength={'6'} type='text' name='name' className={'form-control input-sm'} onChange={this.handleCodeChange} />
          </div>
          {this.props.classroom === null
            ? <div className={'red-text'}>This code does not match any classroom.<br />
            Please double check what you typed</div> : null }
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
  }).isRequired,
  classroom: PropTypes.shape()
}

const mapStateToProps = (state) => {
  return {
    classroom: state.classroom.classroomClassroom
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    classroomActions: bindActionCreators(classroomCreators, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinClassroomView)
export { JoinClassroomView as EditClassroomViewNotConnected }
