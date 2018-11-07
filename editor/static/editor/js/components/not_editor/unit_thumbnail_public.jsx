// import React from 'react'
// // import ReactDOM from 'react-dom'
// import PropTypes from 'prop-types'
// import Moment from 'react-moment'
//
// import { history } from '../history'
//
// import { Row, Col, Image, Dropdown, Glyphicon, MenuItem } from 'react-bootstrap'
//
// import copy from 'copy-to-clipboard'
//
// import { Thumbnail } from './../thumbnail'
//
// import { store } from '../../app'
//
// // import { Portal } from 'react-portal'
// // "react-portal": "^4.1.5",
//
// class UnitMenuToggle extends React.Component {
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
//       <Glyphicon glyph={'option-vertical'} onClick={this.handleClick} style={{fontSize: '2rem'}}>
//         {this.props.children}
//       </Glyphicon>
//     )
//   }
// }
//
// export class UnitThumbnailPublic extends React.Component {
//   constructor (props, context) {
//     super(props, context)
//     this.onTitleClick = this.onTitleClick.bind(this)
//     this.onLearnSelect = this.onLearnSelect.bind(this)
//     this.onViewProfileSelect = this.onViewProfileSelect.bind(this)
//     this.onForkSelect = this.onForkSelect.bind(this)
//     this.onCopyShareableLink = this.onCopyShareableLink.bind(this)
//   }
//
//   onLearnSelect () {
//     window.open('/curriculum/' + this.props.curriculum.uuid + '/', '_blank')
//   }
//
//   onViewProfileSelect () {
//     history.push('/curriculum/profile/' + this.props.curriculum.uuid + '/')
//   }
//
//   onTitleClick () {
//     window.open('/curriculum/' + this.props.curriculum.uuid + '/', '_blank')
//   }
//
//   onCopyShareableLink (e) {
//     copy(window.location.origin + '/curriculum/' + this.props.curriculum.uuid + '/')
//   }
//
//   onForkSelect (e) {
//     // store.dispatch(addUnit(this.props.curriculum.uuid))
//   }
//
//   render () {
//
//     return (
//       <Col
//         sm={2}
//         md={2}
//         className={'curriculum-card'}
//         style={{'cursor': 'pointer'}}>
//         <div onClick={this.onTitleClick} style={{paddingBottom: '1rem', overflow: 'hidden', borderRadius: '15px'}}>
//           <Thumbnail image={this.props.curriculum.image} />
//         </div>
//         <div>
//           <Dropdown
//             style={{float: 'right'}}
//             id='dropdown-custom-menu'>
//             <UnitMenuToggle bsRole='toggle' />
//             {/*<CustomUnitMenu bsRole='menu'>*/}
//             <Dropdown.Menu bsRole='menu' rootCloseEvent={'click'}>
//               <MenuItem onSelect={this.onLearnSelect} eventKey='1'><Glyphicon glyph='education' /> Learn</MenuItem>
//               <MenuItem onSelect={this.onForkSelect} eventKey='3'><Glyphicon glyph='export' /> Fork to curriculum studio</MenuItem>
//               <MenuItem onSelect={this.onCopyShareableLink} eventKey='4'><Glyphicon glyph='share-alt' /> Copy shareable link</MenuItem>
//               { this.props.slidesListName === 'recentSlides'
//                 ? <MenuItem onSelect={this.onRemoveFromDashboardSelect} eventKey='5'><Glyphicon glyph='plus' /> Remove from dashboard</MenuItem>
//                 : <MenuItem onSelect={this.onAddToDashboardSelect} eventKey='5'><Glyphicon glyph='plus' /> Add to dashboard</MenuItem>
//               }
//             </Dropdown.Menu>
//             {/*</CustomUnitMenu>*/}
//           </Dropdown>
//           <div onClick={this.onTitleClick} className={'blue-text'} style={{fontSize: '2rem'}}>
//             {this.props.curriculum.name}
//           </div>
//           <div style={{fontSize: '1.1rem', paddingTop: '0.5rem', textAlign: 'left', margin: '0 0.5rem 0 0.5rem'}}>
//             <a href={this.props.curriculum.author.get_absolute_url} target={'_blank'}>
//               {this.props.curriculum.author.display_name}
//             </a> ∙ {this.props.curriculum.count_lessons } lessons ∙ { this.props.curriculum.number_of_learners } learners
//           </div>
//           <div style={{fontSize: '1.1rem', color: 'gray', textAlign: 'left', margin: '0 0.5rem 0 0.5rem'}}>
//             Created <Moment fromNow>
//               {this.props.curriculum.created_on}
//             </Moment> ∙ Last updated <Moment fromNow>
//               {this.props.curriculum.updated_on}
//             </Moment>
//           </div>
//         </div>
//       </Col>
//     )
//   }
// }
//
// UnitThumbnailPublic.propTypes = {
//   // uuid: PropTypes.string.isRequired,
//   // author: PropTypes.object.isRequired,
//   // name: PropTypes.string.isRequired,
//   curriculum: PropTypes.object.isRequired,
//   slidesListName: PropTypes.string,
//   onAddRemoveFromDashboardSildes: PropTypes.func
//   // onEditUnitProfileClick: PropTypes.func.isRequired,
//   // onDeleteUnitClick: PropTypes.func.isRequired
// }
