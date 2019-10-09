import { connect } from 'react-redux'

import { Unit } from '../rich_components/unit'
import {
  renameUnit,
  changeUnitImage,
  deleteUnit,
  addModule,
  moveModule,
  // moveLesson,
  addUnitTag,
  deleteUnitTag
} from '../../../../actions/studio'

const mapStateToProps = (state, ownProps) => {
  const uuid = ownProps.uuid || ownProps.match.params.uuid
  const unit = state.studio.units[uuid]
  return {
    loading: false,
    name: unit.name,
    tags: unit.tags,
    image: unit.image,
    course: unit.course,
    modules: unit.modules
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const uuid = ownProps.uuid || ownProps.match.params.uuid

  return {
    onImageChange: image => dispatch(changeUnitImage(uuid, image)),
    onNameChange: name => dispatch(renameUnit(uuid, name)),
    onDeleteClick: () => dispatch(deleteUnit(uuid)),
    onAddModuleClick: () => dispatch(addModule(uuid)),
    onAddTag: (tag) => dispatch(addUnitTag(uuid, tag)),
    onDeleteTag: (tag) => dispatch(deleteUnitTag(uuid, tag)),
    onModuleDroppedBefore: (beforeModuleUuid, draggedItem) => {
      dispatch(moveModule(draggedItem.uuid, uuid, beforeModuleUuid))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Unit)
