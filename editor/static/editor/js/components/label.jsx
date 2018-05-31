import React from 'react';

export class EditableLabel extends React.Component {
  constructor (props) {
    super(props);
    this.state = {editing : false};
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

  }

  handleEditClick(e){
    this.setState({editing : true,
                   value : this.props.value});
  }

  handleInputChange(e){
    this.setState({'value' : e.target.value}); 
  }

  handleInputBlur(e){
    this.setState({editing : false})
  }
  
  handleFormSubmit(e){
    e.preventDefault();
    this.setState({editing:false});
    this.props.onChange(this.state.value);
    return false;
  }
  
  render () {
    if (this.state.editing){
      return (<form onSubmit={this.handleFormSubmit}>
              <input type="text" value={this.state.value} onChange={this.handleInputChange} onBlur={this.handleInputBlur}/>
              </form>)
    } else {
      return (<span>
              <span>{this.props.value}</span>
              <span onClick={this.handleEditClick} className="glyphicon glyphicon-pencil"/>              
              </span>)
    }
  }
}
