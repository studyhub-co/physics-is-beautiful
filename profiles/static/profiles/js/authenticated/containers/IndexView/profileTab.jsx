import React from 'react'

import PropTypes from 'prop-types'
import { Route } from 'react-router'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Grid, Row, Col, Button, Glyphicon, Overlay, Image, FormGroup, InputGroup, FormControl } from 'react-bootstrap'
import { RingLoader } from 'react-spinners'

import * as tabsCreators from '../../actions/tab'
import * as profileCreators from '../../actions/profile'

import ChangePicturePopover from '../../components/ChangePicturePopover'
import { API_PREFIX, getAxios } from '../../../anonymous/utils'

class ProfileTabView extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.onChangeAvatarClick = this.onChangeAvatarClick.bind(this)
    this.selectAvatar = this.selectAvatar.bind(this)

    this.state = {
      showChangeImagePanel: false
    }
  }

  componentWillMount () {
    if (!this.props.profile) {
      this.props.profileActions.fetchProfile(this.props.profileId)
    }
    // this.props.tabActions.changeSelectedTab('profile', 'profileTab', this.props.match.params.id, false)
  }

  selectAvatar (type) {
    console.log(type);
    // getAxios().patch(API_PREFIX + 'me', {selected_avatar: type}).then((response) => {
    //   // close overlay + reeload profile
    //   // this.setState({ showChangeImagePanel: false })
    //   this.props.profileToState(response.data)
    // })
  }

  onChangeAvatarClick () {
    this.setState({ showChangeImagePanel: true })
  }

  render () {
    // var baseUrl =  this.props.match.url.replace(/\/$/, '')
    // var studentClassroomUrl = baseUrl + '/:uuid/'
    //
    // var joinUrl = baseUrl + '/new/join'
    //
    // if (this.props.match.params && this.props.match.params.joinCode) {
    //   var joinCode = this.props.match.params.joinCode
    //   // join to classroom and redirect to classroom student view
    //   if (joinCode) {
    //     this.props.classroomActions.classroomJoinClassroom(joinCode)
    //   }
    // }

    return <div>
      {this.props.profile
        ? <Grid fluid>
          <Row style={{paddingTop: '2rem'}}>
            <Col sm={2} md={2}>
              { this.props.profile.avatar_url ? <FormGroup>
                <Image
                  responsive
                  src={this.props.profile.avatar_url}
                  rounded /></FormGroup>
                : null }
              <div
                ref={(node) => { this._changeImageButton = node }}
                style={{
                  fontSize: '1.3rem',
                  textAlign: 'center',
                  cursor: 'pointer'}}
                onClick={this.onChangeAvatarClick}>
                Change picture
              </div>
              <Overlay
                rootClose={Boolean(true)}
                show={this.state.showChangeImagePanel}
                onHide={() => this.setState({ showChangeImagePanel: false })}
                placement='bottom'
                container={this._changeImageButton}
                // target={() => ReactDOM.findDOMNode(this.refs.target)}
              >
                <ChangePicturePopover
                  googleAvatarUrl={this.props.profile.google_avatar_url}
                  selectedAvatar={this.props.profile.avatar_url}
                  gravatarUrl={this.props.profile.gravatar_url}
                  userAvatar={this.props.profile.user_avatar}
                  selectAvatar={this.selectAvatar} />
              </Overlay>
            </Col>
            <Col sm={5} md={5}>
              <Row>
                <Col sm={12} md={12}>
                  <h2>{this.props.profile.display_name}</h2>
                </Col>
              </Row>
            </Col>
            <Col sm={4} md={4}>
              contact info
            </Col>
          </Row>
        </Grid>
        : <Grid fluid>
          <Row>
            <Col sm={12} md={12}>
              <div style={{height: '10rem'}}>
                <div className='sweet-loading' style={{position: 'absolute'}}>
                  <RingLoader
                    color={'#1caff6'}
                    loading={Boolean(true)}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Grid>
      }
    </div>
  }
}

ProfileTabView.propTypes = {
  tabActions: PropTypes.shape({
    changeSelectedTab: PropTypes.func.isRequired
  }).isRequired,
  profileActions: PropTypes.shape({
    fetchProfile: PropTypes.func.isRequired
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  profile: PropTypes.object,
  profileId: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  return {
    // tab: tab: state.tabs.profileTab,
    profile: state.profile.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    tabActions: bindActionCreators(tabsCreators, dispatch),
    profileActions: bindActionCreators(profileCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTabView)
export { ProfileTabView as ProfileTabViewNotConnected }
