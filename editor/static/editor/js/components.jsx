import React from 'react';
import {LessonContainer, UnitContainer} from './containers';

function Thumbnail(props) {
  if (props.image){
    return <img src={props.image}/>
  } else {
    return <span className="glyphicon glyphicon-picture"/>
  }
}

export class EditableThumbnail extends React.Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e){
    this.props.onChange(e.target.files[0]);
  }
  render () {
    return (
      <div className="selectable-image">
        <Thumbnail image={this.props.image}/>
        <input type="file" name="image" accept="image/*" onChange={this.handleChange}/>
      </div>
    )
  }
}

export class Curriculum extends React.Component {
  render() {
    return (
      <div className="col-md-1 module-accessible-block" onClick={this.props.onClick}>
        <div className="thumbnail section-thumbnail">
          <Thumbnail image={this.props.image}/>
        </div>
        <div>{this.props.name}</div>
      </div>
    )
  }
}


export class EditableLabel extends React.Component {
  constructor (props) {
    super(props);
    this.state = {editing : false};
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

  }

  handleEditClick(e){
    this.setState({editing : true,
                   value : this.props.value});
  }

  handleInputChange(e){
    this.setState({'value' : e.target.value}); 
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
              <input type="text" value={this.state.value} onChange={this.handleInputChange}/>
              </form>)
    } else {
      return (<span>
              <span>{this.props.value}</span>
              <span onClick={this.handleEditClick} className="glyphicon glyphicon-pencil"/>              
              </span>)
    }
  }
}




export class CurriculumDetails extends React.Component {
  render() {
    const units = [];
    for (var i=0; i<this.props.units.length; i++){
      var unit = this.props.units[i];
      units.push(<UnitContainer key={unit.uuid} unit={unit} history={this.props.history} onDeleteClick={this.props.onDeleteUnitClick}/>);
    }
    return (
      <div>
        <h1>
          <EditableThumbnail image={this.props.image} onChange={this.props.onImageChange}/>          
          <EditableLabel value={this.props.name} onChange={this.props.onNameChange}/>
          <span className="glyphicon glyphicon-remove" onClick={this.props.onDeleteClick}/>
        </h1>
        {units}
        <a onClick={this.props.onAddUnitClick} className="btn btn-primary">Add Unit</a>
      </div>
    )
  }
}


export class Unit extends React.Component {
  render () {
    const modules=[];
    for (var i=0; i<this.props.modules.length; i++){
      modules.push(<Module key={this.props.modules[i].uuid} {...this.props.modules[i]} history={this.props.history}/>);
    }
   
    return (
      <div>
        <div className="section-title">
          <h2>
            <EditableThumbnail image={this.props.image} onChange={this.props.onImageChange}/>          
            <EditableLabel value={this.props.name} onChange={this.props.onNameChange}/>
            <span className="glyphicon glyphicon-remove" onClick={this.props.onDeleteClick}/>
          </h2>
        </div>
        <div className="row">
          {modules}
          <div className="col-md-1 module-accessible-block" onClick={this.props.onAddModuleClick}>
            <div className="thumbnail section-thumbnail">
              <span className="glyphicon glyphicon-plus-sign"/>
            </div>
            Add module
          </div>
        </div>
      </div>)
  }
}

export class Module extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e){
    this.props.history.push('/modules/'+this.props.uuid+'/')
    e.preventDefault();
    return false;
  }
  render () {
    return (<div className="col-md-1 module-accessible-block" onClick={this.handleClick}>
            <div className="thumbnail section-thumbnail"><Thumbnail image={this.props.image}/></div>
            <div>{this.props.name}</div>
            </div>)
  }
  
}

export class ModuleDetails extends React.Component {
  render() {
    const lessons=[];
    for (var i=0; i<this.props.lessons.length; i++){
      lessons.push(<LessonContainer lesson={this.props.lessons[i]}/>);
    }
    return (
      <div>
        <h1>
          <EditableThumbnail image={this.props.image} onChange={this.props.onImageChange}/>
          <EditableLabel value={this.props.name} onChange={this.props.onNameChange}/>
          <span className="glyphicon glyphicon-remove" onClick={this.props.onDeleteClick}/>
        </h1>
        <div className="row">
          {lessons}
        </div>
      </div>)
  }
}

export class Lesson extends React.Component {
  render() {
    return (
      <div className="col-md-1 module-accessible-block">
        <div className="thumbnail section-thumbnail"><EditableThumbnail image={this.props.image} onChange={this.props.onImageChange}/></div>
        <div><EditableLabel value={this.props.name} onChange={this.props.onNameChange}/></div>
      </div>)    
  }
}
