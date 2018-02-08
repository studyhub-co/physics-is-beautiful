import React from 'react';
import { Modal, Popover, OverlayTrigger, Button, OverlayMixin, FormGroup, ControlLabel, Checkbox, FormControl } from 'react-bootstrap';


class Form extends React.Component {

    render() {
        return (
            <form>
                <FormGroup>
                    <ControlLabel>First Name</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.props.firstName}
                        placeholder="First"
                        onChange={this.props.firstNameChange}
                    />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Last Name</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.props.lastName}
                        placeholder="First"
                        onChange={this.props.lastNameChange}
                    />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Sound Enabled</ControlLabel>
                    <Checkbox checked={this.props.soundEnabled} onChange={this.props.toggleSound}/>
                </FormGroup>
            </form>
        );
    }

}


class AnonymousForm extends React.Component {

    render() {
        return (
            <form>
                <FormGroup>
                    <ControlLabel>Sound settings</ControlLabel>
                    <Checkbox checked={this.props.soundEnabled} onChange={this.props.toggleSound}>
                        Sound enabled
                    </Checkbox>

                </FormGroup>
            </form>
        );
    }

}


class ProfileControl extends React.Component {

    render() {
        var name, form;
        if (this.props.firstName && this.props.lastName) {
            name = this.props.firstName + " " + this.props.lastName;
            form = <Form {...this.props} />;
        } else {
            name = "Settings";
            form = <AnonymousForm {...this.props} />;
        }
        return (
                <li className="nav-item">
                    <a className = 'settings' onClick={this.props.open}>
                        {name}
                    </a>
                    <Modal className = 'settings-modal' show={this.props.show} onHide={this.props.close} aria-labelledby="ModalHeader">
                        <Modal.Header closeButton>
                            <Modal.Title>Profile</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            {form}
                        </Modal.Body>

                        <Modal.Footer>
                            <Button bsStyle="primary" onClick={this.props.save}>Save changes</Button>
                        </Modal.Footer>
                    </Modal>
                </li>
        );
    }

}


export default class ProfileModalApp extends React.Component {

    constructor() {
        super();
        this.state = {
            soundEnabled: true,
            firstName: null,
            lastName: null,
            show: false,
        };
        this.fetchProfile();
    }

    toggleSound(event) {
        var newState = !this.state.soundEnabled;
        this.setState({soundEnabled: newState});
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
    }

    modalSave(event) {
        this.updateProfile(event);
        this.modalClose(event, true);
    }

    firstNameChange(event) {
        this.setState({firstName: event.target.value});
    }

    lastNameChange(event) {
        this.setState({lastName: event.target.value});
    }

    profileToState(profile) {
        this.setState({
            firstName: profile.first_name,
            lastName: profile.last_name,
            soundEnabled: profile.sound_enabled,
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
                soundEnabled={this.state.soundEnabled}
                show={this.state.show}
                toggleSound={this.toggleSound.bind(this)}
                open={this.modalOpen.bind(this)}
                close={this.modalClose.bind(this)}
                save={this.modalSave.bind(this)}
                firstNameChange={this.firstNameChange.bind(this)}
                lastNameChange={this.lastNameChange.bind(this)}
                updateProfile={this.updateProfile.bind(this)}
            />
        );
    }
}
