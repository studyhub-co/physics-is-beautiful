import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Sheet } from '../../components/Sheet'

import * as resourcesCreators from '../../actions/resources'

import { Grid, Row, Col, Button, Glyphicon, FormGroup, InputGroup, FormControl } from 'react-bootstrap'

import { BASE_URL } from '../../utils/config'
import history from '../../history'

class TextBookProblemView extends React.Component {
  componentDidMount () {
    if (this.props.match.params && this.props.match.params['uuid']) {
      this.props.resourcesActions.fetchProblem(this.props.match.params['uuid'])
    }
  }

  render () {
    return (
      <Sheet>
        <Grid fluid>
          <Row>
            <Col sm={12} md={12}>
              <a className={'back-button'} onClick={() => { history.push(BASE_URL + this.props.match.params['resource_uuid'])}} >
                <span className='glyphicon glyphicon-menu-left' style={{fontSize: 16}} />
                All problems
              </a>
            </Col>
          </Row>
        </Grid>
        { this.props.problem
          ? <Grid fluid>
            <Row>
              <Col sm={12} md={12}>
                <div className={'blue-title'}>{this.props.problem.title}</div>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={12}>
                solutions list
              </Col>
            </Row>
          </Grid>
          : null }
      </Sheet>
    )
  }
}

TextBookProblemView.propTypes = {
  // // actions
  resourcesActions: PropTypes.shape({
    fetchProblem: PropTypes.func.isRequired
  }),
  // data
  problem: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    problem: state.resources.problem
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    resourcesActions: bindActionCreators(resourcesCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextBookProblemView)
export { TextBookProblemView as TextBookProblemViewNotConnected }
