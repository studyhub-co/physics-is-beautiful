import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
} from '../../actions'
import { Image as ImageBs, Grid, Row, Col, Glyphicon, Tooltip, InputGroup, FormControl, Modal } from 'react-bootstrap'

class BrowseCurriculaView extends React.Component {
  render () {
    return (
      <Grid fluid>
        <Row style={{padding: 0}}>
          <Col sm={12} md={12}>
          searchstring
          </Col>
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    curricula: state.curricula
  }
}

BrowseCurriculaView.propTypes = {
  // actions
  // loadCurriculum: PropTypes.func.isRequired,
  // changeCurriculumImage: PropTypes.func.isRequired,
  // changeCurriculumCoverPhoto: PropTypes.func.isRequired,
  // data
  curricula: PropTypes.object
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    // loadCurriculum: (uuid) => dispatch(loadCurriculumIfNeeded(uuid)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseCurriculaView)
export { BrowseCurriculaView as BrowseCurriculaViewNotConnected }
