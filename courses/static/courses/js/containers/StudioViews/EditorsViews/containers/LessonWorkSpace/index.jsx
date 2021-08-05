import React, { useEffect, useRef, useState } from 'react'

import './styles.css'

import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Edit from '@material-ui/icons/Edit'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode'
import Slideshow from '@material-ui/icons/Slideshow'
import { FaTimes } from 'react-icons/fa' // FaPlusCircle

import {
  renameLesson,
  changeLessonImage,
  loadLessonIfNeeded,
  deleteLesson,
  addMaterial,
  moveMaterial,
  updateMaterialImage,
  changeCompleteBoundary,
} from '../../../../../actions/studio'
import { updateProblemTypeImage } from '../../../../../actions/problemType'

import { DockableDropTarget, DragItemTypes } from '../../../../../dnd'
import { EditableThumbnail } from '../../../../../components/thumbnail'
import { EditableLabel } from '../../../../../components/editableLabel'
import MaterialThumbnail from './MaterialThumbnail'
import ToolBar from './Menu/ToolBar'
import WorkspaceMenu from './Menu/Menu'
import Search from './Codesandbox/Search/index'
import asyncEditor from './Codesandbox/Editor/index'

import { StyledIframe } from './Styles'

import {
  useCurrentMaterialHasType,
  useMaterialTypePropIsInMaterial,
  useHandleMaterialDroppedBefore,
} from './Hooks/materials'
import { useHandleDeleteLessonClick } from './Hooks/lesson'
import { useLayoutMode } from './Hooks/LayoutMenu'
import { useIframeLoaded } from './Hooks/eval'
import useFullscreenStatus from './Hooks/fullScreenStatus'
import { useBodyClass } from './Hooks/bodyCss'
import { checkSaveButtonStyle } from '../../../../CoursesViews/components/style'
import { saveDataMessage } from '../../../../../utils/iframe/postMessages'

function useForceUpdate() {
  const [value, setValue] = useState(0) // integer state
  return () => setValue(value => value + 1) // update the state to force render
}

const Lesson = props => {
  const {
    // lesson data + actions
    uuid,
    name,
    image,
    loading,
    completeBoundary,
    loadLessonIfNeeded,
    onImageChange,
    onDeleteClick,
    onNameChange,
    onCompleteBoundaryChange,
    // materials
    materials,
    materialUrlUuid,
    moveMaterial,
    currentMaterial,
    onAddMaterialClick,
    onUpdateMaterialImage,
    // material problem type
    onUpdateProblemTypeImage,
  } = props

  const history = useHistory()

  useBodyClass(`height100`)

  const [isFullscreen, setIsFullscreen] = useFullscreenStatus(document)
  const forceUpdate = useForceUpdate()

  // eval iframe
  let executionFrameRef = useRef(null)
  const onLoadIframe = useIframeLoaded() // TODO move setFrameRef to Hook
  const setFrameRef = node =>
    (executionFrameRef = ((!node || !node.contentWindow) && null) || node) // we want a reference to an iframe

  // materials
  const currentMaterialHasType = useCurrentMaterialHasType(currentMaterial)
  const materialTypePropIsInMaterial = useMaterialTypePropIsInMaterial(
    currentMaterial,
  )

  // lesson
  let handleDeleteLessonClick = e => {
    useHandleDeleteLessonClick(e, onDeleteClick, name)
  }

  // menu

  // Layout Modes:
  // 1) Student view ('student')
  // 2) Content edit mode ('edit')
  // 2) Material type edit mode ('type')
  const [layoutMode, setLayoutMode] = useLayoutMode('student')

  // fixme: decompose into multiple state variables based on which values tend to change together.
  const [state, setState] = React.useState({
    editor: <div></div>,
  })

  // todo move to separate hook
  const [
    lessonSettingsDialogOpen,
    setLessonSettingsDialogOpen,
  ] = React.useState(false)

  const [lessonCompleteBoundary, setLessonCompleteBoundary] = React.useState(
    completeBoundary || 70,
  )

  useEffect(() => {
    // loaded from server
    setLessonCompleteBoundary(completeBoundary)
  }, [completeBoundary])

  const handleSettingsDialog = value => {
    setLessonSettingsDialogOpen(value)
  }

  useEffect(() => {
    // async load editor after Lesson component did mount
    async function asyncEditorStartUp() {
      let editor = await asyncEditor()
      setState({ ...state, editor: editor })
    }
    asyncEditorStartUp()
  }, [])

  useEffect(() => {
    loadLessonIfNeeded(materialUrlUuid)
    // reset state view to student
    setLayoutMode('student')
  }, [materialUrlUuid])

  // materials list
  let navMaterials = []

  if (materials) {
    navMaterials = materials.map((materialUuid, index) => {
      return (
        <GridListTile key={'' + index}>
          {/* <Grid item alignContent={'center'}> */}
          <DockableDropTarget
            key={materialUuid}
            onDrop={dropSource =>
              useHandleMaterialDroppedBefore(
                dropSource.uuid,
                materialUuid,
                moveMaterial,
              )
            }
            itemType={DragItemTypes.MATERIAL}
            selfUuid={materialUuid}
          >
            <MaterialThumbnail
              key={materialUuid}
              uuid={materialUuid}
              lessonUuid={uuid}
              index={index + 1}
              selected={
                currentMaterial && currentMaterial.uuid === materialUuid
              }
            />
          </DockableDropTarget>
          {/* </Grid> */}
        </GridListTile>
      )
    })
  }

  // main menu click
  const onWorkspaceMenuChange = (e, menuId) => {
    const [section, action] = menuId.split('.')
    if (section === 'view') {
      setLayoutMode(action)
    }

    if (section === 'actions') {
      if (action === 'learn_lesson') {
        history.push(`/courses/lessons/${uuid}/`)
      }
      if (action === 'learn_material') {
        if (currentMaterialHasType) {
          history.push(
            `/courses/lessons/${uuid}/materials/${currentMaterial.uuid}/`,
          )
        } else {
          alert('Current material has no type!')
        }
      }
      if (action === 'standalone_material') {
        // this url not use in SPA application
        if (currentMaterialHasType) {
          window.open(
            mptEvalUrl(currentMaterial.material_problem_type),
            '_blank',
          )
        } else {
          alert('Current material has no type!')
        }
      }
    }
    if (section === 'lesson') {
      setLessonSettingsDialogOpen(true)
    }
  }

  // TODO make it reusable
  // Fixme replace mpt with currentMaterial.material_problem_type?
  const mptEvalUrl = mpt => {
    if (mpt && mpt.hasOwnProperty('id')) {
      return `${window.location.origin}/evaluation/${mpt.id}/${currentMaterial.uuid}/${uuid}/?standalone`
    } else {
      return ''
    }
  }

  // render component
  if (loading) {
    return <div>Loading...</div>
  }

  const editorComponent = state.editor

  const calculateFullHeightEditor = () => {
    // viewport - header - menu - toolbar
    // const bottomPanelsHeight = 'calc(100vh - 51px - 108px - 35px)'
    const appBarHeight = document.getElementById('app-bar')?.clientHeight
    const lessonTitleHeight = document.getElementById('lesson-title-menu-bar')
      ?.clientHeight
    const lessonToolbarHeight = document.getElementById('lesson-toolbar')
      ?.clientHeight

    return `calc(100vh - ${appBarHeight}px -
        ${lessonTitleHeight}px - ${lessonToolbarHeight}px - 0.2rem)`
  }

  let bottomPanelsHeight

  const appBarHeight = document.getElementById('app-bar')?.clientHeight

  // TODO find what is 0,2 rem
  if (isFullscreen) {
    bottomPanelsHeight = `calc(100vh - ${appBarHeight}px - 0.2rem)`
  } else {
    bottomPanelsHeight = calculateFullHeightEditor()
    if (appBarHeight == bottomPanelsHeight) {
      // refresh editor if is not fullscreen & lesson title is hidden
      // (lesson-toolbar and lesson-toolbar height == 0) // not so good fixme
      setTimeout(function() {
        // wait for DOM update
        forceUpdate()
      }, 2000)
    }
  }

  return (
    <Grid container>
      <Grid
        container
        item
        xs={12}
        style={{
          padding: '1rem',
          display: isFullscreen ? 'none' : 'flex',
        }}
        id={'lesson-title-menu-bar'}
      >
        <Grid item sm={1}>
          <EditableThumbnail image={image} onChange={onImageChange} />
        </Grid>
        <Grid item sm={8}>
          <div>
            <h1>
              <EditableLabel
                value={name}
                onChange={onNameChange}
                defaultValue="New lesson"
              />
              <FaTimes onClick={handleDeleteLessonClick} />
            </h1>
          </div>
          <div>
            <WorkspaceMenu
              onChange={onWorkspaceMenuChange}
              handleAddMaterial={onAddMaterialClick} // why it's outside from 'onChange'?
            />
            <Dialog
              fullWidth
              open={lessonSettingsDialogOpen}
              onClose={() => {
                handleSettingsDialog(false)
              }}
              aria-labelledby="lesson-settings-dialog-title"
            >
              <DialogTitle id="lesson-settings-dialog-title">
                Lesson settings
              </DialogTitle>
              <DialogContent>
                <TextField
                  onChange={event => {
                    setLessonCompleteBoundary(event.target.value)
                  }}
                  value={lessonCompleteBoundary}
                  autoFocus
                  margin="dense"
                  id="boundary"
                  label="Lesson complete boundary (percent)"
                  type="number"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    handleSettingsDialog(false)
                  }}
                  color="primary"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    // TODO validate value
                    onCompleteBoundaryChange(lessonCompleteBoundary)
                    handleSettingsDialog(false)
                  }}
                  color="primary"
                >
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Grid>
        <Grid item sm={3}>
          {/* TODO move to component */}
          <FormControl variant="outlined">
            <Select
              value={layoutMode}
              onChange={e => {
                setLayoutMode(e.target.value)
              }}
            >
              <MenuItem value={'student'}>
                <Slideshow />
                &nbsp;Student view
              </MenuItem>
              <MenuItem value={'edit'}>
                <Edit />
                &nbsp;Content edit mode
              </MenuItem>
              <MenuItem value={'type'}>
                <ChromeReaderModeIcon />
                &nbsp;Material type edit mode
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        style={{
          borderTop: '1px solid #dadce0',
          borderBottom: '1px solid #dadce0',
          display: isFullscreen ? 'none' : 'flex',
        }}
        id={'lesson-toolbar'}
      >
        <ToolBar handleAddMaterial={onAddMaterialClick} />
      </Grid>
      {/* Present mode on */}
      <Grid container item xs={12} style={{ height: bottomPanelsHeight }}>
        {/* Materials list */}
        {['student', 'edit'].includes(layoutMode) ? (
          <Grid item xs={2} style={{ background: 'white' }}>
            <GridList
              className={'lesson-nav-materials'}
              cellHeight={'auto'}
              spacing={1}
              cols={1}
              style={{
                maxHeight: bottomPanelsHeight,
                padding: '0.5rem',
              }}
            >
              {/* {addMaterialButton} */}
              {navMaterials}
            </GridList>
          </Grid>
        ) : null}
        <Grid
          item
          xs={['student', 'edit'].includes(layoutMode) ? 10 : 12}
          style={{ height: bottomPanelsHeight, overflow: 'auto' }}
        >
          {/* Search if MPT does not exist in current Material */}
          {!loading && // loading lesson
          materialTypePropIsInMaterial && // loading material
          !currentMaterialHasType ? ( //
            <Search />
          ) : null}
          {/* student view */}
          <div
            style={{
              display:
                ['student', 'edit'].includes(layoutMode) &&
                materialTypePropIsInMaterial &&
                currentMaterialHasType
                  ? 'flex'
                  : 'none', // display only if material problem type is set
              height: bottomPanelsHeight,
            }}
          >
            {currentMaterialHasType && (
              <StyledIframe
                id={'student_view_iframe'}
                ref={setFrameRef}
                onLoad={e =>
                  onLoadIframe(
                    e,
                    currentMaterial.material_problem_type,
                    currentMaterial,
                    onUpdateProblemTypeImage,
                    onUpdateMaterialImage,
                    executionFrameRef,
                  )
                }
                src={mptEvalUrl(currentMaterial.material_problem_type)}
              />
            )}
            {currentMaterial && layoutMode === 'edit' && (
              <Fab
                style={{
                  ...checkSaveButtonStyle,
                  position: 'absolute',
                  bottom: '1rem',
                  right: '2rem',
                  width: '10rem',
                }}
                variant="contained"
                color="primary"
                onClick={saveDataMessage}
              >
                Save
              </Fab>
            )}
          </div>
          {/* Editor Mode */}
          <div
            style={{
              display:
                layoutMode === 'type' &&
                materialTypePropIsInMaterial &&
                currentMaterialHasType
                  ? 'flex'
                  : 'none', // display only if material problem type is set
              height: bottomPanelsHeight,
            }}
          >
            {editorComponent}
          </div>
        </Grid>
      </Grid>
    </Grid>
  )
}

Lesson.propTypes = {
  uuid: PropTypes.string.isRequired,
  currentMaterial: PropTypes.object,
  materialUrlUuid: PropTypes.string,
  completeBoundary: PropTypes.number,
  loadLessonIfNeeded: PropTypes.func.isRequired,
  onCompleteBoundaryChange: PropTypes.func.isRequired,
  onImageChange: PropTypes.func.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onAddMaterialClick: PropTypes.func.isRequired,
  moveMaterial: PropTypes.func.isRequired,
  onUpdateProblemTypeImage: PropTypes.func.isRequired,
  onUpdateMaterialImage: PropTypes.func.isRequired,
  image: PropTypes.string,
  name: PropTypes.string,
  materials: PropTypes.array,
  loading: PropTypes.bool, // this is lesson loading mark
}

const mapStateToProps = (state, ownProps) => {
  const uuid = ownProps.uuid || ownProps.match.params.uuid
  let materialUuid = null

  if (ownProps.match.params.hasOwnProperty('material_uuid')) {
    materialUuid = ownProps.match.params.material_uuid
  }

  const lesson = state.studio.lessons[uuid]
  if (lesson) {
    const currentMaterial = state.studio.currentMaterial

    return {
      uuid: uuid,
      materialUrlUuid: materialUuid,
      loading: false,
      name: lesson.name,
      completeBoundary: lesson.complete_boundary,
      image: lesson.image,
      module: lesson.module, // fixme do we need this?
      materials: lesson.materials, // this is uuids list
      materialsDict: state.studio.materials, // this is {'uuid': obj} dict with all materials ever loaded o_0
      currentMaterial: currentMaterial,
    }
  } else {
    return {
      uuid: uuid,
      materialUrlUuid: materialUuid,
      loading: true,
    }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const uuid = ownProps.uuid || ownProps.match.params.uuid
  return {
    onUpdateProblemTypeImage: (canvas, pt) =>
      dispatch(updateProblemTypeImage(pt, canvas)),
    onUpdateMaterialImage: (canvas, material) =>
      dispatch(updateMaterialImage(material, canvas)),
    onImageChange: image => dispatch(changeLessonImage(uuid, image)),
    onCompleteBoundaryChange: value =>
      dispatch(changeCompleteBoundary(uuid, value)),
    onNameChange: name => dispatch(renameLesson(uuid, name)),
    onDeleteClick: () => dispatch(deleteLesson(uuid)),
    loadLessonIfNeeded: materialUuid =>
      dispatch(loadLessonIfNeeded(uuid, materialUuid)),
    onAddMaterialClick: () => dispatch(addMaterial(uuid)),
    moveMaterial: (materialUuid, materialBeforeUuid) =>
      dispatch(moveMaterial(materialUuid, materialBeforeUuid)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lesson)
