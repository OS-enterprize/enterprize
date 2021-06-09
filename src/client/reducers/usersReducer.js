import * as types from '../actions/actionTypes.js';

const initialState = {
  userId: null,
  authenticated: null,
  cookieChecked: null,
  groupIds: [],
  firstName: null,
  lastName: null,
  emailAddress: null,
  username: null,
  progress_items: []
}
/*
  State logic for authentication and login:

  onload: auth=null, cookie=null
  cookie checked/exists: auth=true, cookie=true (main app screen)
  cookie checked/doesn't exist: auth=null, cookie=false (login screen)
  user fails login: auth=false, cookie=false (send error)
  user successful login: auth=true, cookie=false (cookie sent to browser)
  new user fails:  auth=false, cookie=false, userId=null (send error)
  new user successful:   auth=truth, cookie=false, userId=truthy (go to main app screen)
*/
const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOG_IN:
      const isLoggedIn = action.payload.login.userId ? true : false;
      return {
        ...state,
        authenticated: isLoggedIn,
      }

    case types.LOG_OUT:
      return {
        ...state,
        authenticated: false,
      }

    case types.CHECK_COOKIE:
      const cookieGood = {
        ...state,
        userId: action.payload.userId,
        firstName: action.payload.newUser.firstName,
        lastName: action.payload.newUser.lastName,
        emailAddress: action.payload.newUser.emailAddress,
        username: action.payload.newUser.username,
        cookieChecked: true,
        authenticated: true,
      }
      const cookieBad = {
        ...state,
        cookieChecked: true,
        authenticated: false,
      }
      return action.payload.login.id ? cookieGood : cookieBad;

    case types.CREATE_USER:
      const newUserCreated = {
        ...state,
        userId: action.payload.newUser.userId,
        firstName: action.payload.newUser.firstName,
        lastName: action.payload.newUser.lastName,
        emailAddress: action.payload.newUser.emailAddress,
        username: action.payload.newUser.username,
        authenticated: true,
      }
      const newUserFailed = {
        ...state,
        authenticated: false,
      }
      return action.payload.newUser.userId ? newUserCreated : newUserFailed;
      ;

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
      const newProgressItems = state.progress_items.map((progress) => {
        if (progress.id === action.payloads.progress.id) {
          return {
            ...progress,
          }
        }
        return progress;
      });
      return {
        ...state,
        progress_items: newProgressItems,
      };

    case types.UPDATE_PROGRESS:
      const newProgressItems = state.progress_items.map((progress) => {
        if (progress.id === action.payloads.progress.id) {
          progress = action.payloads.progress;
        }
      });
      return {
        ...state,
        progress_items: newProgressItems,
      };

    default: return state;
  }
}

export default mainReducer;