import React from 'react'
import { Modal, Popover, OverlayTrigger, Button, OverlayMixin, FormGroup,
  ControlLabel, Checkbox, FormControl, Image, Row, Col } from 'react-bootstrap'

import LoggedInForm from './profile_logged_in_form'

class AnonymousForm extends React.Component {
  render () {
    return (
      <form>
        <FormGroup>
          <ControlLabel>Sound settings</ControlLabel>
          <Checkbox checked={this.props.soundEnabled} onChange={this.props.toggleSound}>
              Sound enabled
          </Checkbox>
        </FormGroup>
      </form>
    )
  }
}

class ProfileControl extends React.Component {

  render () {
    var name, form
    if (!this.props.isAnonymous) {
      if(!(this.props.firstName) && !(this.props.lastName)){
        name = 'Profile'
      } else {
        name = this.props.firstName + ' ' + this.props.lastName
      }
      form = <LoggedInForm {...this.props} />
    } else {
      name = 'Settings'
      form = <AnonymousForm {...this.props} />
    }
    return (
      <span>
        {/*<li className='nav-item'>*/}
        <span className='settings' onClick={this.props.open}>
          {name}
        </span>
        <Modal className='settings-modal' show={this.props.show} onHide={this.props.close} aria-labelledby='ModalHeader'>
          <Modal.Header closeButton>
            <Modal.Title>Profile</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {form}
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle='primary' onClick={this.props.save} disabled={this.props.hasErrors}>Save changes</Button>
          </Modal.Footer>
        </Modal>
         {/*</li>*/}
      </span>
    )
  }
}

export default class ProfileModalApp extends React.Component {

    constructor() {
        super();
        this.state = {
            soundEnabled: true,
            firstName: '',
            lastName: '',
            displayName: '',
            show: false,
            hasErrors: true
        };
        this.fetchProfile();
    }

    toggleSound(event) {
        var newState = !this.state.soundEnabled;
        this.setState({
          soundEnabled: newState,
          hasErrors: false
        });
        SoundSingleton.soundEnabled = newState;
        if (SoundSingleton.soundEnabled) {
            unpauseBackgroundAudio();
        } else {
            pauseBackgroundAudio();
        }
    }

    modalOpen(event) {
        this.preSaveSoundEnabled = this.state.soundEnabled;
        this.setState({show: true});
    }

    modalClose(event, saved) {
        var newState = {show: false};
        if (saved !== true) {
            newState['soundEnabled'] = this.preSaveSoundEnabled;
        }
        this.setState(newState);
        SoundSingleton.soundEnabled = this.preSaveSoundEnabled;
        // reload user profile, if it was chaned change, but not save
        this.fetchProfile();
    }

    modalSave(event) {
        this.updateProfile(event);
        this.modalClose(event, true);
    }

    firstNameChange(event) {
        var hasErrors = true
        if(event.target.value){hasErrors = false}
        this.setState({firstName: event.target.value,
            hasErrors: hasErrors
        });
    }

    lastNameChange(event) {
        var hasErrors = true
        if(event.target.value){hasErrors = false}
        this.setState({lastName: event.target.value,
            hasErrors: hasErrors
        });
    }
    
    displayNameChange(event) {
        var hasErrors = true
        if(event.target.value){hasErrors = false}
        this.setState({
            displayName: event.target.value,
            hasErrors: hasErrors
          });
    }

    profileToState(profile) {
        this.setState({
            firstName: profile.first_name,
            lastName: profile.last_name,
            displayName: profile.display_name,
            soundEnabled: profile.sound_enabled,
            isAnonymous: profile.is_anonymous,
            selectedAvatar: profile.selected_avatar,
            googleAvatarUrl: profile.google_avatar_url,
            gravatarUrl: profile.gravatar_url,
            userAvatar: profile.user_avatar,
            avatarUrl: profile.avatar_url
        });
        SoundSingleton.soundEnabled = profile.sound_enabled;
    }

    fetchProfile(lookupId) {
        $.ajax({
            async: true,
            url: '/api/v1/profiles/me',
            context: this,
            success: function(data, status, jqXHR) {
                this.profileToState(data);
            }
        });
    }

    updateProfile(profileData) {
        var profile = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            display_name: this.state.displayName,
            sound_enabled: this.state.soundEnabled,
        };
        $.ajax({
            type: 'PATCH',
            url: '/api/v1/profiles/me',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(profile),
            context: this,
            success: function(data, status, jqXHR) {
                this.profileToState(data);
            }
        });
    }

    render() {
        return (
            <ProfileControl
                firstName={this.state.firstName}
                lastName={this.state.lastName}
                displayName={this.state.displayName}
                soundEnabled={this.state.soundEnabled}
                hasErrors={this.state.hasErrors}
                isAnonymous={this.state.isAnonymous}
                avatar_url={this.state.avatar_url}
                googleAvatarUrl={this.state.googleAvatarUrl}
                gravatarUrl={this.state.gravatarUrl}
                userAvatar={this.state.userAvatar}
                avatarUrl={this.state.avatarUrl}
                selectedAvatar={this.state.selectedAvatar}
                show={this.state.show}
                toggleSound={this.toggleSound.bind(this)}
                open={this.modalOpen.bind(this)}
                close={this.modalClose.bind(this)}
                save={this.modalSave.bind(this)}
                firstNameChange={this.firstNameChange.bind(this)}
                lastNameChange={this.lastNameChange.bind(this)}
                displayNameChange={this.displayNameChange.bind(this)}
                updateProfile={this.updateProfile.bind(this)}
                profileToState={this.profileToState.bind(this)}
            />
        );
    }
}
