import React from 'react'

import { Route, withRouter } from 'react-router'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'

import { StudentIndexView, TeacherIndexView } from '../../containers/index'
import { Sheet } from '../../components/Sheet'

import * as tabsCreators from '../../actions/tab'

class IndexView extends React.Component {
  render () {
    var baseUrl = this.props.match.url.replace(/\/$/, '')
    var studentIndexUrl = baseUrl + '/student/'
    var teacherIndexUrl = baseUrl + '/teacher/'

    const { history } = this.props

    if (this.props.match.url === '/classroom/' && this.props.match.isExact) {
      // this.props.dispatch(push(studentIndexUrl)) // redirect to student index page
      history.push(studentIndexUrl) // redirect to student index page
    }

    return (
      <Sheet>
        <Tabs name='tab'
          className='tabs'
          handleSelect={
            (selectedTab, namespace) => {
              this.props.tabActions.changeSelectedTab(selectedTab, namespace, history)
            }
          }
          selectedTab={this.props.tab}
        >
          <div className='tab-links'>
            <TabLink to='student'>Student</TabLink>
            <TabLink to='teacher'>Teacher</TabLink>
          </div>
          <div className='content'>
            <TabContent for='student'>
              <Route path={studentIndexUrl} component={StudentIndexView} />
            </TabContent>
            <TabContent for='teacher'>
              <Route path={teacherIndexUrl} component={TeacherIndexView} />
            </TabContent>
          </div>
        </Tabs>
      </Sheet>
    )
  }
}

IndexView.propTypes = {
  tabActions: PropTypes.shape({
    changeSelectedTab: PropTypes.func.isRequired
  }).isRequired,
  tab: PropTypes.string,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    tab: state.tab.tab,
    gapiInitState: state.google.gapiInitState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    tabActions: bindActionCreators(tabsCreators, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(IndexView))
export { IndexView as IndexViewNotConnected }
