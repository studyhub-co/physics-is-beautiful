import React from 'react';

import {LessonThumbnailContainer} from '../containers/lesson_thumbnail';
import {EditableThumbnail} from './thumbnail';
import {EditableLabel} from './label'
import {BackButton} from './back_button'
import {DockableDropTarget, DragItemTypes} from '../dnd';


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
      lessons.push(
        <DockableDropTarget key={this.props.lessons[i]} onDrop={this.props.onLessonDroppedBefore.bind(null, this.props.lessons[i])} itemType={DragItemTypes.LESSON} selfUuid={this.props.lessons[i]}>
          <LessonThumbnailContainer uuid={this.props.lessons[i]}/>
        </DockableDropTarget>
      );
    }
    return (
      <div className="module">        
        <BackButton link={'/curricula/' + this.props.curriculum + '/'}/>
        <h1>
          <EditableThumbnail image={this.props.image} onChange={this.props.onImageChange}/>
          <EditableLabel value={this.props.name} onChange={this.props.onNameChange} defaultValue="New module"/>
          <span className="glyphicon glyphicon-remove" onClick={this.handleDeleteClick}/>
        </h1>
        <div className="row">
          {lessons}
          <DockableDropTarget onDrop={this.props.onLessonDroppedBefore.bind(null, null)} itemType={DragItemTypes.LESSON}>
            <div className="col-md-1 module-accessible-block btn-add-lesson" onClick={this.props.onAddLessonClick}>
              <div className="thumbnail section-thumbnail">
                <span className="glyphicon glyphicon-plus-sign"/>
              </div>
              Add lesson
            </div>
          </DockableDropTarget>
        </div>
      </div>)
  }
}
