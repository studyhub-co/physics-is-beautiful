import React from 'react'
import ReactDOM from 'react-dom'
import { Modal, Popover, OverlayTrigger, Button, OverlayMixin, FormGroup,
  ControlLabel, Checkbox, FormControl, Image, Container, Row, Col, Overlay } from 'react-bootstrap'

import { getAxios, API_PREFIX } from './utils'

// This code is deprecated

function ChangePicturePopover (props) {
  return (
    <div
      // className={className}
      style={{
        width: '30rem',
        textAlign: 'left',
        border: 'solid 1px #c8ccd0',
        boxShadow: '0 1px 5px rgba(12,13,14,0.3)',
        zIndex: '3000',
        // position: 'absolute',
        position: 'relative',
        padding: '1.5rem',
        backgroundColor: '#FFF',
        top: '0'
      }}
    >
      <h4>Change your picture</h4>
      <Container fluid style={{padding: 0}}>
        {/*TODO create component frow avatar row*/}
        { props.userAvatar ? <div><Row className={'pointer'} onClick={() => { props.selectAvatar('u') }}>
          <Col sm={3} md={3}>
            <Image
              responsive
              rounded
              src={props.userAvatar} />
          </Col>
          <Col sm={7} md={7} className={'vcenter'}>
            <h4>Uploaded picture</h4>
          </Col>
          <Col sm={1} md={1}>
            { props.selectedAvatar === 'u' ? <span className='glyphicon glyphicon-ok' /> : null }
          </Col>
        </Row><hr /></div> : null }
        { props.googleAvatarUrl ? <div><Row className={'pointer'} onClick={() => { props.selectAvatar('g')}}>
          <Col sm={3} md={3}>
            <Image
              responsive
              rounded
              src={props.googleAvatarUrl} />
          </Col>
          <Col sm={7} md={7} className={'vcenter'}>
            <h4>Google</h4>
          </Col>
          <Col sm={1} md={1}>
            { props.selectedAvatar === 'g' ? <span className='glyphicon glyphicon-ok' /> : null }
          </Col>
        </Row><hr /></div> : null }
        { props.gravatarUrl ? <div><Row className={'pointer'} onClick={() => props.selectAvatar('a')}>
          <Col sm={3} md={3}>
            <Image
              responsive
              rounded
              src={props.gravatarUrl} />
          </Col>
          <Col sm={7} md={7} className={'vcenter'}>
            <h4>Gravatar</h4>
          </Col>
          <Col sm={1} md={1}>
            { props.selectedAvatar === 'a' ? <span className='glyphicon glyphicon-ok' /> : null }
          </Col>
        </Row><hr /></div> : null }
      </Container>
    </div>
  )
}

export default class LoggedInForm extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.onChangeAvatarClick = this.onChangeAvatarClick.bind(this)
    this.selectAvatar = this.selectAvatar.bind(this)

    this.state = {
      showChangeImagePanel: false
    }
  }

  selectAvatar (type) {
    getAxios().patch(API_PREFIX + 'me', {selected_avatar: type}).then((response) => {
      // close overlay + reeload profile
      // this.setState({ showChangeImagePanel: false })
      this.props.profileToState(response.data)
    })
  }

  onChangeAvatarClick () {
    this.setState({ showChangeImagePanel: true })
  }

  render () {
    return (
      <form>
        <Container fluid>
          <Row>
            <Col sm={3} md={3}>
              { this.props.avatarUrl ? <FormGroup>
                <Image
                  responsive
                  src={this.props.avatarUrl}
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
                <ChangePicturePopover {...this.props} selectAvatar={this.selectAvatar} />
              </Overlay>
            </Col>
            <Col sm={9} md={9}>
              <FormGroup>
                <ControlLabel>First Name</ControlLabel>
                <FormControl
                  type='text'
                  value={this.props.firstName}
                  placeholder='First'
                  onChange={this.props.firstNameChange}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Last Name</ControlLabel>
                <FormControl
                  type='text'
                  value={this.props.lastName}
                  placeholder='Last'
                  onChange={this.props.lastNameChange}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Display Name</ControlLabel>
                <FormControl
                  type='text'
                  value={this.props.displayName}
                  placeholder='Display'
                  onChange={this.props.displayNameChange}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Sound Enabled</ControlLabel>
                <Checkbox checked={this.props.soundEnabled} onChange={this.props.toggleSound}/>
              </FormGroup>
            </Col>
          </Row>
        </Container>
      </form>
    )
  }
}