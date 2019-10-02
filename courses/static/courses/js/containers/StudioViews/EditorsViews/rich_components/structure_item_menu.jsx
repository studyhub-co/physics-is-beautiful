import React from 'react'

import { RingLoader } from 'react-spinners'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Dropdown, Image } from 'react-bootstrap'
import { FaGraduationCap, FaCodeBranch, FaPlus } from 'react-icons/fa'

import {
  addUnit,
  addToNewCourse,
  addModule,
  addLesson,
  addQuestion,
  loadNavigationCourses,
  loadNavigationModule
} from '../../../../actions/studio'
import { Overlay } from '../../components/fullscreen_overlay'

class MenuToggle extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    e.preventDefault()
    e.stopPropagation() // stop parents onClicks if exist
    this.props.onClick(e)
  }

  render () {
    return (
      <div onClick={this.handleClick}>{this.props.children}</div>
    )
  }
}

MenuToggle.propTypes = {
  onClick: PropTypes.func
}

class StructureItemMenu extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.onForkSelect = this.onForkSelect.bind(this)
    this.onLearnSelect = this.onLearnSelect.bind(this)
    this.onBack = this.onBack.bind(this)
    this.addElementToNewCurriculum = this.addElementToNewCurriculum.bind(this)
    this.onToggle = this.onToggle.bind(this)

    var baseName = ''
    var uuid = ''

    if (props.unit) {
      baseName = 'unit'
      uuid = props.unit.uuid
    } else if (props.module) {
      baseName = 'module'
      uuid = props.module.uuid
    } else if (props.lesson) {
      baseName = 'lesson'
      uuid = props.lesson.uuid
    } else if (props.question) {
      baseName = 'question'
      uuid = props.question.uuid
    }

    let level = 1

    if (props.preSelectMenuItem && props.preSelectMenuItem === 'fork') {
      level = 2
      this.props.loadNavigationCourses() // load my courses
    }

    this.state = {
      level: level,
      baseName: baseName, // type of original item
      uuid: uuid,
      menuOpen: false,
      selectedCurriculum: null,
      selectedUnit: null,
      selectedModule: null,
      selectedLesson: null,
      showSpinnerOverlay: false
    }
  }

  onLearnSelect (e, event) {
    event.stopPropagation() // stop parents onClicks if exist
    if (this.state.baseName === 'question') { // open lesson view
      window.open('/curriculum/lessons/' + this.props[this.state.baseName].lesson.uuid + '/', '_self')
    } else {
      window.open('/curriculum/' + this.state.baseName + 's/' + this.props[this.state.baseName].uuid + '/', '_self')
    }
  }

  onBack (e, event) {
    event.stopPropagation()
    this.setState({level: this.state.level - 1, menuOpen: true})
  }

  onForkSelect (e, event) {
    event.stopPropagation() // stop parents onClicks if exist
    this.setState({level: 2, menuOpen: true})
  }

  onSelectCurriculum (curriculum, e, event) {
    event.stopPropagation()
    if (this.state.baseName === 'unit') {
      this.setState({showSpinnerOverlay: true})
      this.props.addUnit(curriculum.uuid, this.props.unit)
    } else { // move to next level
      this.setState({level: this.state.level + 1, selectedCurriculum: curriculum})
    }
  }

  onSelectUnit (unit, e, event) {
    event.stopPropagation()
    if (this.state.baseName === 'module') {
      this.setState({showSpinnerOverlay: true})
      this.props.addModule(unit.uuid, this.props.module)
    } else { // move to next level
      this.setState({level: this.state.level + 1, selectedUnit: unit})
    }
  }

  onSelectModule (module, e, event) {
    event.stopPropagation()
    if (this.state.baseName === 'lesson') {
      this.setState({showSpinnerOverlay: true})
      this.props.addLesson(module.uuid, this.props.lesson)
    } else { // move to next level
      this.props.loadNavigationModule(module.uuid)
      this.setState({level: this.state.level + 1, selectedModule: module})
    }
  }

  onSelectLesson (lesson, e, event) {
    if (this.state.baseName === 'question') {
      this.setState({showSpinnerOverlay: true})
      this.props.addQuestion(lesson.uuid, this.props.question)
    }
  }

  addElementToNewCurriculum () {
    this.props.addToNewCourse(this.state.baseName, this.props[this.state.baseName])
  }

  onToggle (newValue, event, {source}) {
    if (newValue) {
      this.setState({menuOpen: true})
      this.props.loadNavigationCourses()
    } else if (!event) {
      this.setState({menuOpen: false})
    }
  }

  render () {
    // set spinner
    const spinner = <Overlay>
      <div className='overlay-wrapper'>
        <div className='overlay-inner'>
          <RingLoader
            color={'#1caff6'}
            loading={Boolean(true)}
          />
        </div>
      </div>
    </Overlay>

    var menus = []

    // 1st level - main items, 2nd and more - fork levels
    if (this.state.level === 1) {
      var learnText = 'Learn'
      var copyText = 'Copy shareable link'
      if (this.state.baseName === 'question') {
        learnText = 'Learn lesson with the question'
        copyText = 'Copy link to lesson'
      }
      menus.push(<Dropdown.Item onSelect={this.onLearnSelect} key='1' eventKey='1'>
        {/* <Glyphicon glyph='education' /> */}
        <FaGraduationCap />
        &nbsp;{learnText}</Dropdown.Item>)
      menus.push(<Dropdown.Item onSelect={this.onForkSelect} key='3' eventKey='3'>
        {/* <Glyphicon glyph='export' /> */}
        <FaCodeBranch />
        &nbsp;Fork</Dropdown.Item>)
      // menus.push(<Dropdown.Item onSelect={this.onCopyShareableLink} key='4' eventKey='4'>
      //   {/* <Glyphicon glyph='share-alt' /> */}
      //   <FaShareAlt />
      //   &nbsp;{copyText}</Dropdown.Item>)
    }

    // Curricula list
    if (this.state.level === 2) {
      if (!this.props.preSelectMenuItem) {
        menus.push(<Dropdown.Item onSelect={this.onBack} key={'21'}>{'< Back'}</Dropdown.Item>)
      }
      let subMenu = ''
      if (this.state.baseName !== 'unit') {
        subMenu = <span style={{float: 'right'}}>{'>'}</span>
      }

      for (let uuid in this.props.courses) {
        var curriculum = this.props.courses[uuid]
        menus.push(<Dropdown.Item
          onSelect={this.onSelectCurriculum.bind(this, curriculum)}
          key={curriculum.uuid}>
          {curriculum.image
            ? <Image style={{width: '2rem', height: '2rem', float: 'left', paddingRight: '0.5rem'}} src={curriculum.image} />
            : null }
          {curriculum.name}{subMenu}
        </Dropdown.Item>)
      }

      menus.push(<Dropdown.Item onSelect={this.addElementToNewCurriculum} key='4' eventKey='4' style={{color: 'blue'}}>
        {/* <Glyphicon glyph='plus' /> Add {this.state.baseName} to new curriculum */}
        <FaPlus /> Add {this.state.baseName} to new curriculum
      </Dropdown.Item>)
    }

    // Units list
    if (this.state.level === 3) {
      let subMenu = ''
      if (this.state.baseName !== 'module') {
        subMenu = <span style={{float: 'right'}}>{'>'}</span>
      }

      menus.push(<Dropdown.Item onSelect={this.onBack} key={'21'}>{'< Back'}</Dropdown.Item>)

      for (let x = 0; x < this.state.selectedCurriculum.units.length; x++) {
        var unit = this.props.units[this.state.selectedCurriculum.units[x]]

        menus.push(<Dropdown.Item
          onSelect={this.onSelectUnit.bind(this, unit)}
          key={unit.uuid}>
          {unit.image
            ? <Image style={{width: '2rem', height: '2rem', float: 'left', paddingRight: '0.5rem'}} src={unit.image} />
            : null }
          {unit.name}{subMenu}
        </Dropdown.Item>)
      }
    }

    // modules list
    if (this.state.level === 4) {
      let subMenu = ''
      if (this.state.baseName !== 'lesson') {
        subMenu = <span style={{float: 'right'}}>{'>'}</span>
      }

      menus.push(<Dropdown.Item onSelect={this.onBack} key={'21'}>{'< Back'}</Dropdown.Item>)

      for (let x = 0; x < this.state.selectedUnit.modules.length; x++) {
        var module = this.props.modules[this.state.selectedUnit.modules[x]]

        menus.push(<Dropdown.Item
          onSelect={this.onSelectModule.bind(this, module)}
          key={module.uuid}>
          {module.image
            ? <Image style={{width: '2rem', height: '2rem', float: 'left', paddingRight: '0.5rem'}} src={module.image} />
            : null }
          {module.name}{subMenu}
        </Dropdown.Item>)
      }
    }

    // lessons list
    if (this.state.level === 5) {
      menus.push(<Dropdown.Item onSelect={this.onBack} key={'21'}>{'< Back'}</Dropdown.Item>)

      Object.keys(this.props.lessons).forEach((lessonUuid) => {
        var lesson = this.props.lessons[lessonUuid]
        menus.push(<Dropdown.Item
          onSelect={this.onSelectLesson.bind(this, lesson)}
          key={lesson.uuid}>
          {lesson.image
            ? <Image
              style={{width: '2rem', height: '2rem', float: 'left', paddingRight: '0.5rem'}}
              src={lesson.image} />
            : null}
          {lesson.name}
        </Dropdown.Item>)
      }
      )
      // }
    }

    return (
      <Dropdown
        style={{float: 'right', 'cursor': 'pointer'}}
        id={`dropdown-menu-` + this.props.uuid}
        onToggle={this.onToggle}
        show={this.state.menuOpen}
      >
        <Dropdown.Toggle as={MenuToggle}>
          {this.props.children}
        </Dropdown.Toggle>
        <Dropdown.Menu
          // rootCloseEvent={'click'}
        >
          {menus}
        </Dropdown.Menu>
        {this.state.showSpinnerOverlay && spinner}
      </Dropdown>
    )
  }
}

StructureItemMenu.propTypes = {
  unit: PropTypes.object,
  lesson: PropTypes.object,
  module: PropTypes.object,
  preSelectMenuItem: PropTypes.string
  // curricula: PropTypes.object,
  // uuid: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    courses: state.studio.courseNavigation.courses, // myCourses
    units: state.studio.courseNavigation.units,
    modules: state.studio.courseNavigation.modules,
    lessons: state.studio.courseNavigation.lessons
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    addUnit: (curriculumUuid, unit) => dispatch(addUnit(curriculumUuid, unit)),
    addModule: (unitUuid, module) => dispatch(addModule(unitUuid, module)),
    addLesson: (moduleUuid, lesson) => dispatch(addLesson(moduleUuid, lesson)),
    addQuestion: (lessonUuid, question) => dispatch(addQuestion(lessonUuid, question)),
    addToNewCourse: (type, value) => dispatch(addToNewCourse(type, value)),
    loadNavigationCourses: () => dispatch(loadNavigationCourses()),
    loadNavigationModule: (uuid) => dispatch(loadNavigationModule(uuid))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StructureItemMenu)
export { StructureItemMenu as ThumbnailMenuNotConnected }
