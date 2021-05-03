import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { CourseRow } from '../components/CourseRow'

// import * as coursesCreators from '../actions/courses'
import * as coursesCreators from '../actions/courses'

class SelectCourse extends React.Component {
  componentWillMount () {
    // load courses
    this.props.coursesActions.coursesFetchCoursesList()
    // load other courses
    this.props.coursesActions.coursesFetchOtherCoursesList()
  }

  selectCourseUuid (course) {
    this.setState({
      selectedCourseUuid: course.uuid
    })
    this.props.selectedCourseChanged(course)
  }

  render () {
    return (
      <div>
        <div>Select course:</div>
        <div style={{color: 'rgb(8, 209, 255)'}}>My courses</div>
        {this.props.coursesList ? <div>{ this.props.coursesList.map(function (course, i) {
          return <div key={i} onClick={() => { this.selectCourseUuid(course) }}>
            <CourseRow course={course} selectedUuid={this.props.selectedUuid} />
          </div>
        }, this)}
        </div> : null }
        <div
          className={'create-curriculum-button curriculum-card'}
          onClick={() => { window.open('/studio/editor/', '_self') }}>+ Create new course</div>
        <div className={'blue-text'}>Physics is Beautiful courses</div>
        {this.props.coursesOtherList ? <div>{ this.props.coursesOtherList.map(function (course, i) {
          return <div key={i} onClick={() => { this.selectCourseUuid(course) }}>
            <CourseRow course={course} selectedUuid={this.props.selectedUuid} />
          </div>
        }, this)}
        </div> : null }
        {/* TODO must url must be open in the same browserwindow */}
        <div className={'gray-text pointer'} onClick={() => { window.open('/browse/', '_self') }}>Browse other courses</div>
      </div>
    )
  }
}

SelectCourse.propTypes = {
  // coursesActions: PropTypes.shape({
  //   coursesFetchCoursesList: PropTypes.func.isRequired,
  //   coursesFetchOtherCoursesList: PropTypes.func.isRequired
  // }).isRequired,
  courseActions: PropTypes.shape({
    courseFetchCoursesList: PropTypes.func.isRequired,
    courseFetchOtherCoursesList: PropTypes.func.isRequired
  }).isRequired,
  // coursesList: PropTypes.array,
  // coursesOtherList: PropTypes.array,
  // selectedCourseChanged: PropTypes.func,
  coursesList: PropTypes.array,
  coursesOtherList: PropTypes.array,
  selectedCourseChanged: PropTypes.func,
  selectedUuid: PropTypes.any
}
SelectCourse.defaultProps = {
}

const mapStateToProps = (state) => {
  return {
    // coursesList: state.courses.coursesList,
    // coursesOtherList: state.courses.coursesOtherList,
    coursesList: state.courses.coursesList,
    coursesOtherList: state.courses.coursesOtherList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    // coursesActions: bindActionCreators(coursesCreators, dispatch)
    coursesActions: bindActionCreators(coursesCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectCourse)
export { SelectCourse as SelectCourseNotConnected }
