import React from 'react'

import { connect } from 'react-redux'

import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
// import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
// import Tab from 'react-bootstrap/Tab'
// import ListGroup from 'react-bootstrap/ListGroup'

import { FaTimes, FaExternalLinkAlt, FaPlusCircle } from 'react-icons/fa'

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
import MaterialContainer from '../../containers/material'

import ToolBar from './Menu/ToolBar'
import Menu from './Menu/Menu'

// import MaterialContainer from '..//material'

export class Lesson extends React.Component {
  constructor (props) {
    super(props)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.handleMaterialDroppedBefore = this.handleMaterialDroppedBefore.bind(this)
    // this.handlePreviousMaterialClick = this.handlePreviousMaterialClick.bind(this)
    // this.handleNextMaterialClick = this.handleNextMaterialClick.bind(this)
  }

  componentDidMount () {
    this.props.loadLessonIfNeeded(this.props.uuid)
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

  handleMaterialDroppedBefore (maaterialUuid, beforeMaterialUuid) {
    this.props.moveMaterial(maaterialUuid, beforeMaterialUuid)
  }

  render () {
    if (this.props.loading) {
      return <div>Loading...</div>
    }

    var navMaterials = []

    for (var i in this.props.materials) {
      let curMaterialUuid = this.props.materials[i]

      navMaterials.push(
        <DockableDropTarget
          key={curMaterialUuid}
          onDrop={(dropSource) =>
            this.handleMaterialDroppedBefore(dropSource.uuid, curMaterialUuid)}
          itemType={DragItemTypes.MATERIAL} selfUuid={curMaterialUuid}>
          <MaterialThumbnail
            key={curMaterialUuid} uuid={curMaterialUuid}
            selected={this.props.currentMaterial === curMaterialUuid} />
        </DockableDropTarget>
      )
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
          <Grid item xs={11}>
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
              <Menu />
            </div>
          </Grid>
        </Grid>
        {/* todo make styles */}
        <Grid item xs={12}
          style={{
            borderTop: '1px solid #dadce0',
            borderBottom: '1px solid #dadce0'
          }}
        >
          <ToolBar />
        </Grid>
        <Grid container item xs={12} spacing={4}>
          <Grid item xs={2}>
            <div style={{ display: 'flex', maxHeight: '70vh', flexDirection: 'column' }}>
              <div
                style={{ overflowY: 'auto',
                  /* for Firefox */
                  flexGrow: 1,
                  minHeight: 0
                }}
                className={'lesson-nav-materials'}
              >
                <DockableDropTarget
                  onDrop={(dropSource) =>
                    this.handleMaterialDroppedBefore(dropSource.uuid, null)}
                  itemType={DragItemTypes.MATERIAL}>
                  <div className={'question-thumbnail draggable'}>
                    <div
                      onClick={this.props.onAddMaterialClick}
                      className='btn btn-light btn-add'
                      style={{cursor: 'pointer',
                        width: '100%',
                        height: '100%'
                      }}
                    >
                      <FaPlusCircle />
                      <br />Add material
                    </div>
                  </div>
                </DockableDropTarget>
                {navMaterials}
              </div>
            </div>
          </Grid>
          <Grid item xs={10}>
            <MaterialContainer uuid={this.props.currentMaterial} />
          </Grid>
        </Grid>
      </Grid>
    )

    // return (
    //   <Container>
    //     <Row>
    //       <Col sm={9} md={6} xs={12}>
    //         <h1>
    //           <EditableThumbnail
    //             image={this.props.image}
    //             onChange={this.props.onImageChange}
    //           />
    //           <EditableLabel
    //             value={this.props.name}
    //             onChange={this.props.onNameChange}
    //             defaultValue='New lesson'
    //           />
    //           <FaTimes onClick={this.handleDeleteClick} />
    //         </h1>
    //       </Col>
    //       <Col sm={3} md={6} xs={12}>
    //         <a
    //           href={BASE_URL + 'course/lessons/' + this.props.uuid}
    //           className='btn btn-light'
    //         >
    //           <FaExternalLinkAlt /> Open student view
    //         </a>
    //       </Col>
    //     </Row>
    //     <hr />
    //     <Tab.Container
    //       defaultActiveKey={this.props.currentMaterial}>
    //       <Row>
    //         <Col sm={3}>
    //           <ListGroup
    //             style={{ overflowY: 'auto', maxHeight: '70vh' }}
    //             className={'lesson-nav-materials'}
    //           >
    //             <DockableDropTarget
    //               onDrop={(dropSource) =>
    //                 this.handleMaterialDroppedBefore(dropSource.uuid, null)}
    //               itemType={DragItemTypes.MATERIAL}>
    //               <div className={'question-thumbnail draggable'}>
    //                 <div
    //                   onClick={this.props.onAddMaterialClick}
    //                   className='btn btn-light btn-add'
    //                   style={{cursor: 'pointer',
    //                     width: '100%',
    //                     height: '100%'
    //                   }}
    //                 >
    //                   <FaPlusCircle />
    //                   <br />Add material
    //                 </div>
    //               </div>
    //             </DockableDropTarget>
    //             {navMaterials}
    //           </ListGroup>
    //         </Col>
    //         <Col sm={9}>
    //           {/*<MaterialContainer uuid={this.props.currentMaterial} />*/}
    //         </Col>
    //       </Row>
    //     </Tab.Container>
    //   </Container>
    // )
  }
}

Lesson.propTypes = {
  uuid: PropTypes.string.isRequired,
  currentMaterial: PropTypes.string,
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
  loading: PropTypes.bool
}

const mapStateToProps = (state, ownProps) => {
  const uuid = ownProps.uuid || ownProps.match.params.uuid
  const lesson = state.studio.lessons[uuid]
  if (lesson) {
    let previousMaterial, nextMaterial

    if (state.studio.currentMaterial && lesson.materials) {
      const idx = lesson.materials.indexOf(state.studio.currentMaterial)
      if (idx > 0) { previousMaterial = lesson.materials[idx - 1] }
      if (idx < lesson.materials.length - 1) { nextMaterial = lesson.materials[idx + 1] }
    }

    return {
      uuid: uuid,
      loading: false,
      name: lesson.name,
      image: lesson.image,
      module: lesson.module,
      materials: lesson.materials,
      previousMaterial: previousMaterial,
      nextMaterial: nextMaterial,
      currentMaterial: state.studio.currentMaterial
    }
  } else {
    return {
      loading: true,
      uuid: uuid
    }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const uuid = ownProps.uuid || ownProps.match.params.uuid
  return {
    onImageChange: image => dispatch(changeLessonImage(uuid, image)),
    onNameChange: name => dispatch(renameLesson(uuid, name)),
    onDeleteClick: () => dispatch(deleteLesson(uuid)),
    loadLessonIfNeeded: () => dispatch(loadLessonIfNeeded(uuid)),
    onAddMaterialClick: () => dispatch(addMaterial(uuid)),
    moveMaterial: (materialUuid, materialBeforeUuid) => dispatch(moveMaterial(materialUuid, materialBeforeUuid))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lesson)
