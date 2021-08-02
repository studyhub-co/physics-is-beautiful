import {
  CLASSROOM_RECEIVE_TEACHER_CLASSROOMS_LIST,
  CLASSROOM_CREATE_TEACHER_CLASSROOM_SUCCESS,
  CLASSROOM_RECEIVE_TEACHER_CLASSROOM,
  CLASSROOM_UPDATE_TEACHER_CLASSROOM_SUCCESS,
  CLASSROOM_JOIN_STUDENT_CLASSROOM_REQUEST,
  CLASSROOM_JOIN_STUDENT_CLASSROOM_SUCCESS,
  CLASSROOM_RECEIVE_STUDENT_CLASSROOMS_LIST,
  CLASSROOM_LEAVE_STUDENT_CLASSROOM_SUCCESS,
  CLASSROOM_RECEIVE_STUDENT_CLASSROOM,
  COURSES_RECEIVE_COURSES_LIST,
  COURSES_RECEIVE_EXPANDED_COURSE,
  COURSES_RECEIVE_OTHER_COURSES_LIST,
} from '../constants'

const initialState = {
  classroomList: null,
  classroomClassroom: undefined,
  coursesList: null,
  coursesOtherList: null,
}

export default function classroomReducer(state = initialState, action) {
  switch (action.type) {
    case CLASSROOM_RECEIVE_TEACHER_CLASSROOMS_LIST:
      return Object.assign({}, state, {
        classroomList: action.payload.classroomList,
      })
    case CLASSROOM_RECEIVE_TEACHER_CLASSROOM:
      return Object.assign({}, state, {
        classroomTeacherClassroom: action.payload.classroomTeacher,
      })
    case CLASSROOM_CREATE_TEACHER_CLASSROOM_SUCCESS:
      return Object.assign({}, state, {
        classroomTeacherClassroom: action.payload.classroomTeacher,
      })
    case CLASSROOM_UPDATE_TEACHER_CLASSROOM_SUCCESS:
      return Object.assign({}, state, {
        classroomTeacherClassroom: action.payload.classroomTeacher,
      })
    case CLASSROOM_JOIN_STUDENT_CLASSROOM_REQUEST:
      return Object.assign({}, state, {
        joinClassRoomRequest: action.payload.joinClassRoomRequest,
      })
    case CLASSROOM_JOIN_STUDENT_CLASSROOM_SUCCESS:
      return Object.assign({}, state, {
        classroomStudentClassroom: action.payload.classroomStudent,
      })
    case CLASSROOM_RECEIVE_STUDENT_CLASSROOM:
      return Object.assign({}, state, {
        classroomStudentClassroom: action.payload.classroomStudent,
      })
    case CLASSROOM_LEAVE_STUDENT_CLASSROOM_SUCCESS:
      return Object.assign({}, state, {
        classroomStudentClassroom: undefined,
      })
    case CLASSROOM_RECEIVE_STUDENT_CLASSROOMS_LIST:
      return Object.assign({}, state, {
        classroomStudentList: action.payload.classroomStudentList,
      })
    case COURSES_RECEIVE_COURSES_LIST:
      return Object.assign({}, state, {
        coursesList: action.payload.coursesList,
      })
    case COURSES_RECEIVE_OTHER_COURSES_LIST:
      return Object.assign({}, state, {
        coursesOtherList: action.payload.coursesOtherList,
      })
    case COURSES_RECEIVE_EXPANDED_COURSE:
      return Object.assign({}, state, {
        courseExpanded: action.payload.course,
      })
    default:
      return state
  }
}
