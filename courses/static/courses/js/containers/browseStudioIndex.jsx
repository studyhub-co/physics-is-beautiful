import React from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route } from 'react-router'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'

import history from '../history'

import { changeStudioSelectedTab, deleteCourse } from '../actions/studio'

import StudioCoursesIndexView from '../containers/StudioViews/IndexView/index'
import EditCourseProfileView from '../containers/StudioViews/editProfile'
import { BrowseIndexView } from '../containers/BrowseViews/index'
import { Sheet } from '../components/Sheet'

class BrowseStudioDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.onEditCourseProfileClick = this.onEditCourseProfileClick.bind(this)
    this.onDeleteCourseClick = this.onDeleteCourseClick.bind(this)
    this.handleTabUserChange = this.handleTabUserChange.bind(this)

    this.state = {
      // TODO remove, migrated to url based expression
      // showEditCourseProfile: false,
      toEditCourseUuid: null,
    }
  }

  // componentWillMount() { #210
  componentDidMount() {
    // Fixme not so good navigation tabs switches
    if (this.props.match.path.endsWith('browse/') && this.props.match.isExact) {
      this.props.changeTab('browse', 'tab')
    }
    if (this.props.match.path.endsWith('studio/') && this.props.match.isExact) {
      this.props.changeTab('studio', 'tab')
    }
    // if can be /studio/profile/ (with basename) and studio/profile/ (w/o basename)
    // so change it for indexOf for now
    // if (this.props.location.pathname.lastIndexOf('/studio/profile/', 0) === 0) {
    if (this.props.location.pathname.indexOf('studio/profile/') === 1) {
      this.props.changeTab('studio', 'tab')
      this.setState({ showEditCourseProfile: true })
    }
  }

  // // componentWillReceiveProps(props) { #210
  // not sure we need this
  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   if (this.props && !this.props.match.isExact && props.match.isExact) {
  //     this.setState({
  //       showEditCourseProfile: false,
  //     })
  //   }
  // }

  handleTabUserChange(tabname, tabspace) {
    if (tabname !== 'studio') {
      history.push('/' + tabname + '/')
    } else {
      history.push('/studio/')
    }

    this.props.changeTab(tabname, tabspace)
  }

  onEditCourseProfileClick(uuid) {
    this.setState({
      toEditCourseUuid: uuid,
      // showEditCourseProfile: !this.state.showEditCourseProfile,
    })
    history.push('/studio/profile/' + uuid + '/')
  }

  onDeleteCourseClick(uuid) {
    if (confirm('Are you sure you want to delete this course?')) {
      // TODO we can use Modal from react bootstrap if needed
      this.props.deleteCourse(uuid)
      history.push('/studio/')
    }
  }

  render() {
    return (
      <Sheet>
        <Tabs
          name="tab"
          id="browse-app"
          className="tabs"
          handleSelect={this.handleTabUserChange}
          selectedTab={this.props.tab}
        >
          <div className="tab-links">
            <TabLink to="browse">Browse courses</TabLink>
            <TabLink to="studio">Course studio</TabLink>
          </div>

          <div className="content">
            <TabContent for="browse">
              <BrowseIndexView />
            </TabContent>
            <TabContent for="studio">
              <Route
                path={'/studio/profile/:uuid/'}
                component={EditCourseProfileView}
              />
              {/*{this.state.showEditCourseProfile ? null : (*/}
              {/* fixme iti is better to use Route here */}
              {this.props.match?.path !== '/studio/profile/:uuid/' && (
                <div>
                  <div className={'lightgrey-round-background-studio'}>
                    Create a new course from scratch below. Or, to add content
                    from other courses or to fork a course visit the{' '}
                    <a
                      className="course-user-link"
                      style={{ cursor: 'pointer' }}
                      onClick={() => this.props.changeTab('browse', 'tab')}
                    >
                      Browse Courses
                    </a>{' '}
                    tab.
                    {/*Tutorial and additional help here.{' '}*/}
                    {/* TODO help link? */}
                  </div>
                  <StudioCoursesIndexView
                    onEditCourseProfileClick={this.onEditCourseProfileClick}
                    onDeleteCourseClick={this.onDeleteCourseClick}
                  />
                </div>
              )}
            </TabContent>
          </div>
        </Tabs>
      </Sheet>
    )
  }
}

BrowseStudioDashboard.propTypes = {
  tab: PropTypes.string,
  changeTab: PropTypes.func.isRequired,
  deleteCourse: PropTypes.func.isRequired,
}

const mapStateToProps = function(store) {
  return {
    tab: store.studio.tabs.tab,
  }
}

export default connect(mapStateToProps, dispatch => {
  return {
    changeTab: (selectedTab, tabNamespace) =>
      dispatch(changeStudioSelectedTab(selectedTab, tabNamespace)),
    deleteCourse: uuid => dispatch(deleteCourse(uuid)),
  }
})(BrowseStudioDashboard)
