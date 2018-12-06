import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Sheet } from '../../components/Sheet'

import Swiper from 'react-id-swiper'
import { Grid, Row, Col, Button, Glyphicon, FormGroup, InputGroup, FormControl } from 'react-bootstrap'

import { BASE_URL } from '../../utils/config'

class ResourceView extends React.Component {
  render () {
    return (
      <Sheet>
        <Grid fluid>
          <Row>
            <Col sm={11} md={11}>
              All Resources
            </Col>
          </Row>
        </Grid>
      </Sheet>
    )
  }
}

ResourceView.propTypes = {
  // // actions
  // resourcesActions: PropTypes.shape({
  //   loadPopularResourcesList: PropTypes.func.isRequired,
  //   loadRecentResourcesList: PropTypes.func.isRequired,
  //   loadNewResourcesList: PropTypes.func.isRequired
  // }),
  // // data
  // popularResourcesList: PropTypes.object,
  // recentResourcesList: PropTypes.object,
  // newResourcesList: PropTypes.object,
  // // dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    // popularResourcesList: state.resources.popularResourcesList,
    // recentResourcesList: state.resources.recentResourcesList,
    // newResourcesList: state.resources.newResourcesList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    // resourcesActions: bindActionCreators(resourcesCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResourceView)
export { ResourceView as IndexViewNotConnected }
