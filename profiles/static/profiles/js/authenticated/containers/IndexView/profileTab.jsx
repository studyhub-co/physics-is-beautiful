import React from 'react'

import PropTypes from 'prop-types'
// import { Route } from 'react-router'
// import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Container, Row, Col, Overlay, Image, FormGroup } from 'react-bootstrap'
import { FaPencilAlt, FaUser, FaEye, FaClock } from 'react-icons/fa'
import { RingLoader } from 'react-spinners'
import Moment from 'react-moment'

import * as tabsCreators from '../../actions/tab'
import * as profileCreators from '../../actions/profile'

import ChangePicturePopover from '../../components/ChangePicturePopover'
import { EditableExternalEventLabel } from '../../utils/editableLabel'

class ProfileTabView extends React.Component {
  constructor (props, context) {
    super(props, context)

    // TODO refactor this
    // editFirstNameClick => editClick['FirstName']
    // onTitleChanged => editClick['FirstName']
    // this.state.firstNameEditMode => this.state.EditModes['firstName']
    // etc...

    this.onChangeAvatarClick = this.onChangeAvatarClick.bind(this)
    this.selectAvatar = this.selectAvatar.bind(this)
    this.onFirstNameChanged = this.onFirstNameChanged.bind(this)
    this.onLastNameChanged = this.onLastNameChanged.bind(this)
    this.onDisplayNameChanged = this.onDisplayNameChanged .bind(this)
    this.editFirstNameClick = this.editFirstNameClick.bind(this)
    this.editLastNameClick = this.editLastNameClick.bind(this)
    this.editDisplayNameClick = this.editDisplayNameClick.bind(this)

    this.state = {
      showChangeImagePanel: false,
      firstNameEditMode: false,
      lastNameEditMode: false,
      displayNameEditMode: false
    }
  }

  componentWillMount () {
    if (!this.props.profile && !this.props.profile_fetching) {
      this.props.profileActions.fetchProfile(this.props.profileId)
    }
    // this.props.tabActions.changeSelectedTab('profile', 'profileTab', this.props.match.params.id, false)
  }

  selectAvatar (type) {
    this.setState({ showChangeImagePanel: false })

    if (type === this.props.profile.selected_avatar) {
      return
    }

    var profile = {id: this.props.profile.id, selected_avatar: type}
    this.props.profileActions.updateReloadProfile(profile)
  }

  onFirstNameChanged (name) {
    this.setState({firstNameEditMode: false})

    if (name === this.props.profile.first_name) {
      return
    }

    var profile = {id: this.props.profile.id, first_name: name}
    this.props.profileActions.updateReloadProfile(profile)
  }

  onLastNameChanged (name) {
    this.setState({lastNameEditMode: false})

    if (name === this.props.profile.last_name) {
      return
    }

    var profile = {id: this.props.profile.id, last_name: name}
    this.props.profileActions.updateReloadProfile(profile)
  }

  onDisplayNameChanged (name) {
    this.setState({displayNameEditMode: false})

    if (name === this.props.profile.display_name) {
      return
    }

    var profile = {id: this.props.profile.id, display_name: name}
    this.props.profileActions.updateReloadProfile(profile)
  }

  onChangeAvatarClick () {
    this.setState({ showChangeImagePanel: !this.state.showChangeImagePanel })
  }

  editFirstNameClick () {
    this.setState({
      firstNameEditMode: true
    })
  }

  editLastNameClick () {
    this.setState({
      lastNameEditMode: true
    })
  }

  editDisplayNameClick () {
    this.setState({
      displayNameEditMode: true
    })
  }

  render () {
    return <div>
      {this.props.profile
        ? <Container fluid>
          <Row style={{paddingTop: '2rem'}}>
            <Col sm={2} md={2}>
              { this.props.profile.avatar_url ? <FormGroup>
                <Image
                  fluid
                  src={this.props.profile.avatar_url}
                  rounded /></FormGroup>
                : null }
              {this.props.profile.is_current_user_profile
                ? <div>
                  {/*<div*/}
                    {/*ref={(node) => { this._changeImageButton = node }}*/}
                    {/*style={{*/}
                      {/*fontSize: '1.3rem',*/}
                      {/*textAlign: 'center',*/}
                      {/*cursor: 'pointer'}}*/}
                    {/*onClick={this.onChangeAvatarClick}>*/}
                    {/*Change picture*/}
                  {/*</div>*/}
                  <div
                    title={'Change avatar'}
                    className={'base-circle-edit bottom-circle-edit'}
                    onClick={this.onChangeAvatarClick}
                    ref={(node) => { this._changeImageButton = node }}
                  >
                    {/*<Glyphicon*/}
                      {/*glyph={'pencil'}*/}
                      {/*style={{fontSize: '2rem', top: '1rem'}} />*/}
                    <FaPencilAlt style={{fontSize: '2rem', cursor: 'pointer'}} />
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
                </div>
                : null }
            </Col>
            <Col sm={5} md={5}>
              <Row>
                <Col sm={12} md={12}>
                  {!this.props.profile.is_current_user_profile
                    ? <h2>{this.props.profile.display_name}</h2>
                    : <h2><EditableExternalEventLabel
                      value={this.props.profile.display_name}
                      onChange={this.onDisplayNameChanged}
                      editMode={this.state.displayNameEditMode}
                    />
                    <span style={{position: 'relative', paddingLeft: '1rem'}}>
                      <span className={'base-circle-edit'}>
                        {/*<Glyphicon*/}
                          {/*glyph={'pencil'}*/}
                          {/*onClick={this.editDisplayNameClick}*/}
                          {/*style={{fontSize: '2rem'}} />*/}
                        <FaPencilAlt
                          style={{fontSize: '2rem'}}
                          onClick={this.editDisplayNameClick}
                        />
                      </span>
                    </span>
                    </h2> }
                </Col>
              </Row>
              <Row style={{fontSize: '2rem'}}>
                <Col sm={6} md={6} xs={12}>
                  {!this.props.profile.is_current_user_profile
                    ? null
                    : <span>
                      <EditableExternalEventLabel
                        value={this.props.profile.first_name}
                        onChange={this.onFirstNameChanged}
                        editMode={this.state.firstNameEditMode}
                      />
                      <span style={{position: 'relative', paddingLeft: '1rem'}}>
                        <span className={'base-circle-edit'}>
                          <FaPencilAlt
                            style={{fontSize: '2rem'}}
                            onClick={this.editFirstNameClick}
                          />
                          {/*<Glyphicon*/}
                            {/*glyph={'pencil'}*/}
                            {/*onClick={this.editFirstNameClick}*/}
                            {/*style={{fontSize: '2rem', top: '1rem'}} />*/}
                        </span>
                      </span>
                    </span>
                  }
                </Col>
                <Col sm={6} md={6} xs={12}>
                  {!this.props.profile.is_current_user_profile
                    ? null
                    : <span>
                      <EditableExternalEventLabel
                        value={this.props.profile.last_name}
                        onChange={this.onLastNameChanged}
                        editMode={this.state.lastNameEditMode}
                      />
                      <span style={{position: 'relative', paddingLeft: '1rem'}}>
                        <span className={'base-circle-edit'}>
                          {/*<Glyphicon*/}
                            {/*glyph={'pencil'}*/}
                            {/*onClick={this.editLastNameClick}*/}
                            {/*style={{fontSize: '2rem', top: '1rem'}} />*/}
                          <FaPencilAlt
                            style={{fontSize: '2rem', top: '1rem'}}
                            onClick={this.editLastNameClick}
                          />
                        </span>
                      </span>
                    </span> }
                </Col>
              </Row>
            </Col>
            <Col sm={4} md={4}>
              <Row>
                <Col sm={12} md={12}>
                  {/*<Glyphicon*/}
                    {/*glyph={'user'} />*/}
                  <FaUser /> Member for <Moment toNow>
                    {this.props.profile.created_on}
                  </Moment>
                </Col>
              </Row>
              <Row>
                <Col sm={12} md={12}>
                  {/*<Glyphicon*/}
                    {/*glyph={'eye-open'} />*/}
                  <FaEye /> {this.props.profile.profile_views || 0} profile views
                </Col>
              </Row>
              { this.props.profile.last_activity
                ? <Row>
                  <Col sm={12} md={12}>
                    {/*<Glyphicon*/}
                      {/*glyph={'time'} />*/}
                    <FaClock /> Last seen <Moment fromNow>
                      {this.props.profile.last_activity}
                    </Moment>
                  </Col>
                </Row> : null }
            </Col>
          </Row>
        </Container>
        : <Container fluid>
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
        </Container>
      }
    </div>
  }
}

ProfileTabView.propTypes = {
  tabActions: PropTypes.shape({
    changeSelectedTab: PropTypes.func.isRequired
  }).isRequired,
  profileActions: PropTypes.shape({
    fetchProfile: PropTypes.func.isRequired,
    updateReloadProfile: PropTypes.func.isRequired
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  profile_fetching: PropTypes.bool,
  profile: PropTypes.object,
  profileId: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  return {
    // tab: tab: state.tabs.profileTab,
    profile: state.profile.profile,
    profile_fetching: state.profile.fetching
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
