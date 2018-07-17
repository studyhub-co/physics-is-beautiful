import React from 'react'
// import { push } from 'react-router-redux'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Sheet } from '../../components/Sheet'

class IndexView extends React.Component {

  constructor (props) {
    super(props)
    console.log(props)
  }

  // goToProtected () {
  //   this.props.dispatch(push('/protected'))
  // }

  render () {
    return (<Sheet>Hello world</Sheet>)
  }

  // render() {
  //     return (
  //         <div className="container">
  //             <div className="margin-top-medium text-center">
  //                 <img className="page-logo margin-bottom-medium"
  //                     src={reactLogo}
  //                     alt="ReactJs"
  //                 />
  //                 <img className="page-logo margin-bottom-medium"
  //                     src={reduxLogo}
  //                     alt="Redux"
  //                 />
  //             </div>
  //             <div className="text-center">
  //                 <h1>Django React Redux Demo</h1>
  //                 <h4>Hello, {this.props.userName || 'guest'}.</h4>
  //             </div>
  //             <div className="margin-top-medium text-center">
  //                 <p>Attempt to access some <a onClick={this.goToProtected}><b>protected content</b></a>.</p>
  //             </div>
  //             <div className="margin-top-medium">
  //                 {this.props.statusText ?
  //                     <div className="alert alert-info">
  //                         {this.props.statusText}
  //                     </div>
  //                     :
  //                     null
  //                 }
  //             </div>
  //         </div>
  //     )
  // }
}
IndexView.propTypes = {
  // statusText: PropTypes.string,
  // userName: PropTypes.string,
  dispatch: PropTypes.func.isRequired
}
IndexView.defaultProps = {
  // statusText: '',
  // userName: ''
}

const mapStateToProps = (state) => {
  return {
    // userName: state.auth.userName,
    // statusText: state.auth.statusText
  }
}

export default connect(mapStateToProps)(IndexView)
export { IndexView as IndexViewNotConnected }
