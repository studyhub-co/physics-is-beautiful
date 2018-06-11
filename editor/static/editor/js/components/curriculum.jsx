import React from 'react';

import {EditableThumbnail} from './thumbnail'
import {UnitContainer} from '../containers/unit';
import {EditableLabel} from './label'
import {DockableDropTarget, DragItemTypes} from '../dnd';


export class Curriculum extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }
  handleDeleteClick(e) {
    e.preventDefault();
    if (confirm('This will permanently delete curricilum "'+this.props.name+'" with all its materials. Are you sure?')){
      this.props.onDeleteClick();
    }
  }
  render() {
    if (this.props.loading) 
      return <div>Loading...</div>
    const units = [];
    for (var i in this.props.units){
      var unit = this.props.units[i];
      units.push(
        <DockableDropTarget key={unit.uuid} onDrop={this.props.onUnitDroppedBefore.bind(null, unit.uuid)} itemType={DragItemTypes.UNIT} selfUuid={unit.uuid}>
          <UnitContainer key={unit.uuid} uuid={unit.uuid} />
         </DockableDropTarget>);
    }
    var nameLabel;
    if (this.props.name != 'Default Curriculum'){
      nameLabel = <EditableLabel value={this.props.name} onChange={this.props.onNameChange} defaultValue="New curriculum"/>;
    } else {
      nameLabel = <span>{this.props.name}</span>
    }
    return (
      <div className="curriculum">
        <h1>
          <EditableThumbnail image={this.props.image} onChange={this.props.onImageChange}/>          
          {nameLabel}
          <span className="glyphicon glyphicon-remove" onClick={this.handleDeleteClick}/>
          <a href={'/curriculum/' + this.props.uuid + '/'} className="btn btn-default" target="_blank"><span className="glyphicon glyphicon-new-window"/> Open student view</a>
        </h1>
        {units}
        <DockableDropTarget onDrop={this.props.onUnitDroppedBefore.bind(null, null)} itemType={DragItemTypes.UNIT}>
            <a onClick={this.props.onAddUnitClick} className="btn btn-primary">Add Unit</a>
        </DockableDropTarget>
      </div>
    )
  }
}
