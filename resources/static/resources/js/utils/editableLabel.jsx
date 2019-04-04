import React from 'react'
import PropTypes from 'prop-types'

import { FaPencilAlt } from 'react-icons/fa'

// TODO Need to create lib js bundle and move EditableLabel into (it uses in classroom also).

export const DEFAULT_MATHJAX_OPTIONS = {
  extensions: ['tex2jax.js'],
  jax: ['input/TeX', 'output/HTML-CSS'],
  tex2jax: {
    inlineMath: [ ['$', '$'], ['\\(', '\\)'] ],
    displayMath: [ ['$$', '$$'], ['\\[', '\\]'] ],
    processEscapes: true
  },
  'HTML-CSS': { availableFonts: ['TeX'] }
}

export class EditableLabel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {editing: false}
    this.handleEditClick = this.handleEditClick.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleInputBlur = this.handleInputBlur.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleInputKeyUp = this.handleInputKeyUp.bind(this)
    this.setInputRef = this.setInputRef.bind(this)
  }

  handleEditClick (e) {
    // edit by external event only
    if (this.props.hasOwnProperty('editableLabel') && this.props.editableLabel === false) {
      return
    }

    var val = this.props.value
    if (this.props.value === this.props.defaultValue) {
      val = ''
    }
    if (this._inputRef) {
      this.focus()
    }
    this.setState({
      editing: true,
      value: val
    })
  }

  setInputRef (ref) {
    this._inputRef = ref
    if (ref && this.state.editing) {
      this.focus()
    }
  }

  focus () {
    this._inputRef.focus()
    var v = this._inputRef.value
    this._inputRef.value = ''
    this._inputRef.value = v
  }

  handleInputChange (e) {
    this.setState({
      'value': e.target.value
    })
  }

  handleInputBlur (e) {
    this.save()
  }

  handleInputKeyUp (e) {
    if (e.which === 27){
      this.setState({
        editing: false
      })
    }
  }

  handleFormSubmit (e) {
    e.preventDefault()
    this.save()
    return false
  }

  save () {
    this.setState({editing: false})
    this.props.onChange(this.state.value)
  }

  componentDidMount () {
    MathJax.Hub.Config(DEFAULT_MATHJAX_OPTIONS);
    MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
  }
  componentDidUpdate () {
    MathJax.Hub.Config(DEFAULT_MATHJAX_OPTIONS);
    MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
  }

  render () {
    if (this.state.editing){
      return (
        <form onSubmit={this.handleFormSubmit} style={{display: 'inline'}}>
          <input
            type='text' value={this.state.value}
            onChange={this.handleInputChange} onBlur={this.handleInputBlur}
            ref={this.setInputRef} onKeyUp={this.handleInputKeyUp} />
        </form>)
    } else {
      return (
        <span
          className={'editable-label' + (((this.props.value && this.props.value.trim()) ||
            this.props.defaultValue) ? '' : ' empty')}
          onClick={this.handleEditClick}>
          <span>{this.props.value || this.props.defaultValue}</span>
          {/*<span className='glyphicon glyphicon-pencil' />*/}
          <FaPencilAlt className={'glyphicon-pencil'} />
        </span>)
    }
  }
}

export class EditableExternalEventLabel extends EditableLabel {
  enableEditMode (editMode) {
    var val = this.props.value
    if (editMode || this.props.editMode) {
      if (this.props.value === this.props.defaultValue) {
        val = ''
      }
      if (this._inputRef) {
        this.focus()
      }
      this.setState({
        editing: true,
        value: val
      })
    }
  }

  componentDidMount () {
    this.enableEditMode()
  }

  componentWillReceiveProps (props) {
    if (props.editMode) {
      this.enableEditMode(props.editMode)
    }
  }

  render () {
    var inputParams = {type: 'text',
      value: this.state.value || '',
      onChange: this.handleInputChange,
      onBlur: this.handleInputBlur,
      ref: this.setInputRef,
      onKeyUp: this.handleInputKeyUp}

    var input = <input {...inputParams} />
    if (this.props.textArea) {
      input = <textarea {...inputParams} style={{ 'width': '90%' }} />
    }
    if (this.state.editing) {
      return (
        <form onSubmit={this.handleFormSubmit} style={{display: 'inline'}}>
          {input}
        </form>)
    } else {
      return (
        <span
          className={'editable-label' + (((this.props.value && this.props.value.trim()) || this.props.defaultValue) ? '' : ' empty')}
          onClick={this.handleEditClick}
          style={{whiteSpace: 'pre-line'}}
        >
          <span>{this.props.value || this.props.defaultValue}</span>
        </span>)
    }
  }
}

// export default class EditableLabel extends React.Component {
//   constructor (props) {
//     super(props)
//
//     this.state = {
//       isEditing: this.props.isEditing || false,
//       text: this.props.text || ''
//     }
//
//     this._handleFocus = this._handleFocus.bind(this)
//     this._handleChange = this._handleChange.bind(this)
//     this.handleEnterPressed = this.handleEnterPressed.bind(this)
//   }
//
//   componentWillReceiveProps (nextProps) {
//     if (nextProps.text !== this.props.text) {
//       this.setState({text: nextProps.text})
//     }
//   }
//
//   handleEnterPressed (e) {
//     if (e.keyCode === 13) {
//       this._handleFocus()
//     }
//     return false
//   }
//
//   _handleFocus () {
//     if (this.state.isEditing) {
//       if (typeof this.props.onFocusOut === 'function') {
//         this.props.onFocusOut(this.state.text)
//       }
//     }
//     else {
//       if (typeof this.props.onFocus === 'function') {
//         this.props.onFocus(this.state.text)
//       }
//     }
//
//     this.setState({
//       isEditing: !this.state.isEditing
//     })
//   }
//
//   _handleChange () {
//     this.setState({
//       text: this.textInput.value
//     })
//   }
//
//   render () {
//     if(this.state.isEditing) {
//       return <span>
//         <input type="text"
//           className={this.props.inputClassName}
//           ref={(input) => { this.textInput = input }}
//           value={this.state.text}
//           onChange={this._handleChange}
//           onBlur={this._handleFocus}
//           onKeyUp={this.handleEnterPressed}
//           style={{
//             width: this.props.inputWidth,
//             height: this.props.inputHeight,
//             fontSize: this.props.inputFontSize,
//             fontWeight: this.props.inputFontWeight,
//             borderWidth: this.props.inputBorderWidth
//           }}
//           maxLength={this.props.inputMaxLength}
//           placeholder={this.props.inputPlaceHolder}
//           tabIndex={this.props.inputTabIndex}
//           autoFocus />
//       </span>
//     }
//
//     return <span>
//       <label className={this.props.labelClassName}
//         onClick={this._handleFocus}
//         style={{
//           fontSize: this.props.labelFontSize,
//           fontWeight: this.props.labelFontWeight
//         }}>
//         {this.state.text}
//       </label>
//     </span>
//   }
// }
//
// EditableLabel.propTypes = {
//   text: PropTypes.string.isRequired,
//   isEditing: PropTypes.bool,
//
//   labelClassName: PropTypes.string,
//   labelFontSize: PropTypes.string,
//   labelFontWeight: PropTypes.string,
//
//   inputMaxLength: PropTypes.number,
//   inputPlaceHolder: PropTypes.string,
//   inputTabIndex: PropTypes.number,
//   inputWidth: PropTypes.string,
//   inputHeight: PropTypes.string,
//   inputFontSize: PropTypes.string,
//   inputFontWeight: PropTypes.string,
//   inputClassName: PropTypes.string,
//   inputBorderWidth: PropTypes.string,
//
//   onFocus: PropTypes.func,
//   onFocusOut: PropTypes.func
// }
