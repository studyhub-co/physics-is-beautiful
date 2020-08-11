import React from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import copy from 'copy-to-clipboard'
import { Dropdown, Image } from 'react-bootstrap'
import { BASE_URL } from '../../../utils/config'
import { FaEllipsisV, FaGraduationCap, FaCodeBranch, FaShareAlt, FaPlus } from 'react-icons/fa'

import {
  addUnit, addToNewCourse, addModule, addLesson, addMaterial, loadModuleIfNeeded
} from '../../../actions/studio'
import { Overlay } from '../../../components/fullscreen_overlay'
import { RingLoader } from 'react-spinners'

// class MenuToggle extends React.Component {
//   constructor (props, context) {
//     super(props, context)
//     this.handleClick = this.handleClick.bind(this)
//   }
//
//   handleClick (e) {
//     e.preventDefault()
//     this.props.onClick(e)
//   }
//
//   render () {
//     return (
//       <FaEllipsisV onClick={this.handleClick} style={{fontSize: '1.5rem'}}>
//         {this.props.children}
//       </FaEllipsisV>
//     )
//   }
// }
//
// MenuToggle.propTypes = {
//   onClick: PropTypes.func
// }

// TODO replace action and redux store with courseNavigation

class ThumbnailMenu extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.onLearnSelect = this.onLearnSelect.bind(this)
    this.onForkSelect = this.onForkSelect.bind(this)
    this.onCopyShareableLink = this.onCopyShareableLink.bind(this)
    this.onBack = this.onBack.bind(this)
    this.addElementToNewCourse = this.addElementToNewCourse.bind(this)
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
    } else if (props.material) {
      baseName = 'material'
      uuid = props.material.uuid
    }

    this.state = {
      level: 1,
      baseName: baseName,
      uuid: uuid,
      menuOpen: false,
      selectedCourse: null,
      selectedUnit: null,
      selectedModule: null,
      selectedLesson: null,
      showSpinnerOverlay: false
    }

    this.MenuToggle = React.forwardRef(({ children, onClick }, ref) => {
      return (
        <FaEllipsisV
          ref={ref}
          onClick={(e) => {
            e.preventDefault()
            onClick(e)
          }}
          style={{fontSize: '1.5rem'}}>
          {children}
        </FaEllipsisV>
      )
    })
  }

  onLearnSelect () {
    //history.push('/courses/units/' + this.props.unit.uuid + '/', '_blank')
    if (this.state.baseName === 'material') { // open lesson view
      history.push('/courses/lessons/' + this.props[this.state.baseName].lesson.uuid + '/', '_self')
    } else {
      history.push('/courses/' + this.state.baseName + 's/' + this.props[this.state.baseName].uuid + '/', '_self')
    }
  }

  // onTitleClick () {
  //   history.push('/courses/' + this.state.baseName + 's/' + this.props[this.state.baseName].uuid + '/', '_blank')
  // }

  onCopyShareableLink (e) {
    if (this.state.baseName === 'material') { // copy lesson view
      copy(window.location.origin + BASE_URL + 'courses/lessons/' + this.props[this.state.baseName].lesson.uuid + '/')
    } else {
      copy(window.location.origin + BASE_URL + 'courses/' + this.state.baseName + 's/' + this.props[this.state.baseName].uuid + '/')
    }
    this.setState({menuOpen: false})
  }

  onBack (e, event) {
    event.stopPropagation()
    this.setState({level: this.state.level - 1, menuOpen: true})
  }

  onForkSelect (e, event) {
    this.setState({level: 2, menuOpen: true})
  }

  onSelectCourse (course, e, event) {
    if (this.state.baseName === 'unit') {
      this.setState({showSpinnerOverlay: true})
      this.props.addUnit(course.uuid, this.props.unit)
    } else { // move to next level
      event.stopPropagation()
      this.setState({level: this.state.level + 1, selectedCourse: course})
    }
  }

  onSelectUnit (unit, e, event) {
    if (this.state.baseName === 'module') {
      this.setState({showSpinnerOverlay: true})
      this.props.addModule(unit.uuid, this.props.module)
    } else { // move to next level
      event.stopPropagation()
      this.setState({level: this.state.level + 1, selectedUnit: unit})
    }
  }

  onSelectModule (module, e, event) {
    if (this.state.baseName === 'lesson') {
      this.setState({showSpinnerOverlay: true})
      this.props.addLesson(module.uuid, this.props.lesson)
    } else { // move to next level
      event.stopPropagation()
      this.props.loadModuleIfNeeded(module.uuid)
      this.setState({level: this.state.level + 1, selectedModule: module})
      // TODO load lesson of the module
    }
  }

  onSelectLesson (lesson, e, event) {
    if (this.state.baseName === 'material') {
      this.setState({showSpinnerOverlay: true})
      this.props.addMaterial(lesson.uuid, this.props.material)
    }
  }

  addElementToNewCourse () {
    this.props.addToNewCourse(this.state.baseName, this.props[this.state.baseName])
  }

  onToggle (newValue, event, {source}) {
    if (newValue) {
      this.setState({menuOpen: true})
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
    if (this.state.level === 1) {
      var learnText = 'Learn'
      var copyText = 'Copy shareable link'
      if (this.state.baseName === 'material') {
        learnText = 'Learn lesson with the material'
        copyText = 'Copy link to lesson'
      }
      menus.push(<Dropdown.Item onSelect={this.onLearnSelect} key='1' eventKey='1'>
        <FaGraduationCap />
        &nbsp;{learnText}</Dropdown.Item>)
      menus.push(<Dropdown.Item onSelect={this.onForkSelect} key='3' eventKey='3'>
        <FaCodeBranch />
        &nbsp;Fork to course studio</Dropdown.Item>)
      menus.push(<Dropdown.Item onSelect={this.onCopyShareableLink} key='4' eventKey='4'>
        <FaShareAlt />
        &nbsp;{copyText}</Dropdown.Item>)
    }

    // Courses list
    if (this.state.level === 2) {
      menus.push(<Dropdown.Item onSelect={this.onBack} key={'21'}>{'< Back'}</Dropdown.Item>)
      // for (var i = 0; i < this.props.myCourses.results.length; i++) {
      //   var course = this.props.myCourses.results[i]

      let subMenu = ''
      if (this.state.baseName !== 'unit') {
        subMenu = <span style={{float: 'right'}}>{'>'}</span>
      }

      for (let uuid in this.props.myCourses) {
        var course = this.props.myCourses[uuid]
        menus.push(<Dropdown.Item
          onSelect={this.onSelectCourse.bind(this, course)}
          key={course.uuid}>
          {course.image
            ? <Image style={{width: '2rem', height: '2rem', float: 'left', paddingRight: '0.5rem'}} src={course.image} />
            : null }
          {course.name}{subMenu}
        </Dropdown.Item>)
      }

      menus.push(<Dropdown.Item onSelect={this.addElementToNewCourse} key='4' eventKey='4' style={{color: 'blue'}}>
        {/*<Glyphicon glyph='plus' /> Add {this.state.baseName} to new course*/}
        <FaPlus /> Add {this.state.baseName} to new course
      </Dropdown.Item>)
    }

    // Units list
    if (this.state.level === 3) {
      let subMenu = ''
      if (this.state.baseName !== 'module') {
        subMenu = <span style={{float: 'right'}}>{'>'}</span>
      }

      menus.push(<Dropdown.Item onSelect={this.onBack} key={'21'}>{'< Back'}</Dropdown.Item>)

      for (let x = 0; x < this.state.selectedCourse.units.length; x++) {
        var unit = this.props.units[this.state.selectedCourse.units[x]]

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
      var lessonsUuidsList = this.props.modules[this.state.selectedModule.uuid].lessons

      if (lessonsUuidsList) {
        for (let x = 0; x < lessonsUuidsList.length; x++) {
          var lesson = this.props.lessons[lessonsUuidsList[x]]

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
      }
    }

    return (
      <Dropdown
        style={{float: 'right', 'cursor': 'pointer'}}
        id={`dropdown-menu-` + this.props.uuid}
        onToggle={this.onToggle}
        show={this.state.menuOpen}
      >
        <Dropdown.Toggle as={this.MenuToggle} />
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

ThumbnailMenu.propTypes = {
  unit: PropTypes.object,
  lesson: PropTypes.object,
  module: PropTypes.object,
  addMaterial: PropTypes.func,
  // courses: PropTypes.object,
  // uuid: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    myCourses: state.studio.courses, // myCourses
    units: state.studio.units,
    modules: state.studio.modules,
    lessons: state.studio.lessons
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    addUnit: (courseUuid, unit) => dispatch(addUnit(courseUuid, unit)),
    addModule: (unitUuid, module) => dispatch(addModule(unitUuid, module)),
    addLesson: (moduleUuid, lesson) => dispatch(addLesson(moduleUuid, lesson)),
    addMaterial: (lessonUuid, material) => dispatch(addMaterial(lessonUuid, material)),
    loadModuleIfNeeded: (moduleUuid) => dispatch(loadModuleIfNeeded(moduleUuid)),
    addToNewCourse: (type, value) => dispatch(addToNewCourse(type, value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThumbnailMenu)
export { ThumbnailMenu as ThumbnailMenuNotConnected }
