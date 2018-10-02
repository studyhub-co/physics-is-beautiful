import React from 'react'

import { connect } from 'react-redux'

import PropTypes from 'prop-types'
import { Grid, Row, Col } from 'react-bootstrap'
import { loadCurriculumIfNeeded } from '../../actions'

class SettingsString extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      [props.uuid + 'checked']: 'off'
    }
    this.handleSettingsChange = this.handleSettingsChange.bind(this)
  }

  handleSettingsChange (e, uuid) {
    var checked = 'on'
    if (this.state[uuid + 'checked'] === 'on') {
      checked = 'off'
    }
    this.setState({[uuid + 'checked']: checked})
  }

  render () {
    // var style = {marginRight: '10px', width: '10px', display: 'inline-block'}

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

SettingsString.propTypes = {
  text: PropTypes.string,
  uuid: PropTypes.string.isRequired
}

class EditCurriculumSettingsView extends React.Component {
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
        <SettingsString uuid={'units'} text={'All units unlocked (“off” means lessons unlock sequentially)'} />
        <SettingsString uuid={'modules'} text={'All modules unlocked (“off” means lessons unlock sequentially)'} />
        <SettingsString uuid={'lessons'} text={'All lessons unlocked (“off” means lessons unlock sequentially)'} />
      </Grid>
    )
  }
}

EditCurriculumSettingsView.propTypes = {
  // actions
  loadCurriculum: PropTypes.func.isRequired,
  // data
  curricula: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    curricula: state.curricula
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    loadCurriculum: (uuid) => dispatch(loadCurriculumIfNeeded(uuid))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCurriculumSettingsView)
export { EditCurriculumSettingsView as EditCurriculumSettingsViewNotConnected }
