import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { Col, Dropdown, DropdownItem } from 'react-bootstrap'
import copy from 'copy-to-clipboard'
import { FaEllipsisV, FaGraduationCap, FaInfoCircle, FaCodeBranch, FaShareAlt, FaMinus, FaPlus } from 'react-icons/fa'

import { addCurriculum, addCurriculumToDashboard, removeCurriculumFromDashboard } from './../../actions'
import { history } from '../../history'
import { Thumbnail } from './../thumbnail'
import { store } from '../../app'

class CurriculumMenuToggle extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    e.preventDefault()
    this.props.onClick(e)
  }

  render () {
    {/*<Glyphicon glyph={'option-vertical'} onClick={this.handleClick} style={{fontSize: '2rem'}}>*/}
        {/*{this.props.children}*/}
      {/*</Glyphicon>*/}
    return (
      <FaEllipsisV onClick={this.handleClick} style={{fontSize: '2rem'}}>
        {this.props.children}
      </FaEllipsisV>
    )
  }
}

// not works now
// class CustomCurriculumMenu extends React.Component {
//   render () {
//     const { children } = this.props
//
//     return (
//       <Portal>
//         <Dropdown.Menu bsRole='menu' rootCloseEvent={'click'}>
//           {children}
//         </Dropdown.Menu>
//       </Portal>
//     )
//   }
// }

export class CurriculumThumbnailPublic extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.onTitleClick = this.onTitleClick.bind(this)
    this.onLearnSelect = this.onLearnSelect.bind(this)
    this.onViewProfileSelect = this.onViewProfileSelect.bind(this)
    this.onForkSelect = this.onForkSelect.bind(this)
    this.onCopyShareableLink = this.onCopyShareableLink.bind(this)
    this.onAddToDashboardSelect = this.onAddToDashboardSelect.bind(this)
    this.onRemoveFromDashboardSelect = this.onRemoveFromDashboardSelect.bind(this)
  }

  onLearnSelect () {
    window.open('/curriculum/' + this.props.curriculum.uuid + '/', '_blank')
  }

  onViewProfileSelect () {
    history.push('/curriculum/profile/' + this.props.curriculum.uuid + '/')
  }

  onTitleClick () {
    window.open('/curriculum/' + this.props.curriculum.uuid + '/', '_blank')
  }

  onCopyShareableLink (e) {
    copy(window.location.origin + '/curriculum/' + this.props.curriculum.uuid + '/')
  }

  onAddToDashboardSelect (e) {
    store.dispatch(addCurriculumToDashboard(this.props.curriculum.uuid))
    if (this.props.slidesListName !== 'recentSlides') {
      this.props.onAddRemoveFromDashboardSildes('add', this.props.curriculum)
    }
  }

  onRemoveFromDashboardSelect (e) {
    store.dispatch(removeCurriculumFromDashboard(this.props.curriculum.uuid))
    if (this.props.slidesListName === 'recentSlides') {
      this.props.onAddRemoveFromDashboardSildes('remove', this.props.curriculum)
    }
  }

  onForkSelect (e) {
    store.dispatch(addCurriculum(this.props.curriculum.uuid))
  }

  render () {
    // TODO neeed react >= 16
    // const Menu = () =>
    //   ReactDOM.createPortal(
    //     <Dropdown.Menu bsRole='menu' rootCloseEvent={'click'}>
    //       <MenuItem onSelect={this.onLearnSelect} eventKey='1'><Glyphicon glyph='education' /> Learn</MenuItem>
    //       <MenuItem onSelect={this.onViewProfileSelect} eventKey='2'><Glyphicon glyph='info-sign' /> View profile</MenuItem>
    //       <MenuItem onSelect={this.onForkSelect} eventKey='3'><Glyphicon glyph='export' /> Fork to curriculum studio</MenuItem>
    //       <MenuItem onSelect={this.onCopyShareableLink} eventKey='4'><Glyphicon glyph='share-alt' /> Copy shareable link</MenuItem>
    //       <MenuItem onSelect={this.onAddToDashboardSelect} eventKey='5'><Glyphicon glyph='plus' /> Add to dashboard</MenuItem>
    //     </Dropdown.Menu>,
    //     document.getElementById('root')
    //   )

    return (
      <Col
        sm={2}
        md={2}
        className={'curriculum-card'}
        style={{'cursor': 'pointer'}}>
        <div onClick={this.onTitleClick} style={{paddingBottom: '1rem', overflow: 'hidden', borderRadius: '15px'}}>
          <Thumbnail image={this.props.curriculum.image} />
        </div>
        <div>
          <Dropdown
            style={{float: 'right'}}
            id='dropdown-custom-menu'>
            <CurriculumMenuToggle bsRole='toggle' />
            {/*<CustomCurriculumMenu bsRole='menu'>*/}
            <Dropdown.Menu bsRole='menu' rootCloseEvent={'click'}>
              <DropdownItem onSelect={this.onLearnSelect} eventKey='1'>
                {/*<Glyphicon glyph='education' /> Learn*/}
                <FaGraduationCap /> Learn
              </DropdownItem>
              <DropdownItem onSelect={this.onViewProfileSelect} eventKey='2'>
                {/*<Glyphicon glyph='info-sign' /> View profile*/}
                <FaInfoCircle /> View profile
              </DropdownItem>
              <DropdownItem onSelect={this.onForkSelect} eventKey='3'>
                {/*<Glyphicon glyph='export' /> Fork to curriculum studio*/}
                <FaCodeBranch /> Fork to curriculum studio
              </DropdownItem>
              <DropdownItem onSelect={this.onCopyShareableLink} eventKey='4'>
                {/*<Glyphicon glyph='share-alt' /> Copy shareable link*/}
                <FaShareAlt /> Copy shareable link
              </DropdownItem>
              { this.props.slidesListName === 'recentSlides'
                ? <DropdownItem onSelect={this.onRemoveFromDashboardSelect} eventKey='5'>
                  {/*<Glyphicon glyph='plus' /> Remove from dashboard*/}
                  <FaMinus /> Remove from dashboard
                </DropdownItem>
                : <DropdownItem onSelect={this.onAddToDashboardSelect} eventKey='5'>
                  {/*<Glyphicon glyph='plus' /> Add to dashboard*/}
                  <FaPlus /> Add to dashboard
                </DropdownItem>
              }
            </Dropdown.Menu>
            {/*</CustomCurriculumMenu>*/}
          </Dropdown>
          <div onClick={this.onTitleClick} className={'blue-text'} style={{fontSize: '2rem'}}>
            {this.props.curriculum.name}
          </div>
          <div style={{fontSize: '1.1rem', paddingTop: '0.5rem', textAlign: 'left', margin: '0 0.5rem 0 0.5rem'}}>
            <a href={this.props.curriculum.author.get_absolute_url} target={'_blank'}>
              {this.props.curriculum.author.display_name}
            </a> ∙ {this.props.curriculum.count_lessons } lessons ∙ { this.props.curriculum.number_of_learners } learners
          </div>
          <div style={{fontSize: '1.1rem', color: 'gray', textAlign: 'left', margin: '0 0.5rem 0 0.5rem'}}>
            Created <Moment fromNow>
              {this.props.curriculum.created_on}
            </Moment> ∙ Last updated <Moment fromNow>
              {this.props.curriculum.updated_on}
            </Moment>
          </div>
        </div>
      </Col>
    )
  }
}

CurriculumThumbnailPublic.propTypes = {
  // uuid: PropTypes.string.isRequired,
  // author: PropTypes.object.isRequired,
  // name: PropTypes.string.isRequired,
  curriculum: PropTypes.object.isRequired,
  slidesListName: PropTypes.string,
  onAddRemoveFromDashboardSildes: PropTypes.func
  // onEditCurriculumProfileClick: PropTypes.func.isRequired,
  // onDeleteCurriculumClick: PropTypes.func.isRequired
}
