import { connect } from 'react-redux'

import { Course } from '../rich_components/course'

import {
  renameCourse, changeCourseImage, deleteCourse, addUnit, moveUnit,
  addCourseTag, deleteCourseTag, loadCourses
} from '../../../../actions/studio'

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  const cur = state.courses[ownProps.uuid]
  if (cur) {
    return {
      loading: false,
      name: cur.name,
      tags: cur.tags,
      image: cur.image,
      units: cur.units.map(unitUuid => state.units[unitUuid])
    }
  } else return {loading: true}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onImageChange: image => dispatch(changeCourseImage(ownProps.uuid, image)),
    onNameChange: name => dispatch(renameCourse(ownProps.uuid, name)),
    onDeleteClick: () => dispatch(deleteCourse(ownProps.uuid)),
    onAddUnitClick: () => dispatch(addUnit(ownProps.uuid)),
    onAddTag: (tag) => dispatch(addCourseTag(ownProps.uuid, tag)),
    onDeleteTag: (tag) => dispatch(deleteCourseTag(ownProps.uuid, tag)),
    onUnitDroppedBefore: (beforeUnit, unit) => dispatch(moveUnit(unit.uuid, beforeUnit)),
    loadCourses: () => dispatch(loadCourses())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Course)
