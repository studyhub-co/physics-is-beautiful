import React from 'react'
import PropTypes from 'prop-types'

export default class EditableLabel extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isEditing: this.props.isEditing || false,
      text: this.props.text || ""
    }

    this._handleFocus = this._handleFocus.bind(this)
    this._handleChange = this._handleChange.bind(this)
    this.handleEnterPressed = this.handleEnterPressed.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.text !== this.props.text) {
      this.setState({text: nextProps.text})
    }
  }

  handleEnterPressed (e) {
    if (e.keyCode === 13) {
      this._handleFocus()
    }
    return false
  }


  _handleFocus () {
    if (this.state.isEditing) {
      if (typeof this.props.onFocusOut === 'function') {
        this.props.onFocusOut(this.state.text)
      }
    }
    else {
      if (typeof this.props.onFocus === 'function') {
        this.props.onFocus(this.state.text);
      }
    }

    this.setState({
      isEditing: !this.state.isEditing
    })
  }

  _handleChange () {
    this.setState({
      text: this.textInput.value
    })
  }

  render () {
    if(this.state.isEditing) {
      return <span>
        <input type="text"
          className={this.props.inputClassName}
          ref={(input) => { this.textInput = input; }}
          value={this.state.text}
          onChange={this._handleChange}
          onBlur={this._handleFocus}
          onKeyUp={this.handleEnterPressed}
          style={{
            width: this.props.inputWidth,
            height: this.props.inputHeight,
            fontSize: this.props.inputFontSize,
            fontWeight: this.props.inputFontWeight,
            borderWidth: this.props.inputBorderWidth,
          }}
          maxLength={this.props.inputMaxLength}
          placeholder={this.props.inputPlaceHolder}
          tabIndex={this.props.inputTabIndex}
          autoFocus/>
      </span>
    }

      return <span>
          <label className={this.props.labelClassName}
              onClick={this._handleFocus}
              style={{
                fontSize: this.props.labelFontSize,
                  fontWeight: this.props.labelFontWeight,
              }}>
              {this.state.text}
          </label>
      </span>;
  }
}

EditableLabel.propTypes = {
  text: PropTypes.string.isRequired,
  isEditing: PropTypes.bool,

  labelClassName: PropTypes.string,
  labelFontSize: PropTypes.string,
  labelFontWeight: PropTypes.string,

  inputMaxLength: PropTypes.number,
  inputPlaceHolder: PropTypes.string,
  inputTabIndex: PropTypes.number,
  inputWidth: PropTypes.string,
  inputHeight: PropTypes.string,
  inputFontSize: PropTypes.string,
  inputFontWeight: PropTypes.string,
  inputClassName: PropTypes.string,
  inputBorderWidth: PropTypes.string,

  onFocus: PropTypes.func,
  onFocusOut: PropTypes.func
};