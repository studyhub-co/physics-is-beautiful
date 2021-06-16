import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    // tab: state.tab.tab,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    // tabActions: bindActionCreators(tabsCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)
