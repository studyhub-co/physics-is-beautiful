import { combineReducers } from 'redux'

// import { LOCATION_CHANGE } from 'react-router-redux'
import { ActionTypes, goToMaterial } from '../actions/studio'

function courses (state = {}, action) {
  switch (action.type) {
    case ActionTypes.COURSES_LOADED:
      return action.courses
    case ActionTypes.COURSE_LOADED:
      return Object.assign({}, state, {
        [action.course.uuid]: action.course
      })
    case ActionTypes.DELETE_COURSE:
      var ret = Object.assign({}, state)
      delete ret[action.uuid]
      return ret
    case ActionTypes.UNIT_ADDED:
      var ret = Object.assign({}, state)
      ret[action.courseUuid].units.push(action.unit.uuid)
      return ret
    case ActionTypes.DELETE_UNIT:
      var ret = Object.assign({}, state)
      ret[action.courseUuid].units.splice(
        ret[action.courseUuid].units.indexOf(action.uuid),
        1
      )
      return ret
    default:
      return state
  }
}

function search (state = {}, action) {
  switch (action.type) {
    case ActionTypes.SEARCH_COURSES_LOADED:
      return Object.assign({}, state, { courses: action.coursesSearchList })
    case ActionTypes.SEARCH_UNITS_LOADED:
      return Object.assign({}, state, { units: action.untisSearchList })
    case ActionTypes.SEARCH_MODULES_LOADED:
      return Object.assign({}, state, { modules: action.modulesSearchList })
    case ActionTypes.SEARCH_LESSONS_LOADED:
      return Object.assign({}, state, { lessons: action.lessonsSearchList })
    case ActionTypes.SEARCH_MATERIALS_LOADED:
      return Object.assign({}, state, { materials: action.materialsSearchList })
    default:
      return state
  }
}

function units (state = {}, action) {
  switch (action.type) {
    case ActionTypes.COURSES_LOADED:
      return action.units
    case ActionTypes.COURSE_LOADED:
      return Object.assign({}, state, action.units)
    case ActionTypes.UNIT_ADDED:
    case ActionTypes.UNIT_LOADED:
      return Object.assign({}, state, { [action.unit.uuid]: action.unit })
    case ActionTypes.DELETE_UNIT:
      var ret = Object.assign({}, state)
      delete ret[action.uuid]
      return ret
    case ActionTypes.MODULE_ADDED:
      var ret = Object.assign({}, state)
      ret[action.module.unit].modules.push(action.module.uuid)
      return ret
    case ActionTypes.DELETE_MODULE:
      var ret = Object.assign({}, state)
      if (action.unitUuid in ret) {
        ret[action.unitUuid].modules.splice(
          ret[action.unitUuid].modules.indexOf(action.uuid),
          1
        )
      }
      return ret
    default:
      return state
  }
}

function modules (state = {}, action) {
  switch (action.type) {
    case ActionTypes.UNIT_LOADED:
    case ActionTypes.UNIT_ADDED:
    case ActionTypes.COURSE_LOADED:
    case ActionTypes.COURSES_LOADED:
      return Object.assign({}, state, action.modules)
    case ActionTypes.MODULE_ADDED:
    case ActionTypes.MODULE_LOADED:
      return Object.assign({}, state, { [action.module.uuid]: action.module })
    case ActionTypes.DELETE_MODULE:
      var ret = Object.assign({}, state)
      delete ret[action.uuid]
      return ret
    case ActionTypes.LESSON_ADDED:
      var ret = Object.assign({}, state)
      ret[action.lesson.module].lessons = ret[
        action.lesson.module
      ].lessons.slice()
      ret[action.lesson.module].lessons.push(action.lesson.uuid)
      return ret
    case ActionTypes.DELETE_LESSON:
      var ret = Object.assign({}, state)
      if (!ret[action.moduleUuid]) return ret
      var newLessons = ret[action.moduleUuid].lessons.slice()
      newLessons.splice(newLessons.indexOf(action.uuid), 1)
      ret[action.moduleUuid].lessons = newLessons
      return ret
    default:
      return state
  }
}

function lessons (state = {}, action) {
  switch (action.type) {
    case ActionTypes.MODULE_LOADED:
    case ActionTypes.MODULE_ADDED:
      return Object.assign({}, state, action.lessons)
    case ActionTypes.LESSON_LOADED:
    case ActionTypes.LESSON_ADDED:
      return Object.assign({}, state, { [action.lesson.uuid]: action.lesson })
    case ActionTypes.DELETE_LESSON:
      var ret = Object.assign({}, state)
      delete ret[action.uuid]
      return ret
    case ActionTypes.MATERIAL_ADDED:
      var ret = Object.assign({}, state)
      ret[action.material.lesson].materials = ret[
        action.material.lesson
      ].materials.slice()
      ret[action.material.lesson].materials.push(action.material.uuid)
      return ret
    case ActionTypes.DELETE_MATERIAL:
      var ret = Object.assign({}, state)
      ret[action.lesson].materials = ret[action.lesson].materials.slice()
      ret[action.lesson].materials.splice(
        ret[action.lesson].materials.indexOf(action.material),
        1
      )
      return ret
    case ActionTypes.MATERIAL_MOVED:
      var ret = Object.assign({}, state)
      var les = Object.assign({}, ret[action.lessonUuid])
      var qs = les.materials.slice()
      qs.splice(qs.indexOf(action.uuid), 1)
      if (action.beforeUuid) { qs.splice(qs.indexOf(action.beforeUuid), 0, action.uuid) } else qs.push(action.uuid)
      les.materials = qs
      ret[action.lessonUuid] = les
      return ret

    default:
      return state
  }
}
// materials list (Got with lesson loaded)
function materials (state = {}, action) {
  switch (action.type) {
    case ActionTypes.MATERIAL_LOADED:
    case ActionTypes.MATERIAL_ADDED:
      return Object.assign({}, state, {
        [action.material.uuid]:
        Object.assign({}, action.material, {completelyLoaded: true})
      })
    case ActionTypes.DELETE_MATERIAL:
      var ret = Object.assign({}, state)
      delete ret[action.material]
      return ret
    case ActionTypes.LESSON_LOADED:
    case ActionTypes.LESSON_ADDED:
      return Object.assign({}, state, action.materials)
    default:
      return state
  }
}

// currentMaterial (Got with lesson loaded)
function currentMaterial (state = null, action) {
  switch (action.type) {
    // move to actions (redirect)
    // case ActionTypes.LESSON_LOADED:
    // case ActionTypes.LESSON_ADDED:
    // case ActionTypes.LESSON_AVAILABLE:
    //   if (action.lesson.materials.length > 0) {
    //     return null
    //   } else {
    //     return null
    //   }
    case ActionTypes.MATERIAL_LOADED: // load full version of material
      return action.material
    case ActionTypes.GOTO_MATERIAL:
      // console.log(action.material);
      return action.material // remove current material
    case ActionTypes.MATERIAL_ADDED:
      // return action.material.uuid
      return action.material
    case ActionTypes.DELETE_MATERIAL:
      return action.goToMaterial
    default:
      return state
  }
}

// // currentMaterial Full version (Got after material loaded)
// function currentMaterialFull (state = {}, action) {
//   switch (action.type) {
//     case ActionTypes.MATERIAL_LOADED:
//     case ActionTypes.MATERIAL_ADDED:
//       return Object.assign({}, state, {
//         [action.material.uuid]: action.material
//       })
//     case ActionTypes.DELETE_MATERIAL:
//       var ret = Object.assign({}, state)
//       delete ret[action.material]
//       return ret
//     case ActionTypes.LESSON_LOADED:
//     case ActionTypes.LESSON_ADDED:
//       return Object.assign({}, state, action.materials)
//     default:
//       return state
//   }
// }

function allCourses (state = {}, action) {
  if (action.type === ActionTypes.ALL_COURSES_LOADED) {
    return action.courses
  } else return state
}

function filteredCourses (state = {}, action) {
  if (action.type === ActionTypes.RECENT_COURSES_LOADED) {
    return Object.assign({}, state, { recentCourses: action.courses })
  } else if (action.type === ActionTypes.NEW_COURSES_LOADED) {
    return Object.assign({}, state, { newCourses: action.courses })
  } else if (action.type === ActionTypes.POPULAR_COURSES_LOADED) {
    return Object.assign({}, state, { popularCourses: action.courses })
  } else return state
}

function course (state = {}, action) {
  if (action.type === ActionTypes.PUBLIC_COURSE_LOADED) {
    return Object.assign({}, state, {
      publicCourse: action.publicCourse
    })
  }
  return state
}

export function users (state = {}, action) {
  switch (action.type) {
    case ActionTypes.FOUND_USERS_LOADED:
      return Object.assign({}, state, {
        foundUsers: action.foundUsers
      })
    case ActionTypes.FOUND_USERS_REQUEST:
      return Object.assign({}, state, {
        findUserRequest: action.findUserRequest
      })
    default:
      return state
  }
}

function tabs (state = { tab: null }, action) {
  switch (action.type) {
    case ActionTypes.STUDIO_TAB_CHANGED:
      return Object.assign({}, state, {
        [action.namespace]: action.tab
      })
    default:
      return state
  }
}

const DEFAULT_NAVIGATION_STATE = {courses: [], units: [], modules: [], lessons: []}

// used to load structure menu navigation
function courseNavigation (state = DEFAULT_NAVIGATION_STATE, action) {
  switch (action.type) {
    case ActionTypes.COURSE_NAVIGATION_COURSES_LOADED:
      return Object.assign({}, state, {
        courses: action.courses
      })
    case ActionTypes.COURSE_NAVIGATION_UNITS_LOADED:
      return Object.assign({}, state, {
        units: action.units
      })
    case ActionTypes.COURSE_NAVIGATION_MODULES_LOADED:
      return Object.assign({}, state, {
        modules: action.modules
      })
    case ActionTypes.COURSE_NAVIGATION_LESSONS_LOADED:
      return Object.assign({}, state, {
        lessons: action.lessons
      })
    default:
      return state
  }
}

export default combineReducers({
  search,
  courses,
  units,
  modules,
  lessons,
  materials,
  currentMaterial,
  filteredCourses,
  allCourses,
  course,
  tabs,
  users,
  courseNavigation
})
