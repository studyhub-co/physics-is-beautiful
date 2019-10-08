import React from 'react'

import PropTypes from 'prop-types'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'

import { FaTimes, FaExternalLinkAlt } from 'react-icons/fa'

import { BASE_URL } from '../../../../utils/config'
import { DockableDropTarget, DragItemTypes } from '../../../../dnd'

import { EditableThumbnail } from '../components/thumbnail'
import { EditableLabel } from '../components/label'
import { BackButton } from '../components/back_button'
import { MaterialThumbnailContainer } from '../containers/material_thumbnail'

export class Lesson extends React.Component {
  constructor (props) {
    super(props)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.handleMaterialDroppedBefore = this.handleMaterialDroppedBefore.bind(this)
    this.handlePreviousMaterialClick = this.handlePreviousMaterialClick.bind(this)
    this.handleNextMaterialClick = this.handleNextMaterialClick.bind(this)
    this.handleAddMaterialClick = this.handleAddMaterialClick.bind(this)
  }

  componentDidMount () {
    this.props.loadLessonIfNeeded(this.props.match.params.uuid)
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

  handleMaterialDroppedBefore (beforeMaterialUuid, material) {
    // this.props.dispatch(moveQuestion(question.uuid, beforeQuestionUuid))
  }

  handlePreviousMaterialClick () {
    // this.props.dispatch(goToQuestion(this.props.previousQuestion))
  }
  handleNextMaterialClick () {
    // this.props.dispatch(goToQuestion(this.props.nextQuestion))
  }
  handleAddMaterialClick () {
    // this.props.dispatch(addQuestion(this.props.match.params.uuid))
  }

  render () {
    if (this.props.loading) {
      return <div>Loading...</div>
    }

    var materials = []
    var navItems = []

    for (var i in this.props.materials) {
      let curMaterialUuid = this.props.materials[i]

      materials.push(

      )

      navItems.push(
        <Nav.Item key={curMaterialUuid}>
          <Nav.Link eventKey={curMaterialUuid}>
            <DockableDropTarget
              key={curMaterialUuid}
              onDrop={this.handleMaterialDroppedBefore(null, curMaterialUuid)}
              itemType={DragItemTypes.MATERIAL} selfUuid={curMaterialUuid}>
              <MaterialThumbnailContainer
                key={curMaterialUuid} uuid={curMaterialUuid}
                selected={this.props.currentMaterial === curMaterialUuid} />
            </DockableDropTarget>
          </Nav.Link>
        </Nav.Item>
      )
    }

    return (
      <Container>
        <Row>
          <BackButton
            link={BASE_URL + 'studio/editor/modules/' + this.props.module + '/'}
          />
        </Row>
        <Row>
          <Col sm={9} md={6} xs={12}>
            <h1>
              <EditableThumbnail
                image={this.props.image}
                onChange={this.props.onImageChange}
              />
              <EditableLabel
                value={this.props.name}
                onChange={this.props.onNameChange}
                defaultValue='New lesson'
              />
              <FaTimes onClick={this.handleDeleteClick} />
            </h1>
          </Col>
          <Col sm={3} md={6} xs={12}>
            <a
              href={BASE_URL + 'course/lessons/' + this.props.uuid}
              className='btn btn-light'
            >
              <FaExternalLinkAlt /> Open student view
            </a>
          </Col>
        </Row>
        <hr />
        <Tab.Container defaultActiveKey='first'>
          <Row>
            <Col sm={3}>
              <Nav className='flex-column'>
                {navItems}
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey='first'>
                  fgsdfgsfdgsdfgsdgf
                </Tab.Pane>
                <Tab.Pane eventKey='second'>
                  354123453245324523452
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    )
  }
}

Lesson.propTypes = {
  uuid: PropTypes.string,
  currentMaterial: PropTypes.string,
  loadLessonIfNeeded: PropTypes.func.isRequired,
  onImageChange: PropTypes.func.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  image: PropTypes.string,
  name: PropTypes.string,
  materials: PropTypes.array,
  module: PropTypes.string,
  loading: PropTypes.bool
}
