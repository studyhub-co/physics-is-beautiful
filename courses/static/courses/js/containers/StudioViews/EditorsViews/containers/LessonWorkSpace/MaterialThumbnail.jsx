import React from 'react'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
import { FaGripHorizontal, FaTimes } from 'react-icons/fa'

import Paper from '@material-ui/core/Paper'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import { goToMaterial, deleteMaterial } from '../../../../../actions/studio'
import { DragItemTypes } from '../../../../../dnd'

export const dragSource = {
  beginDrag (props) {
    return { uuid: props.uuid }
  }
}

function collect (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

const initialState = {
  // context menu
  mouseX: null,
  mouseY: null
}

const MaterialThumbnailComponent = props => {
  const {
    onDeleteClick, selected, isDragging, onClick,
    connectDragSource, shortText, screenshot, position,
    connectDragPreview
  } = props

  const [state, setState] = React.useState(initialState)

  // context menu
  const handleMaterialThumbnailClick = event => {
    event.preventDefault()
    setState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4
    })
  }

  const handleContextMenuClose = () => {
    setState(initialState)
  }

  function handleDeleteClick (e) {
    e.preventDefault()
    if (window.confirm('Are you sure you want to delete this material?')) {
      onDeleteClick()
    }
  }

  return (<Paper
    onClick={onClick}
    onContextMenu={handleMaterialThumbnailClick}
    elevation={3}
    className={
      'material-thumbnail draggable' +
          (selected ? ' selected' : '')
    }> {connectDragPreview(
      <div
        style={{ display: isDragging ? 'none' : 'block', overflow: 'hidden' }}
      >
        {connectDragSource(<span className='drag-handle'><FaGripHorizontal /></span>)}
        <span className='position'>{position}</span>
        <div className='thumbnail-inner'>
          {screenshot
            ? <img src={screenshot} style={{height: '100%', width: '100%'}}/>
            : <span>{shortText}</span>
          }
        </div>
        <FaTimes className='btn-delete' onClick={handleDeleteClick} />
        <Menu
          keepMounted
          open={state.mouseY !== null}
          onClose={handleContextMenuClose}
          anchorReference='anchorPosition'
          anchorPosition={
            state.mouseY !== null && state.mouseX !== null
              ? { top: state.mouseY, left: state.mouseX }
              : undefined
          }
        >
          <MenuItem onClick={handleContextMenuClose}>Fork</MenuItem>
          <MenuItem onClick={handleContextMenuClose}>Delete</MenuItem>
        </Menu>
      </div>
    )
    } </Paper>)
}

MaterialThumbnailComponent.propTypes = {
  shortText: PropTypes.string,
  screenshot: PropTypes.string,
  onClick: PropTypes.func,
  uuid: PropTypes.string, // material uuid
  position: PropTypes.string, // material position
  lessonUuid: PropTypes.string.isRequired, // lesson uuid
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  isDragging: PropTypes.bool,
  selected: PropTypes.bool
}

const mapStateToProps = (state, ownProps) => {
  const uuid = ownProps.uuid || ownProps.match.params.uuid
  var q = state.studio.materials[uuid]
  return {
    shortText: q.name,
    screenshot: q.screenshot,
    position: q.position
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const uuid = ownProps.uuid || ownProps.match.params.uuid
  return {
    onClick: e => dispatch(goToMaterial(uuid, ownProps.lessonUuid)),
    onDeleteClick: () => dispatch(deleteMaterial(uuid))
  }
}

export default DragSource(DragItemTypes.MATERIAL, dragSource, collect)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MaterialThumbnailComponent)
)
