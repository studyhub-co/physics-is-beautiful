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
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.handleDocumentKeyPress = this.handleDocumentKeyPress.bind(this);
  }

  handleEditClick(e){
    this.setState({editing : true,
                   value : this.props.value});
  }

  handleEnterPressed(e){
    var val = this._editorMQ.latex();
    this.setState({editing:false});
    this.props.onChange(val);
    
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

  registerBlurHandlers(){
    $(document).on('click', this.handleDocumentClick);
    $(document).on('keyup', this.handleDocumentKeyPress);
  }
  detachBlurHandlers() {
    $(document).off('click', this.handleDocumentClick);
    $(document).off('keyup', this.handleDocumentKeyPress);

  }

  handleDocumentKeyPress(e) {
    if (e.which == 27){
      this.doBlur()
    }
  }
  handleDocumentClick(e){
    if (!this._editor.contains(e.target))
        this.doBlur();
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
    } else {
      this._labelMQ = MQ.StaticMath(this._label);
    }
  }
  
  componentDidMount(){
    this.enableMQ();
  }

  componentDidUpdate(){
    this.enableMQ();
  }
  
  render () {
      return (<span>
              <span ref={this.state.editing ? this.setEditorRef : this.setLabelRef} key={this.state.editing ? 'editing' : ''}>{this.props.value}</span>
              <span onClick={this.handleEditClick} className="glyphicon glyphicon-pencil"/>              
              </span>)
  }
}
