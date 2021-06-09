import * as types from '../actions/actionTypes.js';

const initialState = {
  userId: null,
  loginStatus: false,
  groupIds: [],
  firstName: null,
  lastName: null,
  emailAddress: null,
  username: null,
  progress_items: []
}

const mainReducer (state = initialState, action) => {
  /*
  the authenticatedUser actionCreator would dispatch an object with a property type with a value of AUTHENTICATE_USER that would invoke the switch case in the reducer which would toggle the authenticated state to be true. If a user LOGS_OUT, the loggedOut actionCreator should send off an object with the type LOG_OUT that would invoked the switch case in the reducer of LOG_OUT that would change the  authenticated state to be false.
  */


  //if obj empty loginStatus remains false
  switch (action.type) {
    case types.LOG_IN:
      const isLoggedIn = action.payload.login ? true : false;
      return {
        ...state,
        loginStatus: isLoggedIn,
      }

    case types.LOG_OUT:
      return {
        ...state,
        loginStatus: false,
      }

    case types.CREATE_USER:
      return {
        ...state,
        userId: action.payload.userId,
        firstName: action.payload.newUser.firstName,
        lastName: action.payload.newUser.lastName,
        emailAddress: action.payload.newUser.emailAddress,
        username: action.payload.newUser.username
      };

    case types.GET_PROGRESS:
      return {
        ...state,
        progress_items: action.payload.progress,
      }

    case types.ADD_PROGRESS:
      return {
        ...state,
        progress_items: state.progress_items.push(action.payload.progress)
      }

    //Not clear on the logic for this reducer
    case types.DELETE_PROGRESS:
      const newProgressItems = state.progress_items.map(progress) => {
        if (progress.id === action.payloads.progress.id) {
          return {
            ...progress,
          }
        }
        return progress;
      }
      return {
        ...state,
        progress_items: newProgressItems,
      };

    case types.UPDATE_PROGRESS:
      const newProgressItems = state.progress_items.map(progress) => {
        if (progress.id === action.payloads.progress.id) {
          progress = action.payloads.progress;
        }
      }
      return {
        ...state,
        progress_items: newProgressItems,
      };

    default: return state;
  }
}

export default mainReducer;