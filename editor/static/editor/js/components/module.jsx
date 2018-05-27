import React from 'react';

import {LessonThumbnailContainer} from '../containers/lesson_thumbnail';
import {EditableThumbnail} from './thumbnail';
import {EditableLabel} from './label'
import {BackButton} from './back_button'


export class Module extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }
  handleDeleteClick(e) {
    e.preventDefault();
    if (confirm('This will permanently delete module "'+this.props.name+'" with all its lessons. Are you sure?')){
      this.props.onDeleteClick();
    }
  }
  render() {
    if (this.props.loading) {
      return <div>Loading...</div>
    }
    const lessons=[];
    for (var i=0; i<this.props.lessons.length; i++){
      lessons.push(<LessonThumbnailContainer uuid={this.props.lessons[i]}/>);
    }
    return (
      <div>        
        <BackButton link={'/curricula/' + this.props.curriculum + '/'}/>
        <h1>
          <EditableThumbnail image={this.props.image} onChange={this.props.onImageChange}/>
          <EditableLabel value={this.props.name} onChange={this.props.onNameChange}/>
          <span className="glyphicon glyphicon-remove" onClick={this.handleDeleteClick}/>
        </h1>
        <div className="row">
          {lessons}
        </div>
      </div>)
  }
}
