import { connect } from 'react-redux'

import { Module } from '../rich_components/module'

import {
  renameModule,
  changeModuleImage,
  deleteModule,
  moveLesson,
  addLesson,
  addModuleTag,
  deleteModuleTag,
  loadModuleIfNeeded
} from '../../../../actions/studio'

const mapStateToProps = (state, ownProps) => {
  const uuid = ownProps.uuid || ownProps.match.params.uuid
  const module = state.studio.modules[uuid]
  if (module) {
    return {
      uuid: uuid,
      loading: false,
      name: module.name,
      tags: module.tags,
      image: module.image,
      lessons: module.lessons || [],
      course: module.course
    }
  } else {
    return {
      loading: true,
      uuid: uuid
    }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const uuid = ownProps.uuid || ownProps.match.params.uuid
  return {
    onImageChange: image => dispatch(changeModuleImage(uuid, image)),
    onNameChange: name => dispatch(renameModule(uuid, name)),
    onDeleteClick: () => dispatch(deleteModule(uuid)),
    onAddTag: (tag) => dispatch(addModuleTag(uuid, tag)),
    onDeleteTag: (tag) => dispatch(deleteModuleTag(uuid, tag)),
    onLessonDroppedBefore: (beforeLessonUuid, draggedItem) =>
      dispatch(moveLesson(draggedItem.uuid, uuid, beforeLessonUuid)),
    onAddLessonClick: () => dispatch(addLesson(uuid)),
    loadModuleIfNeeded: () => dispatch(loadModuleIfNeeded(uuid))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Module)
