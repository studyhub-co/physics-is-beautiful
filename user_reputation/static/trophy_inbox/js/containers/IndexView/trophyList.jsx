import React from 'react'
import PropTypes from 'prop-types'

import { RingLoader } from 'react-spinners'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import { FaCheck, FaCheckCircle, FaExclamationCircle, FaClock } from 'react-icons/fa'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import * as reputationActionsCreators from '../../actions/reputation'
import * as profileCreators from '../../actions/profile'

class TrophyListView extends React.Component {
  constructor (props) {
    super(props)
    this.onSellAllClick = this.onSellAllClick.bind(this)
  }

  onSellAllClick () {
    if (this.props.profile) {
      window.location.href = '/profile/' + this.props.profile.id + '/activity/'
    }
  }

  componentWillMount () {
    this.props.profileActions.fetchProfileMe()

    if (!this.props.reputationActionsList) {
      // load reputation_actions list
      this.props.reputationActions.fetchReputationActions(null)
    }
  }

  render () {
    return (
      <Container style={{width: '30rem', maxWidth: '100vw'}}>
        <Row>
          <Col sm={12} md={12}>
            { this.props.reputationActionsList
              ? <div>
                { this.props.reputationActionsList['results'].length === 0 ? <span>No trophies<hr /></span> : null }
                { this.props.reputationActionsList['results'].map(function (reputationAction, i) {
                  return <div key={reputationAction.id}>
                    <span style={{color: 'green'}}>+ {reputationAction['value']}</span>
                    { reputationAction['content_object'] &&
                    (reputationAction['content_object']['content_type'] === 'module' ||
                      reputationAction['content_object']['content_type'] === 'lesson')
                      ? <span>&nbsp;{reputationAction['content_object'].name}</span>
                      : null
                    }
                    {/*{ reputationAction['target'] && reputationAction['target']['content_type'] === 'badge'*/}
                      {/*? <span>&nbsp;on&nbsp;{reputationAction['target'].title} badge</span>*/}
                      {/*: null*/}
                    {/*}*/}
                    {/*{ reputationAction['target'] && reputationAction['target']['content_type'] === ('lesson' || 'module')*/}
                      {/*? <span>&nbsp;on&nbsp;{reputationAction['target'].name}</span>*/}
                      {/*: null*/}
                    {/*} &nbsp;*/}
                    {/*&nbsp;*/}
                    {/*{reputationAction['timesince']}*/}
                    {/*&nbsp;*/}
                    {/*ago*/}
                    <hr />
                  </div>
                }) }
                <div className={'text-center'}>
                  <span
                    onClick={this.onSellAllClick}
                    style={{cursor: 'pointer', color: '#1caff6'}}
                  >See all items</span>
                </div>
              </div>
              : <div style={{'margin': '0 auto', width: '60px'}}>
                <RingLoader
                  color={'#1caff6'}
                  loading={Boolean(true)}
                >
                </RingLoader>
              </div>
            }
          </Col>
        </Row>
      </Container>
    )
  }
}

TrophyListView.propTypes = {
  reputationActions: PropTypes.shape({
    fetchReputationActions: PropTypes.func.isRequired
  }).isRequired,
  profileActions: PropTypes.shape({
    fetchProfileMe: PropTypes.func.isRequired
  }),
  reputationActionsList: PropTypes.object,
  profile: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    reputationActionsList: state.reputationActions.reputationActionsList,
    profile: state.profile.me
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    reputationActions: bindActionCreators(reputationActionsCreators, dispatch),
    profileActions: bindActionCreators(profileCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrophyListView)
export { TrophyListView as TrophyListViewListNotConnected }
