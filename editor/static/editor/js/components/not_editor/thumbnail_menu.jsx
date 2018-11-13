import React from 'react'

import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import copy from 'copy-to-clipboard'

import { Dropdown, MenuItem, Glyphicon, Image } from 'react-bootstrap'
import { addUnit } from '../../actions'

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

    var baseName = ''

    if (props.unit) {
      baseName = 'unit'
    }

    // todo calculate max level

    this.state = {
      level: 1,
      baseName: baseName
    }
  }

  // componentDidMount () {
  //
  // }

  onLearnSelect () {
    //window.open('/curriculum/units/' + this.props.unit.uuid + '/', '_blank')
    window.open('/curriculum/' + this.state.baseName + 's/' + this.props[this.state.baseName].uuid + '/', '_blank')
  }

  onTitleClick () {
    //window.open('/curriculum/units/' + this.props.unit.uuid + '/', '_blank')
    window.open('/curriculum/' + this.state.baseName + 's/' + this.props[this.state.baseName].uuid + '/', '_blank')
  }

  onCopyShareableLink (e) {
    copy(window.location.origin + '/curriculum/' + this.state.baseName + 's/' + this.props[this.state.baseName].uuid + '/')
  }

  onBack (e, event) {
    event.stopPropagation()
    this.setState({level: this.state.level - 1})
  }

  onForkSelect (e, event) {
    event.stopPropagation()
    this.setState({level: 2})
  }

  onSelectCurriculum (curriculum) {
    if (this.state.baseName === 'unit') {
      this.props.addUnit(curriculum, this.props.unit)
    }
  }

  addUnitToNew () {
    // todo
  }

  render () {
    var menus = []
    if (this.state.level === 1) {
      menus.push(<MenuItem onSelect={this.onLearnSelect} key='1' eventKey='1'><Glyphicon
        glyph='education' /> Learn</MenuItem>)
      menus.push(<MenuItem onSelect={this.onForkSelect} key='3' eventKey='3'><Glyphicon glyph='export' /> Fork to
        curriculum studio</MenuItem>)
      menus.push(<MenuItem onSelect={this.onCopyShareableLink} key='4' eventKey='4'><Glyphicon glyph='share-alt' /> Copy
        shareable link</MenuItem>)
    }

    if (this.state.level === 2) {
      menus.push(<MenuItem onSelect={this.onBack} key={'21'}>{'< Back'}</MenuItem>)
      // for (var i = 0; i < this.props.myCurricula.results.length; i++) {
      //   var curriculum = this.props.myCurricula.results[i]
      for (var uuid in this.props.myCurricula) {
        var curriculum = this.props.myCurricula[uuid]
        menus.push(<MenuItem
          onSelect={this.onSelectCurriculum.bind(this, curriculum)}
          key={curriculum.uuid}>
          {curriculum.image
            ? <Image style={{width: '2rem', height: '2rem', float: 'left', paddingRight: '0.5rem'}} src={curriculum.image} />
            : null }
          {curriculum.name}
        </MenuItem>)
      }

      // level 3 <span style={{float: 'right'}}>{'>'}</span>

      if (this.state.baseName === 'unit') {
        menus.push(<MenuItem onSelect={this.addUnitToNew} key='4' eventKey='4' style={{color: 'blue'}}>
          <Glyphicon glyph='plus' /> Add unit to new curriculum
        </MenuItem>)
      }
    }

    return (
      <DropdownThumbnail
        style={{float: 'right'}}
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
  unit: PropTypes.object.isRequired,
  curricula: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    myCurricula: state.curricula // myCurricula
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    addUnit: (curriculum, unit) => dispatch(addUnit(curriculum.uuid, unit))
    //loadRecentCurricula: (url) => dispatch(loadAllCurricula(url, 'recent'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThumbnailMenu)
export { ThumbnailMenu as ThumbnailMenuNotConnected }
