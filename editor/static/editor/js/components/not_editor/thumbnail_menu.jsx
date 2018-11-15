import React from 'react'

import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import copy from 'copy-to-clipboard'

import { Dropdown, MenuItem, Glyphicon, Image } from 'react-bootstrap'
import { addUnit, addToNewCurriculum, addModule, addLesson, addQuestion, loadModuleIfNeeded } from '../../actions'

export class DropdownThumbnail extends Dropdown {
  componentDidMount () {
    this.refs.inner.handleClose = this.handleClose.bind(this)
  }

  handleClose (event, eventDetails) {
    if (!this.refs.inner.props.open) {
      return
    }
    if (typeof event.isPropagationStopped !== 'function' || !event.isPropagationStopped()) {
      this.refs.inner.toggleOpen(event, eventDetails)
    }
  }
}

class MenuToggle extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    e.preventDefault()
    this.props.onClick(e)
  }

  render () {
    return (
      <Glyphicon glyph={'option-vertical'} onClick={this.handleClick} style={{fontSize: '2rem'}}>
        {this.props.children}
      </Glyphicon>
    )
  }
}

class ThumbnailMenu extends Dropdown.Menu {
  constructor (props, context) {
    super(props, context)
    this.onTitleClick = this.onTitleClick.bind(this)
    this.onLearnSelect = this.onLearnSelect.bind(this)
    this.onForkSelect = this.onForkSelect.bind(this)
    this.onCopyShareableLink = this.onCopyShareableLink.bind(this)
    this.onBack = this.onBack.bind(this)
    this.addElementToNewCurriculum = this.addElementToNewCurriculum.bind(this)
    // this.onSelectCurriculum = this.onSelectCurriculum.bind(this)

    var baseName = ''

    if (props.unit) {
      baseName = 'unit'
    } else if (props.module) {
      baseName = 'module'
    } else if (props.lesson) {
      baseName = 'lesson'
    } else if (props.question) {
      baseName = 'question'
    }

    this.state = {
      level: 1,
      baseName: baseName,
      selectedCurriculum: null,
      selectedUnit: null,
      selectedModule: null,
      selectedLesson: null
    }
  }

  onLearnSelect () {
    //window.open('/curriculum/units/' + this.props.unit.uuid + '/', '_blank')
    if (this.state.baseName === 'question') { // open lesson view
      window.open('/curriculum/lessons/' + this.props[this.state.baseName].lesson.uuid + '/', '_blank')
    } else {
      window.open('/curriculum/' + this.state.baseName + 's/' + this.props[this.state.baseName].uuid + '/', '_blank')
    }
  }

  onTitleClick () {
    window.open('/curriculum/' + this.state.baseName + 's/' + this.props[this.state.baseName].uuid + '/', '_blank')
  }

  onCopyShareableLink (e) {
    if (this.state.baseName === 'question') { // copy lesson view
      copy(window.location.origin + '/curriculum/lessons/' + this.props[this.state.baseName].lesson.uuid + '/')
    } else {
      copy(window.location.origin + '/curriculum/' + this.state.baseName + 's/' + this.props[this.state.baseName].uuid + '/')
    }
  }

  onBack (e, event) {
    event.stopPropagation()
    this.setState({level: this.state.level - 1})
  }

  onForkSelect (e, event) {
    event.stopPropagation()
    this.setState({level: 2})
  }

  onSelectCurriculum (curriculum, e, event) {
    if (this.state.baseName === 'unit') {
      this.props.addUnit(curriculum.uuid, this.props.unit)
    } else { // move to next level
      event.stopPropagation()
      this.setState({level: this.state.level + 1, selectedCurriculum: curriculum})
    }
  }

  onSelectUnit (unit, e, event) {
    if (this.state.baseName === 'module') {
      this.props.addModule(unit.uuid, this.props.module)
    } else { // move to next level
      event.stopPropagation()
      this.setState({level: this.state.level + 1, selectedUnit: unit})
    }
  }

  onSelectModule (module, e, event) {
    if (this.state.baseName === 'lesson') {
      this.props.addLesson(module.uuid, this.props.lesson)
    } else { // move to next level
      event.stopPropagation()
      this.props.loadModuleIfNeeded(module.uuid)
      this.setState({level: this.state.level + 1, selectedModule: module})
      // TODO load lesson of the module
    }
  }

  onSelectLesson (lesson, e, event) {
    if (this.state.baseName === 'question') {
      this.props.addQuestion(lesson.uuid, this.props.question)
    }
  }

  addElementToNewCurriculum () {
    this.props.addToNewCurriculum(this.state.baseName, this.props[this.state.baseName])
  }

  render () {
    var menus = []
    if (this.state.level === 1) {
      var learnText = 'Learn'
      var copyText = 'Copy shareable link'
      if (this.state.baseName === 'question') {
        learnText = 'Learn lesson with the question'
        copyText = 'Copy link to lesson'
      }
      menus.push(<MenuItem onSelect={this.onLearnSelect} key='1' eventKey='1'><Glyphicon glyph='education' />
        &nbsp;{learnText}</MenuItem>)
      menus.push(<MenuItem onSelect={this.onForkSelect} key='3' eventKey='3'><Glyphicon glyph='export' />
        &nbsp;Fork to curriculum studio</MenuItem>)
      menus.push(<MenuItem onSelect={this.onCopyShareableLink} key='4' eventKey='4'><Glyphicon glyph='share-alt' />
        &nbsp;{copyText}</MenuItem>)
    }

    // Curricula list
    if (this.state.level === 2) {
      menus.push(<MenuItem onSelect={this.onBack} key={'21'}>{'< Back'}</MenuItem>)
      // for (var i = 0; i < this.props.myCurricula.results.length; i++) {
      //   var curriculum = this.props.myCurricula.results[i]

      let subMenu = ''
      if (this.state.baseName !== 'unit') {
        subMenu = <span style={{float: 'right'}}>{'>'}</span>
      }

      for (let uuid in this.props.myCurricula) {
        var curriculum = this.props.myCurricula[uuid]
        menus.push(<MenuItem
          onSelect={this.onSelectCurriculum.bind(this, curriculum)}
          key={curriculum.uuid}>
          {curriculum.image
            ? <Image style={{width: '2rem', height: '2rem', float: 'left', paddingRight: '0.5rem'}} src={curriculum.image} />
            : null }
          {curriculum.name}{subMenu}
        </MenuItem>)
      }

      menus.push(<MenuItem onSelect={this.addElementToNewCurriculum} key='4' eventKey='4' style={{color: 'blue'}}>
        <Glyphicon glyph='plus' /> Add {this.state.baseName} to new curriculum
      </MenuItem>)
    }

    // Units list
    if (this.state.level === 3) {
      let subMenu = ''
      if (this.state.baseName !== 'module') {
        subMenu = <span style={{float: 'right'}}>{'>'}</span>
      }

      menus.push(<MenuItem onSelect={this.onBack} key={'21'}>{'< Back'}</MenuItem>)

      for (let x = 0; x < this.state.selectedCurriculum.units.length; x++) {
        var unit = this.props.units[this.state.selectedCurriculum.units[x]]

        menus.push(<MenuItem
          onSelect={this.onSelectUnit.bind(this, unit)}
          key={unit.uuid}>
          {unit.image
            ? <Image style={{width: '2rem', height: '2rem', float: 'left', paddingRight: '0.5rem'}} src={unit.image} />
            : null }
          {unit.name}{subMenu}
        </MenuItem>)
      }
    }

    // modules list
    if (this.state.level === 4) {
      let subMenu = ''
      if (this.state.baseName !== 'lesson') {
        subMenu = <span style={{float: 'right'}}>{'>'}</span>
      }

      menus.push(<MenuItem onSelect={this.onBack} key={'21'}>{'< Back'}</MenuItem>)

      for (let x = 0; x < this.state.selectedUnit.modules.length; x++) {
        var module = this.props.modules[this.state.selectedUnit.modules[x]]

        menus.push(<MenuItem
          onSelect={this.onSelectModule.bind(this, module)}
          key={module.uuid}>
          {module.image
            ? <Image style={{width: '2rem', height: '2rem', float: 'left', paddingRight: '0.5rem'}} src={module.image} />
            : null }
          {module.name}{subMenu}
        </MenuItem>)
      }
    }

    // lessons list
    if (this.state.level === 5) {
      menus.push(<MenuItem onSelect={this.onBack} key={'21'}>{'< Back'}</MenuItem>)
      var lessonsUuidsList = this.props.modules[this.state.selectedModule.uuid].lessons

      if (lessonsUuidsList) {
        for (let x = 0; x < lessonsUuidsList.length; x++) {
          var lesson = this.props.lessons[lessonsUuidsList[x]]

          menus.push(<MenuItem
            onSelect={this.onSelectLesson.bind(this, lesson)}
            key={lesson.uuid}>
            {lesson.image
              ? <Image
                style={{width: '2rem', height: '2rem', float: 'left', paddingRight: '0.5rem'}}
                src={lesson.image} />
              : null}
            {lesson.name}
          </MenuItem>)
        }
      }
    }

    return (
      <DropdownThumbnail
        style={{float: 'right', 'cursor': 'pointer'}}
        id='dropdown-custom-menu'>
        <MenuToggle bsRole='toggle' />
        <Dropdown.Menu bsRole='menu' rootCloseEvent={'click'}>
          {menus}
        </Dropdown.Menu>
      </DropdownThumbnail>
    )
  }
}

ThumbnailMenu.propTypes = {
  unit: PropTypes.object,
  lesson: PropTypes.object,
  module: PropTypes.object,
  curricula: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    myCurricula: state.curricula, // myCurricula
    units: state.units,
    modules: state.modules,
    lessons: state.lessons
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    addUnit: (curriculumUuid, unit) => dispatch(addUnit(curriculumUuid, unit)),
    addModule: (unitUuid, module) => dispatch(addModule(unitUuid, module)),
    addLesson: (moduleUuid, lesson) => dispatch(addLesson(moduleUuid, lesson)),
    addQuestion: (lessonUuid, question) => dispatch(addQuestion(lessonUuid, question)),
    loadModuleIfNeeded: (moduleUuid) => dispatch(loadModuleIfNeeded(moduleUuid)),
    addToNewCurriculum: (type, value) => dispatch(addToNewCurriculum(type, value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThumbnailMenu)
export { ThumbnailMenu as ThumbnailMenuNotConnected }
