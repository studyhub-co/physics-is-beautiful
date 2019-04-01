import React from 'react'

import { connect } from 'react-redux'

import PropTypes from 'prop-types'
import { Container, Row, Col, Modal, Button } from 'react-bootstrap'

// import { loadCurriculumIfNeeded } from '../../actions'

import UserRightsRow from './userRightsRow'
import StaffUserRow from './staffUserRow'
import { updateCurriculum, deleteCurriculum } from '../../actions'
import { history } from '../../history'

// TODO move to lib app
class SettingRow extends React.Component {
  constructor (props) {
    super(props)

    if (this.props.value) {
      this.state = {
        [props.uuid + 'checked']: 'on',
      }
    } else {
      this.state = {
        [props.uuid + 'checked']: 'off'
      }
    }
    this.handleSettingsChange = this.handleSettingsChange.bind(this)
  }

  handleSettingsChange (e, uuid) {
    var checked = 'on'
    if (this.state[uuid + 'checked'] === 'on') {
      checked = 'off'
    }
    this.setState({[uuid + 'checked']: checked})
    if ('onChange' in this.props) {
      this.props.onChange(checked)
    }
  }

  render () {
    var style = {}

    return (
      <Row>
        <Col sm={2} md={2}>
          <div className={'pure-radiobutton'}>
            <input
              id={'radio_on' + this.props.uuid}
              value={'on'}
              name={'settings' + this.props.uuid}
              style={style}
              onChange={(e) => (this.handleSettingsChange(e, this.props.uuid))}
              type='radio'
              checked={this.state[this.props.uuid + 'checked'] === 'on'} />
            <label htmlFor={'radio_on' + this.props.uuid}>{'On'}</label>
          </div>
        </Col>
        <Col sm={2} md={2}>
          <div className={'pure-radiobutton'}>
            <input
              id={'radio_off' + this.props.uuid}
              value={'off'}
              name={'settings' + this.props.uuid}
              style={style}
              onChange={(e) => (this.handleSettingsChange(e, this.props.uuid))}
              type='radio'
              checked={this.state[this.props.uuid + 'checked'] === 'off'} />
            <label htmlFor={'radio_off' + this.props.uuid}>{'Off'}</label>
          </div>
        </Col>
        <Col sm={8} md={8}>
          {this.props.text}
        </Col>
      </Row>)
  }
}

SettingRow.propTypes = {
  text: PropTypes.string,
  uuid: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.bool
}

class EditCurriculumSettingsView extends React.Component {
  constructor (props) {
    super(props)
    this.handleDeleteCurriculumModal = this.handleDeleteCurriculumModal.bind(this)
    this.deleteCurriculum = this.deleteCurriculum.bind(this)
    this.state = { showDeletCurriculumModal: false }
  }

  settingChanged (name, value) {
    var curriculum = {uuid: this.props.curriculum.uuid}
    curriculum[name] = value
    this.props.updateCurriculum(curriculum)
  }

  onRemoveFromCollaboratorsClick (collaborator) {
    var collaborators = this.props.curriculum.collaborators
    var collaboratorsIds = []
    for (var i = 0; i < collaborators.length; i++) {
      if (collaborators[i].id !== collaborator.id) {
        collaboratorsIds.push(collaborators[i].id)
      }
    }
    var curriculum = {uuid: this.props.curriculum.uuid, collaborators_ids: collaboratorsIds}
    this.props.updateCurriculum(curriculum)
  }

  handleDeleteCurriculumModal () {
    this.setState({ showDeletCurriculumModal: !this.state.showDeletCurriculumModal })
  }

  deleteCurriculum () {
    this.props.deleteCurriculum({uuid: this.props.curriculum.uuid})
  }

  render () {
    return (
      <Container fluid>
        <Row>
          <Col sm={12} md={12}>
            <div className={'blue-title'}>
              Unlocking
            </div>
          </Col>
        </Row>
        <SettingRow
          value={this.props.curriculum.setting_units_unlocked}
          onChange={(value) => { this.settingChanged('setting_units_unlocked', value) }}
          uuid={'units'}
          text={'All units unlocked (“off” means lessons unlock sequentially)'} />
        <SettingRow
          value={this.props.curriculum.setting_modules_unlocked}
          onChange={(value) => { this.settingChanged('setting_modules_unlocked', value) }}
          uuid={'modules'}
          text={'All modules unlocked (“off” means lessons unlock sequentially)'} />
        <SettingRow
          value={this.props.curriculum.setting_lessons_unlocked}
          onChange={(value) => { this.settingChanged('setting_lessons_unlocked', value) }}
          uuid={'lessons'}
          text={'All lessons unlocked (“off” means lessons unlock sequentially)'} />
        <br />
        <Row>
          <Col sm={12} md={12}>
            <div className={'blue-title'}>
              Viewing
            </div>
          </Col>
        </Row>
        <SettingRow
          value={this.props.curriculum.setting_publically}
          onChange={(value) => { this.settingChanged('setting_publically', value) }}
          uuid={'publically'}
          text={'Publically viewable (“off” means curriculum does not appear in  “Browse Curricula” )'} />
        <br />
        <Row>
          <Col sm={12} md={12}>
            <div className={'blue-title'}>
              Editing
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={12}>
            <UserRightsRow curriculum={this.props.curriculum} />
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={12}>
            <div className={'blue-title'}>
              Who has access
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={12}>
            <StaffUserRow post={'owner'} staff={this.props.curriculum.author} />
            { this.props.curriculum.collaborators.map(function (collaborator, i) {
              return <StaffUserRow
                post={'collaborator'}
                staff={collaborator}
                key={i}
                onRemoveFromCollaboratorsClick={() => { this.onRemoveFromCollaboratorsClick(collaborator) }} />
            }, this)}
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={12}>
            <div className={'blue-title'}>
              Danger Zone
            </div>
          </Col>
        </Row>
        <Modal container={this} show={this.state.showDeletCurriculumModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this curriculum?
          </Modal.Body>
          <Modal.Footer>
            <button className={'editor-common-button'} onClick={this.deleteCurriculum}>Delete</button>
            &nbsp;
            <Button onClick={this.handleDeleteCurriculumModal}>Close</Button>
          </Modal.Footer>
        </Modal>
        <Row>
          <Col sm={12} md={12}>
            <a
              style={{color: 'red', textDecoration: 'underline', cursor: 'pointer', lineHeight: '6rem'}}
              onClick={this.handleDeleteCurriculumModal}
            >
              Delete this curriculum
            </a>
          </Col>
        </Row>
      </Container>
    )
  }
}

EditCurriculumSettingsView.propTypes = {
  // actions
  updateCurriculum: PropTypes.func.isRequired,
  deleteCurriculum: PropTypes.func.isRequired,
  // data
  curriculum: PropTypes.object.isRequired // not reducer data
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    updateCurriculum: (curriculum) => dispatch(updateCurriculum(curriculum)),
    deleteCurriculum: (curriculum) => { dispatch(deleteCurriculum(curriculum.uuid)); history.push('/studio/studio/') }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCurriculumSettingsView)
export { EditCurriculumSettingsView as EditCurriculumSettingsViewNotConnected }
