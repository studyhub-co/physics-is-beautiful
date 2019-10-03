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
  const mod = state.studio.modules[uuid]
  if (mod) {
    return {
      loading: false,
      name: mod.name,
      tags: mod.tags,
      image: mod.image,
      lessons: mod.lessons || [],
      course: mod.course
    }
  } else { return {loading: true} }
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
