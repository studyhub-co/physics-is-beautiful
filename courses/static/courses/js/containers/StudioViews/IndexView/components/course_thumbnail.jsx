import React from 'react'

import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { RingLoader } from 'react-spinners'
import { Col, Dropdown, DropdownItem } from 'react-bootstrap'
import { FaEllipsisV, FaEdit, FaPen, FaCodeBranch, FaShareAlt, FaTrash } from 'react-icons/fa'
import copy from 'copy-to-clipboard'

import { Thumbnail } from '../../../../components/thumbnail'
import { Overlay } from '../../../../components/fullscreen_overlay'
import { BASE_URL } from '../../../../utils/config'

class CourseMenuToggle extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    e.preventDefault()
    this.props.onClick(e)
  }

  render () {
    return (
      <FaEllipsisV onClick={this.handleClick} style={{fontSize: '2rem'}}>
        {this.props.children}
      </FaEllipsisV>
    )
  }
}

CourseMenuToggle.propTypes = {
  onClick: PropTypes.func
}

export default class CourseThumbnail extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.onForkSelect = this.onForkSelect.bind(this)
    this.onEditCourseSelect = this.onEditCourseSelect.bind(this)
    this.onDeleteCourse = this.onDeleteCourse.bind(this)
    this.onEditContentSelect = this.onEditContentSelect.bind(this)
    this.onCopyShareableLink = this.onCopyShareableLink.bind(this)
    this.onTitleClick = this.onTitleClick.bind(this)
    this.state = {showSpinnerOverlay: false}
  }

  onEditContentSelect (e) {
    this.props.onClick()
  }

  onTitleClick () {
    this.props.onClick()
  }

  onCopyShareableLink (e) {
    copy(window.location.origin + BASE_URL + '/courses/' + this.props.uuid + '/')
  }

  onEditCourseSelect (e) {
    this.props.onEditCourseProfileClick()
  }

  onDeleteCourse (e) {
    this.props.onDeleteCourseClick(this.props.uuid)
  }

  onForkSelect (e) {
    this.setState({showSpinnerOverlay: true})
    this.props.addCourse(this.props.uuid)
  }

  render () {
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

    return (
      <Col
        sm={2}
        md={2}
        className={'course-card'}
        style={{'cursor': 'pointer'}}>
        {this.state.showSpinnerOverlay && spinner}
        <div
          onClick={this.onTitleClick}
          style={{paddingBottom: '1rem', overflow: 'hidden', borderRadius: '15px', height: '13rem'}}
        >
          <Thumbnail image={this.props.image} />
        </div>
        <div>
          <Dropdown
            style={{float: 'right'}}
            id='dropdown-custom-menu'>
            {/* <CourseMenuToggle bsRole='toggle' /> */}
            <Dropdown.Toggle as={CourseMenuToggle} />
            <Dropdown.Menu rootCloseEvent={'click'}>
              <DropdownItem onSelect={this.onEditContentSelect} eventKey='1'>
                <FaEdit /> Edit content
              </DropdownItem>
              <DropdownItem onSelect={this.onEditCourseSelect} eventKey='2'>
                <FaPen /> Edit profile and settings
              </DropdownItem>
              <DropdownItem onSelect={this.onForkSelect} eventKey='3'>
                <FaCodeBranch /> Fork
              </DropdownItem>
              <DropdownItem onSelect={this.onCopyShareableLink} eventKey='4'>
                <FaShareAlt /> Copy shareable link
              </DropdownItem>
              <DropdownItem onSelect={this.onDeleteCourse} eventKey='5'>
                <FaTrash /> Delete
              </DropdownItem>
            </Dropdown.Menu>
          </Dropdown>
          <div onClick={this.onTitleClick} className={'blue-text'} style={{fontSize: '1.7rem'}}>
            {this.props.name}
          </div>
          <div style={{fontSize: '1rem', paddingTop: '0.5rem', textAlign: 'left', margin: '0 0.5rem 0 0.5rem'}}>
            <a href={this.props.author.get_absolute_url}>
              {this.props.author.display_name}
            </a> ∙ {this.props.count_lessons } lessons ∙ { this.props.number_of_learners } learners
          </div>
          <div style={{fontSize: '1rem', color: 'gray', textAlign: 'left', margin: '0 0.5rem 0 0.5rem'}}>
            Created <Moment fromNow>
              {this.props.created_on}
            </Moment> ∙ Last updated <Moment fromNow>
              {this.props.updated_on}
            </Moment>
          </div>
        </div>
      </Col>
    )
  }
}

CourseThumbnail.propTypes = {
  uuid: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  addCourse: PropTypes.func.isRequired,
  onEditCourseProfileClick: PropTypes.func.isRequired,
  onDeleteCourseClick: PropTypes.func.isRequired
}
