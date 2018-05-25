import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';

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
      units.push(
        <UnitContainer key={unit.uuid}
                       unit={unit}
                       history={this.props.history}
                       onDeleteClick={this.props.onDeleteUnitClick}/>);
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
  handleDrop (){
  }
  render () {
    
    const modules=[];
    for (var i=0; i<this.props.modules.length; i++){
      modules.push(
        <DockableDropTarget key={this.props.modules[i].uuid} onDrop={this.props.onModuleDroppedBefore.bind(null, this.props.modules[i])}>
          <Module {...this.props.modules[i]} history={this.props.history}/>
        </DockableDropTarget>);
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
          <DockableDropTarget onDrop={this.props.onModuleDroppedBefore.bind(null, null)}>
            <div className="col-md-1 module-accessible-block" onClick={this.props.onAddModuleClick}>
              <div className="thumbnail section-thumbnail">
                <span className="glyphicon glyphicon-plus-sign"/>
              </div>
              Add module
            </div>
          </DockableDropTarget>
        </div>
      </div>)
  }
}




export const DragItemTypes = {
  MODULE : 'module'
};


export const moduleDragSource = {
  beginDrag(props) {
    return {uuid:props.uuid};
  }
}


function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}


class Module extends React.Component {
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
    const { connectDragSource, isDragging } = this.props;
    return connectDragSource(
      <div className="col-md-1 module-accessible-block" onClick={this.handleClick} style={{opacity:isDragging?0.5:1}}>
        <div className="thumbnail section-thumbnail"><Thumbnail image={this.props.image}/></div>
        <div>{this.props.name}</div>
      </div>)
  } 
}
Module = DragSource(DragItemTypes.MODULE, moduleDragSource, collect)(Module);

export {Module};

class DockableDropTarget extends React.Component {
/*  constructor (props) {
    super(props);
    this.onDr
  }*/
  render () {
    let dockSite;
    if (this.props.dragOver){
      dockSite = <div className="dock-site"></div>;
    }
    return this.props.connectDropTarget(
      <div className="drop-target">
        {dockSite}
        {this.props.children}
      </div>
    )
  }
}

DockableDropTarget = DropTarget([DragItemTypes.MODULE],
                              {drop :function(props, monitor) {
                                props.onDrop(monitor.getItem());
                              }
                              },
                              (connect, monitor) => {
                                return {
                                  connectDropTarget: connect.dropTarget(),
                                  dragOver : monitor.isOver()
                                }
                              })(DockableDropTarget);



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
