import React from 'react'
// import { push } from 'react-router-redux'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Sheet } from '../../components/Sheet'

import { Tabs, TabLink, TabContent } from 'react-tabs-redux'

import * as actionCreators from '../../actions/tab'

class IndexView extends React.Component {
  // goToProtected () {
  //   this.props.dispatch(push('/protected'))
  // }

  render () {
    console.log(this.props);
    return (
      <Sheet>
        <Tabs name='tab'
          className='tabs'
          handleSelect={this.props.actions.changeSelectedTab}
          selectedTab={this.props.tab}
        >
          <div className='tab-links'>
            <TabLink to='student'>Student</TabLink>
            <TabLink to='teacher'>Teacher</TabLink>
          </div>

          <div className='content'>
            <TabContent for='student'>
              <div>student</div>
            </TabContent>
            <TabContent for='teacher'>
              <div>teacher</div>
            </TabContent>
          </div>
        </Tabs>
      </Sheet>
    )
  }
}

IndexView.propTypes = {
  actions: PropTypes.shape({
    changeSelectedTab: PropTypes.func.isRequired
  }).isRequired,
  tab: PropTypes.string
}
IndexView.defaultProps = {
  // statusText: '',
  // userName: ''
}

const mapStateToProps = (state) => {
  return {
    tab: state.tab.tab
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexView)
export { IndexView as IndexViewNotConnected }
