import React from 'react';
import { connect } from 'react-redux'

import { DropTarget } from 'react-dnd';

import { history } from '../history';

import {ModuleThumbnail} from '../components/module_thumbnail';

import {DragItemTypes} from '../dnd';

import {moveLesson } from '../actions';

const mapStateToProps = (state, ownProps) => {
  var mod = state.modules[ownProps.uuid];
  return {
    name : mod.name,
    image : mod.image,
    onClick : () => { history.push('/modules/'+ownProps.uuid+'/') },
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLessonDrop : (lessonUuid) => dispatch(moveLesson(lessonUuid, ownProps.uuid)),
    }
}
        

 
export const ModuleThumbnailContainer = connect(mapStateToProps, mapDispatchToProps)(
  DropTarget(DragItemTypes.LESSON,
             {drop :function(props, monitor) {
               props.onLessonDrop(monitor.getItem().uuid);
             }
             },
             (connect, monitor) => {
               return {
                 connectDropTarget: connect.dropTarget(),
                 dragOver : monitor.isOver()
               }
             })(ModuleThumbnail));
