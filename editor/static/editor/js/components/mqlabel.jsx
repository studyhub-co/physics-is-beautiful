import React from 'react';

var MQ = MathQuill.getInterface(2);

export class MQEditableLabel extends React.Component {
  constructor (props) {
    super(props);
    this.state = {editing : false};
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleEnterPressed = this.handleEnterPressed.bind(this);
    this.setLabelRef = this.setLabelRef.bind(this);
    this.setEditorRef = this.setEditorRef.bind(this);
    this.setButtonRef = this.setButtonRef.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.handleDocumentKeyPress = this.handleDocumentKeyPress.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this._buttonsRefs = [];
  }

  handleEditClick(e){
    this.setState({editing : true,
                   value : this.props.value});
  }

  save(){
    var val = this._editorMQ.latex();    
    this.setState({editing:false});
    this.props.onChange(val);
    this.detachBlurHandlers()
  }
  
  handleEnterPressed(e){
    this.save();
    return false;
  }

  setLabelRef(element) {
    this._label = element;
    if (this._label == null && this._labelMQ)
      this._labelMQ.revert();
  }

  setEditorRef(element) {
    this._editor = element;
    if (this._editor == null && this._editorMQ) {
      this._editorMQ.revert();
      this.detachBlurHandlers();
    }
  }

  setButtonRef(idx, ref){
    this._buttonsRefs[idx] = ref;
  }
  
  
  registerBlurHandlers(){
    document.addEventListener('click',this.handleDocumentClick);
    document.addEventListener('keyup', this.handleDocumentKeyPress);
  }
  detachBlurHandlers() {
    document.removeEventListener('click', this.handleDocumentClick);
    document.removeEventListener('keyup', this.handleDocumentKeyPress);

  }

  handleDocumentKeyPress(e) {
    if (e.which == 27){
      this.doBlur()
    }
  }
  handleDocumentClick(e){
    if (!this._editor.contains(e.target))
        this.save();
  }
  doBlur() {
    this.detachBlurHandlers()
    this.setState({'editing' : false})
  }

  componentWillUnmount() {
    this.detachBlurHandlers()
  }
  
  enableMQ() {
    if (this.state.editing) {
      this._editorMQ = MQ.MathField(this._editor, {
        handlers: {
          edit: this.handleInputChange,
          enter: this.handleEnterPressed,
        }
      });
      this._editorMQ.focus();
      this.registerBlurHandlers();
      for (var i in this._buttonsRefs){
        MQ.StaticMath(this._buttonsRefs[i]);
      }

    } else {
      this._labelMQ = MQ.StaticMath(this._label);
    }
  }

  handleButtonClick(i, e) {
    e.preventDefault()
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    this._editorMQ.write(this.props.buttons[i])
    this._editorMQ.focus()
  }
  
  componentDidMount(){
    this.enableMQ();
  }

  componentDidUpdate(){
    this.enableMQ();
  }
  
  render () {
    var buttons;
    if (this.state.editing && this.props.buttons){
      var btns = []
      for (var b in this.props.buttons) {
        btns.push(<a className="mq-editor-button" key={b} ref={this.setButtonRef.bind(null, b)} onClick={this.handleButtonClick.bind(null, b)} >{this.props.buttons[b]}</a>)
      }
      buttons = <span className="buttons">{btns}</span>
    }
    var isEmpty = !this.props.value || (this.props.value.replace(/\\/g, '').trim().length == 0)
    return (<span className={'mq-editable-label' + (isEmpty ? ' empty' : '')}>
            <span onClick={this.handleEditClick} className={this.state.editing ? 'editing' : ''} ref={this.state.editing ? this.setEditorRef : this.setLabelRef} key={this.state.editing ? 'editing' : ''}>{this.props.value}</span>
            {!this.state.editing && <span onClick={this.handleEditClick} className="glyphicon glyphicon-pencil"/>}
            {buttons}
            </span>)
  }
}



