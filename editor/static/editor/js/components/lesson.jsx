import React from 'react';

import {EditableThumbnail} from './thumbnail'
import {EditableLabel} from './label'
import {BackButton} from './back_button'


export class Lesson extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }
  handleDeleteClick(e) {
    e.preventDefault();
    if (confirm('This will permanently delete lesson "'+this.props.name+'" with all its questions. Are you sure?')){
      this.props.onDeleteClick();
    }
  }
  render() {
    if (this.props.loading) {
      return <div>Loading...</div>
    }
    return (
      <div>        
        <BackButton link={'/modules/' + this.props.module + '/'}/>
        <h1>
          <EditableThumbnail image={this.props.image} onChange={this.props.onImageChange}/>
          <EditableLabel value={this.props.name} onChange={this.props.onNameChange}/>
          <span className="glyphicon glyphicon-remove" onClick={this.handleDeleteClick}/>
        </h1>
      </div>)
  }
}
