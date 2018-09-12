import React from 'react'
import { connect } from 'react-redux'
import { changeSelectedTab } from './../actions'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
import { CurriculaApp } from './curricula'
import { MyCurriculaApp } from './my_curricula'

import { Sheet } from './sheet'

class CurriculaDashboard extends React.Component {

  render () {
    return (<Sheet>
      <Tabs
        name='tab'
        className='tabs'
        handleSelect={this.props.onTabChanged}
        selectedTab={this.props.tab}
      >
        <div className='tab-links'>
          {/*<TabLink to='my'>My Curricula</TabLink>*/}
          <TabLink to='browse'>Browse curricula</TabLink>
          <TabLink to='studio'>Curriculum studio</TabLink>
        </div>

        <div className='content'>
          {/*<TabContent for='my'>*/}
            {/*<MyCurriculaApp></MyCurriculaApp>*/}
          {/*</TabContent>*/}
          <TabContent for='browse'>
              TODO: Browse app
          </TabContent>
          <TabContent for='studio'>
            <div className={'lightgrey-round-background'}>Create a new curriculum from scratch below.
              Or, to add content from other curricula or to fork a curriculum visit
              the <a href='javascript:void(0)' onClick={() => this.props.onTabChanged('browse', 'tab')}>Browse curricula</a> tab.
              Tutorial and additional help here
            </div>
            <CurriculaApp></CurriculaApp>
          </TabContent>
        </div>
      </Tabs>
    </Sheet>
    )
  }
}

const mapStateToProps = function(store) {
  return {
    tab: store.curriculaDashboard.tab
  }
}

export let CurriculaDashboardApp = connect(
  mapStateToProps,
  dispatch => {
    return {
      onTabChanged: (selectedTab, tabNamespace) => dispatch(changeSelectedTab(selectedTab, tabNamespace))
    }
  })(CurriculaDashboard)
