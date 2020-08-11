import React from 'react'

import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { Dropdown } from 'react-bootstrap'
import { RingLoader } from 'react-spinners'
import copy from 'copy-to-clipboard'
import {
  FaEllipsisV, FaGraduationCap, FaInfoCircle, FaCodeBranch, FaShareAlt,
  FaMinus, FaPlus
} from 'react-icons/fa'

import history from '../../../history'
import {
  addCourse, addCourseToDashboard, loadSearchCourses, removeCourseFromDashboard
} from '../../../actions/studio'
import { Thumbnail } from '../../../components/thumbnail'
import { Overlay } from '../../../components/fullscreen_overlay'
import { connect } from 'react-redux'
import { BASE_URL } from '../../../utils/config'

class CourseThumbnailPublic extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.onTitleClick = this.onTitleClick.bind(this)
    this.onLearnSelect = this.onLearnSelect.bind(this)
    this.onViewProfileSelect = this.onViewProfileSelect.bind(this)
    this.onForkSelect = this.onForkSelect.bind(this)
    this.onCopyShareableLink = this.onCopyShareableLink.bind(this)
    this.onAddToDashboardSelect = this.onAddToDashboardSelect.bind(this)
    this.onRemoveFromDashboardSelect = this.onRemoveFromDashboardSelect.bind(this)
    this.state = {showSpinnerOverlay: false}

    this.CourseMenuToggle = React.forwardRef(({ children, onClick }, ref) => {
      return (
        <span
          ref={ref}
          onClick={(e) => {
            e.preventDefault()
            onClick(e)
          }}
          style={{
            padding: '1rem',
            cursor: 'pointer'
          }}>
          {children}
        </span>
      )
    })
  }

  onLearnSelect () {
    history.push('/courses/' + this.props.course.uuid + '/', '_self')
  }

  onViewProfileSelect () {
    history.push('/courses/profile/' + this.props.course.uuid + '/')
  }

  onTitleClick () {
    history.push('/courses/' + this.props.course.uuid + '/', '_self')
  }

  onCopyShareableLink (e) {
    // todo it's beter to replace with history's generated url here
    copy(window.location.origin + BASE_URL + 'courses/' + this.props.course.uuid + '/')
  }

  onAddToDashboardSelect (e) {
    console.log(this.props)
    this.props.addCourseToDashboard(this.props.course.uuid)
    if (this.props.slidesListName !== 'recentSlides') {
      this.props.onAddRemoveFromDashboardSildes('add', this.props.course)
    }
  }

  onRemoveFromDashboardSelect (e) {
    this.props.removeCourseFromDashboard(this.props.course.uuid)
    if (this.props.slidesListName === 'recentSlides') {
      this.props.onAddRemoveFromDashboardSildes('remove', this.props.course)
    }
  }

  onForkSelect (e) {
    this.setState({showSpinnerOverlay: true})
    this.props.addCourse(this.props.course.uuid)
  }

  render () {
    // set spinner
    const spinner = <Overlay>
      <div className='overlay-wrapper'>
        <div className='overlay-inner'>
          <RingLoader
            color={'#1caff6'}
            loading={Boolean(true)}
          />
        </div>
      </div>
    </Overlay>

    // neeed react >= 16
    // fix issue https://github.com/akiran/react-slick/issues/757 by append Dropdown.Menu to the react app DOM element
    const DropdownMenu = () =>
      ReactDOM.createPortal(
        <Dropdown.Menu rootCloseEvent={'mousedown'}>
          <Dropdown.Item onSelect={this.onLearnSelect} eventKey='1'>
            <FaGraduationCap /> Learn
          </Dropdown.Item>
          <Dropdown.Item onSelect={this.onViewProfileSelect} eventKey='2'>
            <FaInfoCircle /> View profile
          </Dropdown.Item>
          <Dropdown.Item onSelect={this.onForkSelect} eventKey='3'>
            <FaCodeBranch /> Fork to course studio
          </Dropdown.Item>
          <Dropdown.Item onSelect={this.onCopyShareableLink} eventKey='4'>
            <FaShareAlt /> Copy shareable link
          </Dropdown.Item>
          { this.props.slidesListName === 'recentSlides'
            ? <Dropdown.Item onSelect={this.onRemoveFromDashboardSelect} eventKey='5'>
              <FaMinus /> Remove from dashboard
            </Dropdown.Item>
            : <Dropdown.Item onSelect={this.onAddToDashboardSelect} eventKey='5'>
              <FaPlus /> Add to dashboard
            </Dropdown.Item>
          }
        </Dropdown.Menu>,
        document.getElementById('browse-app')
      )

    return (
      <div
        className={'course-card'}
        style={{'cursor': 'pointer'}}>
        {this.state.showSpinnerOverlay && spinner}
        <div
          onClick={this.onTitleClick}
          style={{paddingBottom: '1rem', overflow: 'hidden', borderRadius: '15px', height: '13rem'}}
        >
          <Thumbnail image={this.props.course.image} />
        </div>
        <div>
          <Dropdown
            style={{float: 'right'}}
            id='dropdown-custom-menu'>
            <Dropdown.Toggle as={this.CourseMenuToggle}>
              <FaEllipsisV style={{fontSize: '2rem'}} />
            </Dropdown.Toggle>
            <DropdownMenu />
          </Dropdown>
          <div onClick={this.onTitleClick} className={'blue-text'} style={{fontSize: '1.7rem'}}>
            {this.props.course.name}
          </div>
          <div style={{fontSize: '1rem', paddingTop: '0.5rem', textAlign: 'left', margin: '0 0.5rem 0 0.5rem'}}>
            <a href={this.props.course.author.get_absolute_url}>
              {this.props.course.author.display_name}
            </a> ∙ {this.props.course.count_lessons } lessons ∙ { this.props.course.number_of_learners } learners
          </div>
          <div style={{fontSize: '1rem', color: 'gray', textAlign: 'left', margin: '0 0.5rem 0 0.5rem'}}>
            Created <Moment fromNow>
              {this.props.course.created_on}
            </Moment> ∙ Last updated <Moment fromNow>
              {this.props.course.updated_on}
            </Moment>
          </div>
        </div>
      </div>
    )
  }
}

CourseThumbnailPublic.propTypes = {
  // uuid: PropTypes.string.isRequired,
  // author: PropTypes.object.isRequired,
  // name: PropTypes.string.isRequired,
  course: PropTypes.object.isRequired,
  slidesListName: PropTypes.string,
  onAddRemoveFromDashboardSildes: PropTypes.func,
  addCourseToDashboard: PropTypes.func,
  addCourse: PropTypes.func,
  removeCourseFromDashboard: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    coursesSearchList: state.studio.search.courses
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    addCourseToDashboard: (uuid) => dispatch(addCourseToDashboard(uuid)),
    addCourse: (uuid) => dispatch(addCourse(uuid)),
    removeCourseFromDashboard: (uuid) => dispatch(removeCourseFromDashboard(uuid))
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(CourseThumbnailPublic)
export { CourseThumbnailPublic as CourseThumbnailPublicNotConnected }
