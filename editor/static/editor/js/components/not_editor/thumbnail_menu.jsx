import React from 'react'

import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import copy from 'copy-to-clipboard'

import { Dropdown, MenuItem, Glyphicon } from 'react-bootstrap'

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
      // recentCurricula list
      for (var i = 0; i < this.props.recentCurricula.results.length; i++) {
        var curriculum = this.props.recentCurricula.results[i]
        menus.push(<MenuItem
          onSelect={() => { this.onSelectCurriculum(curriculum) }}
          key={curriculum.uuid}>{curriculum.name}
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
  recentCurricula: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    recentCurricula: state.filteredCurricula.recentCurricula
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    //loadSearchCurricula: (curriculaSearchString, url) => dispatch(loadSearchCurricula(curriculaSearchString, url)),
    //loadMyCurricula
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThumbnailMenu)
export { ThumbnailMenu as ThumbnailMenuNotConnected }
