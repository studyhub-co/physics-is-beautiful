import {
  // CLASSROOM_RECEIVE_TEACHER_CLASSROOMS_LIST, CLASSROOM_CREATE_TEACHER_CLASSROOM_SUCCESS,
  // CLASSROOM_RECEIVE_TEACHER_CLASSROOM, CLASSROOM_UPDATE_TEACHER_CLASSROOM_SUCCESS,
  // CLASSROOM_JOIN_STUDENT_CLASSROOM_SUCCESS, CLASSROOM_RECEIVE_STUDENT_CLASSROOMS_LIST,
  // CLASSROOM_LEAVE_STUDENT_CLASSROOM_SUCCESS, CLASSROOM_RECEIVE_STUDENT_CLASSROOM
} from '../constants'

const initialState = {
  // classroomList: null,
  // classroomClassroom: undefined
}

export default function resourcesReducer (state = initialState, action) {
  switch (action.type) {
    // case CLASSROOM_RECEIVE_TEACHER_CLASSROOMS_LIST:
    //   return Object.assign({}, state, {
    //     classroomList: action.payload.classroomList
    //   })
    // case CLASSROOM_RECEIVE_TEACHER_CLASSROOM:
    //   return Object.assign({}, state, {
    //     classroomTeacherClassroom: action.payload.classroomTeacher
    //   })
    // case CLASSROOM_CREATE_TEACHER_CLASSROOM_SUCCESS:
    //   return Object.assign({}, state, {
    //     classroomTeacherClassroom: action.payload.classroomTeacher
    //   })
    // case CLASSROOM_UPDATE_TEACHER_CLASSROOM_SUCCESS:
    //   return Object.assign({}, state, {
    //     classroomTeacherClassroom: action.payload.classroomTeacher
    //   })
    // case CLASSROOM_JOIN_STUDENT_CLASSROOM_SUCCESS:
    //   return Object.assign({}, state, {
    //     classroomStudentClassroom: action.payload.classroomStudent
    //   })
    // case CLASSROOM_RECEIVE_STUDENT_CLASSROOM:
    //   return Object.assign({}, state, {
    //     classroomStudentClassroom: action.payload.classroomStudent
    //   })
    // case CLASSROOM_LEAVE_STUDENT_CLASSROOM_SUCCESS:
    //   return Object.assign({}, state, {
    //     classroomStudentClassroom: undefined
    //   })
    // case CLASSROOM_RECEIVE_STUDENT_CLASSROOMS_LIST:
    //   return Object.assign({}, state, {
    //     classroomStudentList: action.payload.classroomStudentList
    //   })
    default:
      return state
  }
}
