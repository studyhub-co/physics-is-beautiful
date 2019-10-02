import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'

import history from '../../../../history'

import { BASE_URL } from '../../../../utils/config'
import { DragItemTypes } from '../../../../dnd'
import { ModuleThumbnail } from '../rich_components/module_thumbnail'
import { moveLesson } from '../../../../actions/studio'

const mapStateToProps = (state, ownProps) => {
  const uuid = ownProps.uuid || ownProps.match.params.uuid
  var mod = state.studio.modules[uuid]
  return {
    name: mod.name,
    image: mod.image,
    onClick: () => { history.push(BASE_URL + 'studio/editor/modules/' + uuid + '/') }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const uuid = ownProps.uuid || ownProps.match.params.uuid
  return {
    onLessonDrop: (lessonUuid) => dispatch(moveLesson(lessonUuid, uuid))
  }
}

export const ModuleThumbnailContainer = connect(mapStateToProps, mapDispatchToProps)(
  DropTarget(DragItemTypes.LESSON,
    {drop: function (props, monitor) {
      props.onLessonDrop(monitor.getItem().uuid)
    }
    },
    (connect, monitor) => {
      return {
        connectDropTarget: connect.dropTarget(),
        dragOver: monitor.isOver()
      }
    })(ModuleThumbnail))
