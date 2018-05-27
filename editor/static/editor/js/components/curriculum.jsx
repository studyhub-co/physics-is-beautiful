import React from 'react';

import {EditableThumbnail} from './thumbnail'
import {UnitContainer} from '../containers/unit';
import {EditableLabel} from './label'

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
        <UnitContainer key={unit.uuid} uuid={unit.uuid} />);
    }
    return (
      <div>
        <h1>
          <EditableThumbnail image={this.props.image} onChange={this.props.onImageChange}/>          
          <EditableLabel value={this.props.name} onChange={this.props.onNameChange}/>
          <span className="glyphicon glyphicon-remove" onClick={this.handleDeleteClick}/>
        </h1>
        {units}
        <a onClick={this.props.onAddUnitClick} className="btn btn-primary">Add Unit</a>
      </div>
    )
  }
}
