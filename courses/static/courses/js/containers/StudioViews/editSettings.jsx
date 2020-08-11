import React from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Container, Row, Col, Modal, Button } from 'react-bootstrap'

// import { loadCourseIfNeeded } from '../../actions'

import UserRightsRow from './userRightsRow'
import StaffUserRow from './staffUserRow'
import { updateCourse, deleteCourse } from '../../actions/studio'
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

class EditCourseSettingsView extends React.Component {
  constructor (props) {
    super(props)
    this.handleDeleteCourseModal = this.handleDeleteCourseModal.bind(this)
    this.deleteCourse = this.deleteCourse.bind(this)
    this.state = { showDeletCourseModal: false }
  }

  settingChanged (name, value) {
    var course = {uuid: this.props.course.uuid}
    course[name] = value
    this.props.updateCourse(course)
  }

  onRemoveFromCollaboratorsClick (collaborator) {
    var collaborators = this.props.course.collaborators
    var collaboratorsIds = []
    for (var i = 0; i < collaborators.length; i++) {
      if (collaborators[i].id !== collaborator.id) {
        collaboratorsIds.push(collaborators[i].id)
      }
    }
    var course = {uuid: this.props.course.uuid, collaborators_ids: collaboratorsIds}
    this.props.updateCourse(course)
  }

  handleDeleteCourseModal () {
    this.setState({ showDeletCourseModal: !this.state.showDeletCourseModal })
  }

  deleteCourse () {
    this.props.deleteCourse({uuid: this.props.course.uuid})
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
          value={this.props.course.setting_units_unlocked}
          onChange={(value) => { this.settingChanged('setting_units_unlocked', value) }}
          uuid={'units'}
          text={'All units unlocked (“off” means lessons unlock sequentially)'} />
        <SettingRow
          value={this.props.course.setting_modules_unlocked}
          onChange={(value) => { this.settingChanged('setting_modules_unlocked', value) }}
          uuid={'modules'}
          text={'All modules unlocked (“off” means lessons unlock sequentially)'} />
        <SettingRow
          value={this.props.course.setting_lessons_unlocked}
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
          value={this.props.course.setting_publically}
          onChange={(value) => { this.settingChanged('setting_publically', value) }}
          uuid={'publically'}
          text={'Publically viewable (“off” means course does not appear in  “Browse Curricula” )'} />
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
            <UserRightsRow course={this.props.course} />
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
            <StaffUserRow post={'owner'} staff={this.props.course.author} />
            { this.props.course.collaborators.map(function (collaborator, i) {
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
        <Modal container={this} show={this.state.showDeletCourseModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this course?
          </Modal.Body>
          <Modal.Footer>
            <button className={'editor-common-button'} onClick={this.deleteCourse}>Delete</button>
            &nbsp;
            <Button
              variant='light'
              onClick={this.handleDeleteCourseModal}>Close</Button>
          </Modal.Footer>
        </Modal>
        <Row>
          <Col sm={12} md={12}>
            <a
              style={{color: 'red', textDecoration: 'underline', cursor: 'pointer', lineHeight: '6rem'}}
              onClick={this.handleDeleteCourseModal}
            >
              Delete this course
            </a>
          </Col>
        </Row>
      </Container>
    )
  }
}

EditCourseSettingsView.propTypes = {
  // actions
  updateCourse: PropTypes.func.isRequired,
  deleteCourse: PropTypes.func.isRequired,
  // data
  course: PropTypes.object.isRequired // not reducer data
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    updateCourse: (course) => dispatch(updateCourse(course)),
    deleteCourse: (course) => { dispatch(deleteCourse(course.uuid)); history.push('/studio/studio/') }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCourseSettingsView)
export { EditCourseSettingsView as EditCourseSettingsViewNotConnected }
