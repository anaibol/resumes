import * as types from '../constants/resume'

const initialState = {
	resumes: [{}, {}, {}]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_RESUME:
      return {
        todos: [...state.todos, action.text]
      }

    // case types.CREATE_RESUME:
    //   return {
    //     todos: [...state.todos, action.text]
    //   }
    //
    // case types.CREATE_RESUME:
    //   return {
    //     todos: [...state.todos, action.text]
    //   }
    //
    // case types.CREATE_RESUME:
    //   return {
    //     todos: [...state.todos, action.text]
    //   }
    //
    default:
      return state
  }
}
