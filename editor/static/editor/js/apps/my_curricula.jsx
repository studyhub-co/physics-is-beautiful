// import React from 'react'
// import { connect } from 'react-redux'
// import {BackButton} from './../components/back_button'
// import {CurriculumContainer} from './../containers/curriculum'
// import {CurriculumThumbnail} from './../components/curriculum_thumbnail'
//
// import { loadMyCurricula } from '../actions'
//
// class MyCurricula extends React.Component {
//
//   componentDidMount() {
//     this.props.onMounted()
//   }
//
//   handleClick(uuid){
//     window.location = '/curriculum/'+uuid+'/'
//   }
//
//   render() {
//     const curricula = [];
//     for (var uuid in this.props.curricula){
//       curricula.push(
//         <CurriculumThumbnail
//                              key={uuid}
//                              {...this.props.curricula[uuid]}
//                              onClick={this.handleClick.bind(null, uuid)}/>
//       );
//     }
//
//     return (
//         <div className="row">
//           {curricula}
//         </div>
//     );
//   }
//
// }
//
// let MyCurriculaApp = connect(
//   state => {
//     return {
//       curricula : state.curricula
//     }
//   },
//   dispatch => {
//     return {
//       onMounted : () => dispatch(loadMyCurricula()),
//     }
//   })(MyCurricula);
//
// export {MyCurriculaApp}