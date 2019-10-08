import { connect } from 'react-redux'

import { goToMaterial, deleteMaterial } from '../../../../actions/studio'

import { MaterialThumbnail } from '../rich_components/material_thumbnail'

const mapStateToProps = (state, ownProps) => {
  const uuid = ownProps.uuid || ownProps.match.params.uuid
  var q = state.studio.materials[uuid]
  return {
    shortText: q.text
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const uuid = ownProps.uuid || ownProps.match.params.uuid
  return {
    onClick: e => dispatch(goToMaterial(uuid)),
    onDeleteClick: () => dispatch(deleteMaterial(uuid))
  }
}

export const MaterialThumbnailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MaterialThumbnail)
