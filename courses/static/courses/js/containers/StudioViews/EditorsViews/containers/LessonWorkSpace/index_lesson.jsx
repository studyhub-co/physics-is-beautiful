import React from 'react'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Edit from '@material-ui/icons/Edit'
import Slideshow from '@material-ui/icons/Slideshow'

// import loadable from '../../../../../utils/loadable.jsx'

import { FaTimes, FaPlusCircle } from 'react-icons/fa'

import {
  renameLesson,
  changeLessonImage,
  loadLessonIfNeeded,
  deleteLesson,
  addMaterial,
  moveMaterial
} from '../../../../../actions/studio'

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

export class Lesson extends React.Component {
  constructor (props) {
    super(props)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.handleMaterialDroppedBefore = this.handleMaterialDroppedBefore.bind(
      this
    )
    this.onMenuItemChange = this.onMenuItemChange.bind(this)
    this.currentMaterialHasType = this.currentMaterialHasType.bind(this)
    this.mptEvalUrl = this.mptEvalUrl.bind(this)

    this.state = {
      editor: <div></div>,
      layout: 'present' // TODO load problem type name in edit mode
    }
    // this.handlePreviousMaterialClick = this.handlePreviousMaterialClick.bind(this)
    // this.handleNextMaterialClick = this.handleNextMaterialClick.bind(this)
  }

  // memo:
  // this.props.currentMaterial.material_problem_type = null

  async componentDidMount () {
    console.log(this.props.materialUrlUuid)
    this.props.loadLessonIfNeeded(this.props.materialUrlUuid)

    // TODO make editor loadable
    // export default loadable(() => import('./index'), {
    //   LoadingComponent: LoadingIndicator,	  fallback: <LoadingIndicator />,
    // });
    let editor = await asyncEditor()
    this.setState({ editor: editor })
  }

  handleDeleteClick (e) {
    e.preventDefault()
    if (
      confirm(
        'This will permanently delete lesson "' +
          this.props.name +
          '" with all its materials. Are you sure?'
      )
    ) {
      this.props.onDeleteClick()
    }
  }

  handleMaterialDroppedBefore (materialUuid, beforeMaterialUuid) {
    this.props.moveMaterial(materialUuid, beforeMaterialUuid)
  }

  onMenuItemChange (e, menuId) {
    // main menu click
    if (menuId === 'view.present') {
      this.setState({ layout: 'present' })
    }
    if (menuId === 'view.edit') {
      this.setState({ layout: 'edit' })
    }
  }

  currentMaterialHasType () {
    if (
      this.props.currentMaterial &&
      this.props.currentMaterial.hasOwnProperty('material_problem_type') && // show only if a full version of material loaded
      this.props.currentMaterial.material_problem_type
    ) {
      return true
    } else {
      return false
    }
  }

  materialTypePropsInMaterial () {
    // this mean we have no material loaded, need to wait for Material Type
    return (
      this.props.currentMaterial &&
      this.props.currentMaterial.hasOwnProperty('material_problem_type')
    )
  }

   // TODO make it reusable
   mptEvalUrl = (mpt) => {
     if (mpt && mpt.hasOwnProperty('id')) {
       // TODO add material id to work with data
       return `${window.location.origin}/evaluation/${mpt.id}/`
     } else { return '' }
   }

   render () {
     if (this.props.loading) {
       return <div>Loading...</div>
     }

     var navMaterials = []

     for (var i in this.props.materials) {
       let materialUuid = this.props.materials[i]

       navMaterials.push(
         <DockableDropTarget
           key={materialUuid}
           onDrop={dropSource =>
             this.handleMaterialDroppedBefore(dropSource.uuid, materialUuid)
           }
           itemType={DragItemTypes.MATERIAL}
           selfUuid={materialUuid}
         >
           <MaterialThumbnail
             key={materialUuid}
             uuid={materialUuid}
             lessonUuid={this.props.uuid}
             selected={
               this.props.currentMaterial &&
              this.props.currentMaterial.uuid === materialUuid
             }
           />
         </DockableDropTarget>
       )
     }

     const editorComponent = this.state.editor

     const handleLayoutChange = name => event => {
       this.setState({
         ...this.state,
         [name]: event.target.value
       })
     }

     return (
       <Grid container>
         <Grid container item xs={12}>
           <Grid item xs={1}>
             <EditableThumbnail
               image={this.props.image}
               onChange={this.props.onImageChange}
             />
           </Grid>
           <Grid item xs={8}>
             <div>
               <h1>
                 <EditableLabel
                   value={this.props.name}
                   onChange={this.props.onNameChange}
                   defaultValue='New lesson'
                 />
                 <FaTimes onClick={this.handleDeleteClick} />
               </h1>
             </div>
             <div>
               <WorkspaceMenu onChange={this.onMenuItemChange} />
             </div>
           </Grid>
           <Grid item xs={3}>
             <FormControl variant='outlined'>
               <Select
                 value={this.state.layout}
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
         {/* todo make styles */}
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
           {/* { this.state.layout === 'present' && <React.Fragment> */}
           {/* <React.Fragment> */}
           {this.state.layout === 'present' ? (
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
                       this.handleMaterialDroppedBefore(dropSource.uuid, null)
                     }
                     itemType={DragItemTypes.MATERIAL}
                   >
                     <div className={'question-thumbnail draggable'}>
                       <div
                         onClick={this.props.onAddMaterialClick}
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
                   {/* Search material type */}
                   {/* {this.props.currentMaterial && */}
                 </div>
               </div>
             </Grid>
           ) : null}
           <Grid item xs={this.state.layout === 'present' ? 10 : 12}>
             {/* Search if sanbox does not exist in curent Material */}
             {!this.props.loading && // loading lesson
            this.materialTypePropsInMaterial() && // loading material
            !this.currentMaterialHasType() ? ( //
                 <Search />
               ) : null}
             {/* Present Mode */}
             <div
               style={{
                 display:
                  this.state.layout === 'present' &&
                  this.materialTypePropsInMaterial() &&
                  this.currentMaterialHasType()
                    ? 'flex'
                    : 'none', // display only if material problem type is set
                 height: '100vh'
               }}
             >
               {this.currentMaterialHasType() &&
               <StyledIframe src={this.mptEvalUrl(this.props.currentMaterial.material_problem_type)}/> }
             </div>
             {/* Editor Mode */}
             <div
               style={{
                 display:
                  this.state.layout !== 'present' &&
                  this.materialTypePropsInMaterial() &&
                  this.currentMaterialHasType()
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
      module: lesson.module,
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
