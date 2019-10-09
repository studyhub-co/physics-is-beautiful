import { connect } from 'react-redux'
import { Lesson } from '../rich_components/lesson'

import {
  renameLesson,
  changeLessonImage,
  loadLessonIfNeeded,
  deleteLesson,
  addMaterial
} from '../../../../actions/studio'

const mapStateToProps = (state, ownProps) => {
  const uuid = ownProps.uuid || ownProps.match.params.uuid
  const lesson = state.studio.lessons[uuid]
  if (lesson) {
    let previousMaterial, nextMaterial

    if (state.studio.currentMaterial) {
      const idx = lesson.materials.indexOf(state.studio.currentMaterial)
      if (idx > 0) { previousMaterial = lesson.materials[idx - 1] }
      if (idx < lesson.materials.length - 1) { nextMaterial = lesson.materials[idx + 1] }
    }

    return {
      uuid: uuid,
      loading: false,
      name: lesson.name,
      image: lesson.image,
      module: lesson.module,
      materials: lesson.materials,
      previousMaterial: previousMaterial,
      nextMaterial: nextMaterial,
      currentMaterial: state.studio.currentMaterial
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
    onImageChange: image => dispatch(changeLessonImage(uuid, image)),
    onNameChange: name => dispatch(renameLesson(uuid, name)),
    onDeleteClick: () => dispatch(deleteLesson(uuid)),
    loadLessonIfNeeded: () => dispatch(loadLessonIfNeeded(uuid)),
    onAddMaterialClick: () => dispatch(addMaterial(uuid))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lesson)
