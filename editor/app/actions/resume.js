import {ADD_RESUME, REMOVE_RESUME} from '../constants/resume'

export function listResume() {
  return {type: LIST_RESUME}
}

export function createResume(name, obj) {
  return {type: CREATE_RESUME, name, obj}
}

export function deleteResume(name) {
  return {type: DELETE_RESUME, name}
}

export function editResume(name, obj) {
  return {type: EDIT_RESUME, name, obj}
}
