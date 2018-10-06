import React from 'react'

import { connect } from 'react-redux'

import { Row, Col, Image } from 'react-bootstrap'

import PropTypes from 'prop-types'

// import { findUsers } from '../../actions'

class StaffUserRow extends React.Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {
  //     searchString: '',
  //     selectedUsers: []
  //   }
  //   this.onAddCollaboratorsClick = this.onAddCollaboratorsClick.bind(this)
  // }

  render () {
    return (
      <Row className={'staff-user-row'}>

        <Col sm={2} md={2}>
          { this.props.staff.avatar_url
            ? <Image
              responsive
              src={this.props.staff.avatar_url}
              rounded />
            : null}
        </Col>
        <Col sm={6} md={6}>
          {this.props.staff.display_name}
        </Col>
        <Col sm={2} md={2}>
          {this.props.post}
        </Col>
        <Col sm={2} md={2}>
          drop down
        </Col>
      </Row>
    )
  }
}

StaffUserRow.propTypes = {
  // actions
  // removeCollaborator: PropTypes.func.isRequired,
  // data
  user: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    // removeCollaborator: (collaborators) => dispatch(findUsers(collaborators))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StaffUserRow)
export { StaffUserRow as StaffUserRowNotConnected }
