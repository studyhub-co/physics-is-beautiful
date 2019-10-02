import React from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route } from 'react-router'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'

import history from '../history'
import { BASE_URL } from '../utils/config'

import { changeStudioSelectedTab, deleteCourse } from '../actions/studio'

import StudioCoursesIndexView from '../containers/StudioViews/IndexView/index'
// import EditCourseProfileView from '../containers/courseStudio/editProfile'
import { BrowseIndexView } from '../containers/BrowseViews/index'

class BrowseStudioDashboard extends React.Component {
  constructor (props) {
    super(props)
    this.onEditCourseProfileClick = this.onEditCourseProfileClick.bind(this)
    this.onDeleteCourseClick = this.onDeleteCourseClick.bind(this)
    this.handleTabUserChange = this.handleTabUserChange.bind(this)

    this.state = {
      showEditCourseProfile: false,
      toEditCourseUuid: null
    }
  }

  componentWillMount () {
    if (this.props.match.path === BASE_URL + 'browse/' && this.props.match.isExact) {
      this.props.changeTab('browse', 'tab')
    }
    if (this.props.match.path === BASE_URL + 'studio/' && this.props.match.isExact) {
      this.props.changeTab('studio', 'tab')
    }
    if (this.props.location.pathname.lastIndexOf(BASE_URL + 'studio/profile/', 0) === 0) {
      this.props.changeTab('studio', 'tab')
      this.setState({showEditCourseProfile: true})
    }
  }

  componentWillReceiveProps (props) {
    if (this.props && !this.props.match.isExact && props.match.isExact) {
      this.setState({
        showEditCourseProfile: false
      })
    }
  }

  handleTabUserChange (tabname, tabspace) {
    if (tabname !== 'studio') {
      history.push(BASE_URL + tabname + '/')
    } else { history.push(BASE_URL + 'studio/') }

    this.props.changeTab(tabname, tabspace)
  }

  onEditCourseProfileClick (uuid) {
    this.setState({
      toEditCourseUuid: uuid,
      showEditCourseProfile: !this.state.showEditCourseProfile
    })
    history.push(BASE_URL + '/studio/profile/' + uuid + '/')
  }

  onDeleteCourseClick (uuid) {
    if (confirm('Are you sure you want to delete this course?')) { // TODO we can use Modal from react bootstrap if needed
      this.props.deleteCourse(uuid)
      history.push(BASE_URL + '/studio/')
    }
  }

  render () {
    return (
      <Tabs
        name='tab'
        className='tabs'
        handleSelect={this.handleTabUserChange}
        selectedTab={this.props.tab}
      >
        <div className='tab-links'>
          <TabLink to='browse'>Browse courses</TabLink>
          <TabLink to='studio'>Course studio</TabLink>
        </div>

        <div className='content'>
          <TabContent for='browse'>
            <BrowseIndexView />
          </TabContent>
          <TabContent for='studio'>
            {this.state.showEditCourseProfile
              ? <Route path={BASE_URL + '/studio/profile/:uuid/' } component={EditCourseProfileView} /> // todo move to root routes?
              : <div>
                <div className={'lightgrey-round-background-studio'}>Create a new course from scratch below.
                  Or, to add content from other courses or to fork a course visit
                  the <a href='javascript:void(0)' onClick={() => this.props.changeTab('browse', 'tab')}>Browse Courses</a> tab.
                  Tutorial and additional help here. {/* TODO help link? */}
                </div>
                <StudioCoursesIndexView
                  onEditCourseProfileClick={this.onEditCourseProfileClick}
                  onDeleteCourseClick={this.onDeleteCourseClick}
                />
              </div>
            }
          </TabContent>
        </div>
      </Tabs>
    )
  }
}

BrowseStudioDashboard.propTypes = {
  tab: PropTypes.string,
  changeTab: PropTypes.func.isRequired,
  deleteCourse: PropTypes.func.isRequired
}

const mapStateToProps = function (store) {
  return {
    tab: store.studio.tabs.tab
  }
}

export default connect(
  mapStateToProps,
  dispatch => {
    return {
      changeTab: (selectedTab, tabNamespace) => dispatch(changeStudioSelectedTab(selectedTab, tabNamespace)),
      deleteCourse: (uuid) => dispatch(deleteCourse(uuid))
    }
  })(BrowseStudioDashboard)
