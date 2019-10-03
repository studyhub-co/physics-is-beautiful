import { connect } from 'react-redux'

import { Course } from '../rich_components/course'

import {
  renameCourse, changeCourseImage, deleteCourse, addUnit, moveUnit,
  addCourseTag, deleteCourseTag, loadCourses
} from '../../../../actions/studio'

const mapStateToProps = (state, ownProps) => {
  const uuid = ownProps.match.params.uuid
  const cur = state.studio.courses[uuid]

  if (cur) {
    return {
      loading: false,
      name: cur.name,
      tags: cur.tags,
      uuid: uuid,
      image: cur.image,
      units: cur.units.map(unitUuid => state.studio.units[unitUuid])
    }
  } else return {loading: true}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const uuid = ownProps.match.params.uuid

  return {
    onImageChange: image => dispatch(changeCourseImage(uuid, image)),
    onNameChange: name => dispatch(renameCourse(uuid, name)),
    onDeleteClick: () => dispatch(deleteCourse(uuid)),
    onAddUnitClick: () => dispatch(addUnit(uuid)),
    onAddTag: (tag) => dispatch(addCourseTag(uuid, tag)),
    onDeleteTag: (tag) => dispatch(deleteCourseTag(uuid, tag)),
    onUnitDroppedBefore: (beforeUnit, unit) => dispatch(moveUnit(unit.uuid, beforeUnit)),
    loadCourses: () => dispatch(loadCourses())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Course)
