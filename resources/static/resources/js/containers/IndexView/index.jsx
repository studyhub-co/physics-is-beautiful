import React from 'react'

import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Sheet } from '../../components/Sheet'

import { Grid, Row, Col, Button, Glyphicon } from 'react-bootstrap'

// import * as tabsCreators from '../../actions/tab'

import history from '../../history'
import * as resourcesCreators from '../../actions/resources'

class IndexView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchString: '',
      searchEnabeled: false,
      recentSlides: [],
      recentNextPageUrl: null,
      popularSlides: [],
      popularNextPageUrl: null,
      newSlides: [],
      newNextPageUrl: null
    }
  }

  componentDidMount () {
    this.props.resourcesActions.loadPopularResourcesList()
    this.props.resourcesActions.loadRecentResourcesList()
    this.props.resourcesActions.loadNewResourcesList()
  }

  onAddResourceClick (addResourceUrl) {
    history.push(addResourceUrl)
  }

  render () {
    var baseUrl = this.props.match.url.replace(/\/$/, '')
    var addResourceUrl = baseUrl + '/add/'
    // var editUrl = baseUrl + '/:uuid/edit/'

    return (
      <Sheet>
        <Grid fluid>
          <Row>
            <Col sm={10} md={10}>
              <div className={'blue-title'} style={{lineHeight: '7rem'}}>
                Resources
              </div>
            </Col>
            <Col sm={2} md={2}>
              <Button onClick={() => { this.onAddResourceClick(addResourceUrl) }} className={'common-button'}>
                <Glyphicon glyph='plus' /> Add resource
              </Button>
            </Col>
          </Row>
        </Grid>
      </Sheet>
    )
  }
}

IndexView.propTypes = {
  // actions
  resourcesActions: PropTypes.shape({
    loadPopularResourcesList: PropTypes.func.isRequired,
    loadRecentResourcesList: PropTypes.func.isRequired,
    loadNewResourcesList: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
  }),
  // data
  popularResourcesList: PropTypes.object,
  recentResourcesList: PropTypes.object,
  newResourcesList: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    popularResourcesList: state.resources.popularResourcesList,
    recentResourcesList: state.resources.recentResourcesList,
    newResourcesList: state.resources.newResourcesList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    resourcesActions: bindActionCreators(resourcesCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexView)
export { IndexView as IndexViewNotConnected }
