import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { history } from './../history'
// import { Route } from 'react-router-dom'
import { Route } from 'react-router'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'

import { changeStudioSelectedTab, deleteCurriculum } from './../actions'
import { Sheet } from './sheet'

import { CurriculaView } from '../containers/curriculumStudio/curricula'
import EditCurriculumProfileView from '../containers/curriculumStudio/editProfile'
import BrowseCurriculaView from '../containers/browseCurricula/index'

class CurriculaDashboard extends React.Component {
  constructor (props) {
    super(props)
    this.onEditCurriculumProfileClick = this.onEditCurriculumProfileClick.bind(this)
    this.onDeleteCurriculumClick = this.onDeleteCurriculumClick.bind(this)
    this.handleTabUserChange = this.handleTabUserChange.bind(this)

    this.state = {
      showEditCurriculumProfile: false,
      toEditCurriculumUuid: null
    }
  }

  componentWillMount () {
    if (this.props.match.path === '/browse/' && this.props.match.isExact) {
      this.props.changeTab('browse', 'tab')
    }
    if (this.props.match.path === '/studio/' && this.props.match.isExact) {
      this.props.changeTab('studio', 'tab')
    }
    if (this.props.location.pathname.lastIndexOf('/studio/profile/', 0) === 0) {
      this.props.changeTab('studio', 'tab')
      this.setState({showEditCurriculumProfile: true})
    }
  }

  componentWillReceiveProps (props) {
    if (this.props && !this.props.match.isExact && props.match.isExact) {
      this.setState({
        showEditCurriculumProfile: false
      })
    }
  }

  handleTabUserChange (tabname, tabspace) {
    if (tabname !== 'studio') {
      history.push('/' + tabname + '/')
    } else { history.push('/studio/') }

    this.props.changeTab(tabname, tabspace)
  }

  onEditCurriculumProfileClick (uuid) {
    this.setState({
      toEditCurriculumUuid: uuid,
      showEditCurriculumProfile: !this.state.showEditCurriculumProfile
    })
    history.push('/studio/profile/' + uuid + '/')
  }

  onDeleteCurriculumClick (uuid) {
    if (confirm('Are you sure you want to delete this curriculum?')) { // TODO we can use Modal from react bootstrap if needed
      this.props.deleteCurriculum(uuid)
      history.push('/studio/')
    }
  }

  render () {
    return (<Sheet>
      <Tabs
        name='tab'
        className='tabs'
        handleSelect={this.handleTabUserChange}
        selectedTab={this.props.tab}
      >
        <div className='tab-links'>
          <TabLink to='browse'>Browse Courses</TabLink>
          <TabLink to='studio'>Course studio</TabLink>
        </div>

        <div className='content'>
          <TabContent for='browse'>
            <BrowseCurriculaView />
          </TabContent>
          <TabContent for='studio'>
            {this.state.showEditCurriculumProfile
              ? <Route path='/studio/profile/:uuid/' component={EditCurriculumProfileView} />
              : <div>
                <div className={'lightgrey-round-background-studio'}>Create a new curriculum from scratch below.
                  Or, to add content from other courses or to fork a curriculum visit
                  the <a href='javascript:void(0)' onClick={() => this.props.changeTab('browse', 'tab')}>Browse Courses</a> tab.
                  Tutorial and additional help here
                </div>
                <CurriculaView
                  onEditCurriculumProfileClick={this.onEditCurriculumProfileClick}
                  onDeleteCurriculumClick={this.onDeleteCurriculumClick}
                />
              </div>
            }
          </TabContent>
        </div>
      </Tabs>
    </Sheet>
    )
  }
}

CurriculaDashboard.propTypes = {
  tab: PropTypes.string,
  changeTab: PropTypes.func.isRequired,
  deleteCurriculum: PropTypes.func.isRequired
}

const mapStateToProps = function (store) {
  return {
    tab: store.studioTabs.tab
  }
}

let CurriculaDashboardApp = connect(
  mapStateToProps,
  dispatch => {
    return {
      changeTab: (selectedTab, tabNamespace) => dispatch(changeStudioSelectedTab(selectedTab, tabNamespace)),
      deleteCurriculum: (uuid) => dispatch(deleteCurriculum(uuid))
    }
  })(CurriculaDashboard)

export {CurriculaDashboardApp}
