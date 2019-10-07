import { connect } from 'react-redux'
import { Lesson } from '../rich_components/lesson'

import {
  renameLesson,
  changeLessonImage,
  loadLessonIfNeeded,
  // changeLessonType,
  // changeLessonGameType,
  deleteLesson
} from '../../../../actions/studio'

const mapStateToProps = (state, ownProps) => {
  const uuid = ownProps.uuid || ownProps.match.params.uuid
  const les = state.studio.lessons[uuid]
  if (les) {
    return {
      loading: false,
      name: les.name,
      image: les.image,
      module: les.module,
      // lesson_type: les.lesson_type,
      // game_type: les.game_type,
      questions: les.questions,
      currentQuestion: state.studio.currentQuestion
    }
  } else { return { loading: true } }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const uuid = ownProps.uuid || ownProps.match.params.uuid
  return {
    onImageChange: image => dispatch(changeLessonImage(uuid, image)),
    onNameChange: name => dispatch(renameLesson(uuid, name)),
    onDeleteClick: () => dispatch(deleteLesson(uuid)),
    loadLessonIfNeeded: () => dispatch(loadLessonIfNeeded(uuid))
  //   onTypeChange: newType => dispatch(changeLessonType(ownProps.uuid, newType)),
  //   onGameTypeChange: e =>
  //     dispatch(changeLessonGameType(ownProps.uuid, e.target.value)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lesson)
