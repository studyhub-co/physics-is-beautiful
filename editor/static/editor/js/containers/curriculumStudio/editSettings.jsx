import React from 'react'

import { connect } from 'react-redux'

import PropTypes from 'prop-types'
import { Grid, Row, Col } from 'react-bootstrap'

// import { loadCurriculumIfNeeded } from '../../actions'

import UserRightsRow from './userRightsRow'
import StaffUserRow from './staffUserRow'
import { updateCurriculum } from '../../actions'

class SettingRow extends React.Component {
  constructor (props) {
    super(props)

    if (this.props.value) {
      this.state = {
        [props.uuid + 'checked']: 'on'
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
  settingChanged (name, value) {
    var curriculum = {uuid: this.props.curriculum.uuid}
    curriculum[name] = value
    this.props.updateCurriculum(curriculum)
  }

  render () {
    return (
      <Grid fluid>
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
              return <StaffUserRow post={'collaborator'} staff={collaborator} key={i} />
            })}
          </Col>
        </Row>
      </Grid>
    )
  }
}

EditCurriculumSettingsView.propTypes = {
  // actions
  updateCurriculum: PropTypes.func.isRequired,
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
    updateCurriculum: (searchString) => dispatch(updateCurriculum(searchString))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCurriculumSettingsView)
export { EditCurriculumSettingsView as EditCurriculumSettingsViewNotConnected }
