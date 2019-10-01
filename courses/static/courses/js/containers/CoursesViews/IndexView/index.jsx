import React from 'react'

// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class IndexView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount () {

  }

  render () {
    return (
      <div>student view courses</div>
    )
  }
}

IndexView.propTypes = {

}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexView)
export { IndexView as IndexViewNotConnected }
