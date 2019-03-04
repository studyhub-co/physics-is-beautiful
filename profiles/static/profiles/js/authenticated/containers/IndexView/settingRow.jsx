import React from 'react'

import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'

// TODO move to lib app
export default class SettingRow extends React.Component {
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
