import React, { useEffect, useRef } from 'react'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Edit from '@material-ui/icons/Edit'
import Slideshow from '@material-ui/icons/Slideshow'
import html2canvas from 'html2canvas'

import { dispatch as csDispatch } from 'codesandbox-api'

import { FaTimes, FaPlusCircle } from 'react-icons/fa'

import {
  renameLesson,
  changeLessonImage,
  loadLessonIfNeeded,
  deleteLesson,
  addMaterial,
  moveMaterial
} from '../../../../../actions/studio'

import {
  updateProblemTypeImage
} from '../../../../../actions/problemType'

import { DockableDropTarget, DragItemTypes } from '../../../../../dnd'

import { EditableThumbnail } from '../../../../../components/thumbnail'
import { EditableLabel } from '../../../../../components/label'

import MaterialThumbnail from './MaterialThumbnail'
// import MaterialContainer from '../../containers/material'

import ToolBar from './Menu/ToolBar'
import WorkspaceMenu from './Menu/Menu'

import Search from './Codesandbox/Search/index'
import asyncEditor from './Codesandbox/Editor/index'

import { StyledIframe } from './Styles'

const Lesson = props => {
  const {
    // lesson data + actions
    uuid, name, image, loading, loadLessonIfNeeded, onImageChange, onDeleteClick,
    onNameChange,
    // materials
    materials, materialUrlUuid, moveMaterial, currentMaterial, onAddMaterialClick,
    // material problem type
    onUpdateProblemTypeImage
  } = props

  let executionFrameRef = useRef(null)

  const [state, setState] = React.useState({
    editor: <div></div>,
    layout: 'present'
  })

  useEffect(() => {
    loadLessonIfNeeded(materialUrlUuid)

    // async load editor after Lesson component did mount
    async function asyncEditorStartUp () {
      let editor = await asyncEditor()
      setState({ ...state, editor: editor })
    }
    asyncEditorStartUp()
  }, [])

  const handleDeleteClick = e => {
    e.preventDefault()
    if (
      window.confirm(
        'This will permanently delete lesson "' +
          name +
          '" with all its materials. Are you sure?'
      )
    ) {
      onDeleteClick()
    }
  }

  const handleMaterialDroppedBefore = (materialUuid, beforeMaterialUuid) => {
    moveMaterial(materialUuid, beforeMaterialUuid)
  }

  const onMenuItemChange = (e, menuId) => {
    // main menu click
    if (menuId === 'view.present') {
      setState({ ...state, layout: 'present' })
      csDispatch({
        type: 'pib_edit_mode',
        data: 'present'
      })
    }
    if (menuId === 'view.edit') {
      setState({ ...state, layout: 'edit' })
      csDispatch({
        type: 'pib_edit_mode',
        data: 'edit'
      })
    }
  }

  const currentMaterialHasType = () => {
    if (
      currentMaterial &&
      currentMaterial.hasOwnProperty('material_problem_type') && // show only if a full version of material loaded
      currentMaterial.material_problem_type
    ) {
      return true
    } else {
      return false
    }
  }

  const materialTypePropsInMaterial = () => {
    // this mean we have no material loaded, need to wait for Material Type
    return (
      currentMaterial &&
      currentMaterial.hasOwnProperty('material_problem_type')
    )
  }

  const handleLayoutChange = name => event => {
    csDispatch({
      type: 'pib_edit_mode',
      data: event.target.value
    })

    setState({
      ...state,
      [name]: event.target.value
    })
  }

  // TODO make it reusable
  const mptEvalUrl = (mpt) => {
    if (mpt && mpt.hasOwnProperty('id')) {
      // TODO add material id to work with data
      return `${window.location.origin}/evaluation/${mpt.id}/`
    } else { return '' }
  }

  const onLoadIframe = (e, mpt) => {
    let iframeDoc = executionFrameRef.contentWindow.document
    // callback executed when canvas was found

    function handleRoot (root) {
      // get screenshot of iframe
      setTimeout(function () {
        // console.log('get screenshot')
        html2canvas(iframeDoc.body).then(function (canvas) {
          onUpdateProblemTypeImage(canvas, mpt)
        })
      }, 2000)
    }

    // set up the mutation observer
    var observer = new window.MutationObserver(function (mutations, me) {
      // `mutations` is an array of mutations that occurred
      // `me` is the MutationObserver instance
      let root = iframeDoc.getElementById('root')
      if (root) {
        handleRoot(root)
        me.disconnect() // stop observing
      }
    })

    // start observing
    observer.observe(iframeDoc.body, {
      childList: true,
      subtree: true
    })
  }

  const setFrameRef = node =>
    (executionFrameRef =
        ((!node || !node.contentWindow) && null) ||
         node // we want a reference to an iframe
    )

  // render component
  if (loading) {
    return <div>Loading...</div>
  }

  var navMaterials = []

  for (var i in materials) {
    let materialUuid = materials[i]

    navMaterials.push(
      <DockableDropTarget
        key={materialUuid}
        onDrop={dropSource =>
          handleMaterialDroppedBefore(dropSource.uuid, materialUuid)
        }
        itemType={DragItemTypes.MATERIAL}
        selfUuid={materialUuid}
      >
        <MaterialThumbnail
          key={materialUuid}
          uuid={materialUuid}
          lessonUuid={uuid}
          selected={
            currentMaterial &&
            currentMaterial.uuid === materialUuid
          }
        />
      </DockableDropTarget>
    )
  }

  const editorComponent = state.editor

  return (
    <Grid container>
      <Grid container item xs={12}>
        <Grid item xs={1}>
          <EditableThumbnail
            image={image}
            onChange={onImageChange}
          />
        </Grid>
        <Grid item xs={8}>
          <div>
            <h1>
              <EditableLabel
                value={name}
                onChange={onNameChange}
                defaultValue='New lesson'
              />
              <FaTimes onClick={handleDeleteClick} />
            </h1>
          </div>
          <div>
            <WorkspaceMenu onChange={onMenuItemChange} />
          </div>
        </Grid>
        <Grid item xs={3}>
          <FormControl variant='outlined'>
            <Select
              value={state.layout}
              onChange={handleLayoutChange('layout')}
            >
              <MenuItem value={'present'}>
                <Slideshow /> Present
              </MenuItem>
              <MenuItem value={'edit'}>
                <Edit /> Edit mode
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
          borderBottom: '1px solid #dadce0'
        }}
      >
        <ToolBar />
      </Grid>
      {/* Present mode on */}
      <Grid container item xs={12} spacing={4}>
        {/* Materials list */}
        {state.layout === 'present' ? (
          <Grid item xs={2}>
            <div
              style={{
                display: 'flex',
                maxHeight: '80vh',
                flexDirection: 'column'
              }}
            >
              <div
                style={{
                  overflowY: 'auto',
                  /* for Firefox */
                  flexGrow: 1,
                  minHeight: 0
                }}
                className={'lesson-nav-materials'}
              >
                <DockableDropTarget
                  onDrop={dropSource =>
                    handleMaterialDroppedBefore(dropSource.uuid, null)
                  }
                  itemType={DragItemTypes.MATERIAL}
                >
                  <div className={'question-thumbnail draggable'}>
                    <div
                      onClick={onAddMaterialClick}
                      className='btn btn-light btn-add'
                      style={{
                        cursor: 'pointer',
                        width: '100%',
                        height: '100%'
                      }}
                    >
                      <FaPlusCircle />
                      <br />
                      Add material
                    </div>
                  </div>
                </DockableDropTarget>
                {navMaterials}
              </div>
            </div>
          </Grid>
        ) : null}
        <Grid item xs={state.layout === 'present' ? 10 : 12}>
          {/* Search if sanbox does not exist in curent Material */}
          {!loading && // loading lesson
          materialTypePropsInMaterial() && // loading material
          !currentMaterialHasType() ? ( //
              <Search />
            ) : null}
          {/* Present Mode */}
          <div
            style={{
              display:
                state.layout === 'present' &&
                materialTypePropsInMaterial() &&
                currentMaterialHasType()
                  ? 'flex'
                  : 'none', // display only if material problem type is set
              height: '100vh'
            }}
          >
            {currentMaterialHasType() &&
             <StyledIframe
               ref={setFrameRef}
               onLoad={e => onLoadIframe(e, currentMaterial.material_problem_type)}
               src={mptEvalUrl(currentMaterial.material_problem_type)}/>
            }
          </div>
          {/* Editor Mode */}
          <div
            style={{
              display:
                state.layout !== 'present' &&
                materialTypePropsInMaterial() &&
                currentMaterialHasType()
                  ? 'flex'
                  : 'none', // display only if material problem type is set
              height: '100vh'
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
  loadLessonIfNeeded: PropTypes.func.isRequired,
  onImageChange: PropTypes.func.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onAddMaterialClick: PropTypes.func.isRequired,
  moveMaterial: PropTypes.func.isRequired,
  onUpdateProblemTypeImage: PropTypes.func.isRequired,
  image: PropTypes.string,
  name: PropTypes.string,
  materials: PropTypes.array,
  module: PropTypes.string,
  loading: PropTypes.bool // this is lesson loading mark
}

const mapStateToProps = (state, ownProps) => {
  const uuid = ownProps.uuid || ownProps.match.params.uuid
  let materialUuid = null

  if (ownProps.match.params.hasOwnProperty('material_uuid')) {
    materialUuid = ownProps.match.params.material_uuid
  }

  const lesson = state.studio.lessons[uuid]
  if (lesson) {
    // let previousMaterial, nextMaterial
    const currentMaterial = state.studio.currentMaterial

    // set material nexp/prev buttons
    // if (currentMaterial && lesson.materials) {
    //   const idx = lesson.materials.indexOf(currentMaterial.uuid)
    //   if (idx > 0) {
    //     previousMaterial = lesson.materials[idx - 1]
    //   }
    //   if (idx < lesson.materials.length - 1) {
    //     nextMaterial = lesson.materials[idx + 1]
    //   }
    // }

    return {
      uuid: uuid,
      materialUrlUuid: materialUuid,
      loading: false,
      name: lesson.name,
      image: lesson.image,
      module: lesson.module, // fixme do we need this?
      materials: lesson.materials, // this is uuids list
      materialsDict: state.studio.materials, // this is {'uuid': obj} dict with all materials ever loaded o_0
      // previousMaterial: previousMaterial,
      // nextMaterial: nextMaterial,
      currentMaterial: currentMaterial
    }
  } else {
    return {
      uuid: uuid,
      materialUrlUuid: materialUuid,
      loading: true
    }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const uuid = ownProps.uuid || ownProps.match.params.uuid
  return {
    onUpdateProblemTypeImage: (canvas, pt) =>
      dispatch(updateProblemTypeImage(pt, canvas)),
    onImageChange: image => dispatch(changeLessonImage(uuid, image)),
    onNameChange: name => dispatch(renameLesson(uuid, name)),
    onDeleteClick: () => dispatch(deleteLesson(uuid)),
    loadLessonIfNeeded: materialUuid =>
      dispatch(loadLessonIfNeeded(uuid, materialUuid)),
    onAddMaterialClick: () => dispatch(addMaterial(uuid)),
    moveMaterial: (materialUuid, materialBeforeUuid) =>
      dispatch(moveMaterial(materialUuid, materialBeforeUuid))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lesson)
