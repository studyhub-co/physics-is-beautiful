import React from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Container, Row } from 'react-bootstrap'

import history from '../../../history'
import { BASE_URL } from '../../../utils/config'

import { loadCourses, addCourse } from '../../../actions/studio'

import CourseThumbnail from './components/course_thumbnail'
import AddCourseButton from './components/add_course_button'

class IndexView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {prototypeChoice: null}
    this.handlePrototypeChoiceChange = this.handlePrototypeChoiceChange.bind(this)
    this.handleAddClick = this.handleAddClick.bind(this)
  }

  componentDidMount () {
    this.props.onMounted()
  }

  handlePrototypeChoiceChange (e) {
    this.setState({prototypeChoice: e.target.value})
  }

  handleAddClick () {
    this.props.onAddClick(this.state.prototypeChoice)
  }

  render () {
    const courses = []
    for (var uuid in this.props.courses) {
      courses.push(
        <CourseThumbnail
          key={uuid}
          {...this.props.courses[uuid]}
          addCourse={this.props.onAddClick.bind(null, uuid)}
          onEditCourseProfileClick={this.props.onEditCourseProfileClick.bind(null, uuid)}
          onDeleteCourseClick={this.props.onDeleteCourseClick.bind(null, uuid)}
          onClick={this.props.onCourseClick.bind(null, uuid)} />
      )
    }

    // const prototypeChoices = []
    // for (var i in this.props.allCourses.results) {
    //   prototypeChoices.push(
    //     <option
    //       key={this.props.allCourses.results[i].uuid}
    //       value={this.props.allCourses.results[i].uuid}>
    //       {this.props.allCourses.results[i].name + ' by ' + this.props.allCourses.results[i].author.display_name}
    //     </option>
    //   )
    // }

    return (
      <div>
        <div className='row'>
          <Container fluid>
            <Row>
              {courses}
              <AddCourseButton onClick={this.handleAddClick} />
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}

IndexView.propTypes = {
  onMounted: PropTypes.func.isRequired,
  onAddClick: PropTypes.func.isRequired,
  onCourseClick: PropTypes.func.isRequired,
  allCourses: PropTypes.object,
  courses: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    course: state.studio.course,
    courses: state.studio.courses,
    allCourses: state.studio.allCourses
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    onAddClick: prototype => dispatch(addCourse(prototype)),
    onMounted: () => dispatch(loadCourses()),
    onCourseClick: (uuid) => { history.push(BASE_URL + 'studio/editor/courses/' + uuid + '/') }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexView)
export { IndexView as IndexViewNotConnected }
