import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { FaCheck, FaCheckCircle, FaExclamationCircle, FaClock } from 'react-icons/fa'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class NotificationsListView extends React.Component {
  constructor (props) {
    super(props)
    // this.onLessonClick = this.onLessonClick.bind(this)
  }

  componentWillMount () {
    // if (!this.props.notificationsList) {
    //   // load notifications list
    //   this.props.notificationsActions.notificationsList()
    // }
  }

  render () {
    return (
      <Container>
        <Row>
          <Col sm={12} md={12}>
            Notifications List
          </Col>
        </Row>
      </Container>
    )
  }
}

NotificationsListView.propTypes = {
  // notificationsActions: PropTypes.shape({
  //   notificationsList: PropTypes.func.isRequired
  // }).isRequired
}

const mapStateToProps = (state) => {
  return {
    // notificationsList: state.notifications.notificationsList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    // notificationsActions: bindActionCreators(notificationsCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsListView)
export { NotificationsListView as NotificationsListNotConnected }
