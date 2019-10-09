import { connect } from 'react-redux'

import { Material } from '../rich_components/material'

import {
  changeMaterialName,
  changeMaterialSolutionText,
  changeMaterialHint,
  // changeMaterialType,
  addMaterialTag,
  deleteMaterialTag
} from '../../../../actions/studio'

const mapStateToProps = (state, ownProps) => {
  const uuid = ownProps.uuid
  const q = state.studio.materials[uuid]
  if (q) {
    var hasPictures = false

    return {
      uuid: uuid,
      loading: false,
      name: q.name,
      solution_text: q.solution_text,
      image: q.image,
      hint: q.hint,
      tags: q.tags,
      answers: q.answers,
      hasPictures: hasPictures,
      answer_type: q.answer_type
    }
  } else return { loading: true }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const uuid = ownProps.uuid
  return {
    onNameChange: name => dispatch(changeMaterialName(uuid, name)),
    onChangeSolutionText: text => dispatch(changeMaterialSolutionText(uuid, text)),
    onAddTag: tag => dispatch(addMaterialTag(uuid, tag)),
    onDeleteTag: tag => dispatch(deleteMaterialTag(uuid, tag)),
    onHintChange: hint => dispatch(changeMaterialHint(uuid, hint)),
  //   onTypeChange: e =>
  //     dispatch(changeMaterialType(uuid, e.target.value))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Material)
