// import React from 'react'
//
// import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
// import Grid from '@material-ui/core/Grid'
// import MenuItem from '@material-ui/core/MenuItem'
// import FormControl from '@material-ui/core/FormControl'
// import Select from '@material-ui/core/Select'
// import Edit from '@material-ui/icons/Edit'
// import Slideshow from '@material-ui/icons/Slideshow'
//
// import { FaTimes, FaPlusCircle } from 'react-icons/fa'
//
// import {
//   renameLesson,
//   changeLessonImage,
//   loadLessonIfNeeded,
//   deleteLesson,
//   addMaterial,
//   moveMaterial
// } from '../../../../../actions/studio'
//
// import { EditableThumbnail } from '../../../../../components/thumbnail'
// import { EditableLabel } from '../../../../../components/label'
//
// import ToolBar from './Menu/ToolBar'
// import WorkspaceMenu from './Menu/Menu'
//
// // import Editor from './Codesandbox/Editor/index'
// import asyncEditor from './Codesandbox/Editor/index'
//
// export class ProblemTypeEditorView extends React.Component {
//   constructor (props) {
//     super(props)
//     // this.handleDeleteClick = this.handleDeleteClick.bind(this)
//     // this.handleMaterialDroppedBefore = this.handleMaterialDroppedBefore.bind(this)
//     this.onMenuItemChange = this.onMenuItemChange.bind(this)
//
//     this.state = {
//       editor: <div></div>,
//       layout: 'edit' // TODO load problem type name in edit mode
//     }
//     // this.handlePreviousMaterialClick = this.handlePreviousMaterialClick.bind(this)
//     // this.handleNextMaterialClick = this.handleNextMaterialClick.bind(this)
//   }
//
//   async componentDidMount () {
//     // this.props.loadLessonIfNeeded(this.props.uuid)
//     // send uuid to editor to load sanbbox
//     let editor = await asyncEditor(this.props)
//     this.setState({editor: editor})
//   }
//
//   // handleDeleteClick (e) {
//   //   e.preventDefault()
//   //   if (
//   //     confirm(
//   //       'This will permanently delete lesson "' +
//   //         this.props.name +
//   //         '" with all its materials. Are you sure?'
//   //     )
//   //   ) {
//   //     this.props.onDeleteClick()
//   //   }
//   // }
//   //
//   // handleMaterialDroppedBefore (maaterialUuid, beforeMaterialUuid) {
//   //   this.props.moveMaterial(maaterialUuid, beforeMaterialUuid)
//   // }
//
//   onMenuItemChange (e, menuId) {
//     // main menu click
//     if (menuId === 'view.present') {
//       this.setState({layout: 'present'})
//     }
//     if (menuId === 'view.edit') {
//       this.setState({layout: 'edit'})
//     }
//   }
//
//   render () {
//     // if (this.props.loading) {
//     //   return <div>Loading...</div>
//     // }
//     //
//     // var navMaterials = []
//     //
//     // for (var i in this.props.materials) {
//     //   let curMaterialUuid = this.props.materials[i]
//     //
//     //   navMaterials.push(
//     //     <DockableDropTarget
//     //       key={curMaterialUuid}
//     //       onDrop={(dropSource) =>
//     //         this.handleMaterialDroppedBefore(dropSource.uuid, curMaterialUuid)}
//     //       itemType={DragItemTypes.MATERIAL} selfUuid={curMaterialUuid}>
//     //       <MaterialThumbnail
//     //         key={curMaterialUuid} uuid={curMaterialUuid}
//     //         selected={this.props.currentMaterial === curMaterialUuid} />
//     //     </DockableDropTarget>
//     //   )
//     // }
//
//     const editorComponent = this.state.editor
//
//     // TODO disable present if we have no material id in state
//     const handleLayoutChange = name => event => {
//       // TODO if we have material_id in state redirect to material url
//       this.setState({
//         ...this.state,
//         [name]: event.target.value
//       })
//     }
//
//     return (
//       <Grid container>
//         <Grid container item xs={12}>
//           <Grid item xs={1}>
//             <EditableThumbnail
//               image={this.props.image}
//               onChange={this.props.onImageChange}
//             />
//           </Grid>
//           <Grid item xs={8}>
//             <div>
//               <h1>
//                 {/* TODO add problem type name */}
//                 <EditableLabel
//                   value={this.props.name}
//                   onChange={this.props.onNameChange}
//                   defaultValue='New lesson'
//                 />
//                 <FaTimes onClick={this.handleDeleteClick} />
//               </h1>
//             </div>
//             <div>
//               <WorkspaceMenu onChange={this.onMenuItemChange}/>
//             </div>
//           </Grid>
//           <Grid item xs={3}>
//             <FormControl variant='outlined' disabled>
//               <Select
//                 value={this.state.layout}
//                 onChange={handleLayoutChange('layout')}
//               >
//                 <MenuItem value={'present'}>
//                   <Slideshow /> Present</MenuItem>
//                 <MenuItem value={'edit'}>
//                   <Edit /> Edit mode
//                 </MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>
//         </Grid>
//         {/* todo make styles */}
//         <Grid item xs={12}
//           style={{
//             borderTop: '1px solid #dadce0',
//             borderBottom: '1px solid #dadce0'
//           }}
//         >
//           <ToolBar />
//         </Grid>
//         <Grid container item xs={12} spacing={4}>
//           <Grid
//             item xs={12}
//             style={{
//               display: this.state.layout === 'edit' ? 'flex' : 'none',
//               height: '100vh'
//             }}>
//             {editorComponent}
//           </Grid>
//         </Grid>
//       </Grid>
//     )
//   }
// }
//
// ProblemTypeEditorView.propTypes = {
//   // uuid: PropTypes.string.isRequired,
//   problem_type_uuid: PropTypes.string.isRequired,
//   currentMaterial: PropTypes.string,
//   loadLessonIfNeeded: PropTypes.func.isRequired,
//   onImageChange: PropTypes.func.isRequired,
//   onNameChange: PropTypes.func.isRequired,
//   onDeleteClick: PropTypes.func.isRequired,
//   onAddMaterialClick: PropTypes.func.isRequired,
//   moveMaterial: PropTypes.func.isRequired,
//   image: PropTypes.string,
//   name: PropTypes.string,
//   materials: PropTypes.array,
//   module: PropTypes.string,
//   loading: PropTypes.bool
// }
//
// const mapStateToProps = (state, ownProps) => {
//   // const uuid = ownProps.uuid || ownProps.match.params.uuid
//   const problemTypeUuid = ownProps.problem_type_uuid || ownProps.match.params.problem_type_uuid
//   return {
//     loading: true,
//     problem_type_uuid: problemTypeUuid
//   }
// }
//
// const mapDispatchToProps = (dispatch, ownProps) => {
//   const uuid = ownProps.uuid || ownProps.match.params.uuid
//   return {
//     onImageChange: image => dispatch(changeLessonImage(uuid, image)),
//     onNameChange: name => dispatch(renameLesson(uuid, name)),
//     onDeleteClick: () => dispatch(deleteLesson(uuid)),
//     loadLessonIfNeeded: () => dispatch(loadLessonIfNeeded(uuid)),
//     onAddMaterialClick: () => dispatch(addMaterial(uuid)),
//     moveMaterial: (materialUuid, materialBeforeUuid) => dispatch(moveMaterial(materialUuid, materialBeforeUuid))
//   }
// }
//
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ProblemTypeEditorView)
