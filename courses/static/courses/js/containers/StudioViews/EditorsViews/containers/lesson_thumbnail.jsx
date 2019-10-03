import { connect } from 'react-redux'

import history from '../../../../history'
import { BASE_URL } from '../../../../utils/config'
import { LessonThumbnail } from '../rich_components/lesson_thumbnail'

const mapStateToProps = (state, ownProps) => {
  const uuid = ownProps.uuid || ownProps.match.params.uuid
  var les = state.studio.lessons[uuid]
  return {
    name: les.name,
    image: les.image,
    onClick: () => { history.push(BASE_URL + 'studio/editor/lessons/' + uuid + '/') }
  }
}

export const LessonThumbnailContainer = connect(mapStateToProps)(LessonThumbnail)
