import React from 'react'
import { connect } from 'react-redux'
import { changeSelectedTab } from './../actions'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'

import { Sheet } from './sheet'

class _CurriculumProfile extends React.Component {
  onTabChanged (selectedTab) {

  }

  render () {
    return (<Sheet>
      <Tabs
        name='curriculumTabs'
        className='tabs'
        handleSelect={this.onTabChanged}
        selectedTab={this.tab}
      >
        <div className='tab-links'>
          <TabLink to='info'>Public curriculum profile</TabLink>
          <TabLink to='edit'>Edit curriculum profile</TabLink>
          <TabLink to='settings'>Curriculum settings</TabLink>
        </div>
        <div className='content'>
          <TabContent for='info'>
              Public curriculum profile
          </TabContent>
          <TabContent for='edit'>
              Edit
          </TabContent>
          <TabContent for='settings'>
            Settings
          </TabContent>
        </div>
      </Tabs>
    </Sheet>
    )
  }
}

const mapStateToProps = function(store) {
  return {
    // tab: store.curriculaDashboard.tab
  }
}

export let CurriculumProfile = connect(
  mapStateToProps,
  dispatch => {
    return {
      // onTabChanged: (selectedTab, tabNamespace) => dispatch(changeSelectedTab(selectedTab, tabNamespace))
    }
  })(_CurriculumProfile)
