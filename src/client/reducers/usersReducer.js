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
  progressItems: []
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

  let progressItems;
  switch (action.type) {
    case types.LOG_IN:
      console.log('state during log in action: ', state);
      const loginGood = {
        ...state,
        userId: action.payload.userId,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        groupIds: action.payload.groupIds,
        emailAddress: action.payload.email,
        username: action.payload.username,
        authenticated: true,
      }
      const loginFailed = {
        ...state,
        authenticated: false,
      }
      return action.payload.userId ? loginGood : loginFailed;

    case types.LOG_OUT:
      return {
        ...state,
        authenticated: false,
      }

    case types.CHECK_COOKIE:
      const cookieGood = {
        ...state,
        userId: action.payload.userId,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        groupIds: action.payload.groupIds,
        emailAddress: action.payload.email,
        username: action.payload.username,
        cookieChecked: true,
        authenticated: true,
      }
      const cookieBad = {
        ...state,
        cookieChecked: true,
        authenticated: false,
      }

      return action.payload.userId ? cookieGood : cookieBad;

    case types.CREATE_USER:
      const newUserCreated = {
        ...state,
        userId: action.payload.userId,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        groupIds: action.payload.groupIds,
        emailAddress: action.payload.email,
        username: action.payload.username,
        authenticated: true,
      }
      const newUserFailed = {
        ...state,
        authenticated: false,
      }
      return action.payload.userId ? newUserCreated : newUserFailed;
      ;

    case types.GET_PROGRESS:

 
      return {
        ...state,
        progressItems: action.payload.progress
      }

    case types.ADD_PROGRESS:

      progressItems = [...state.progressItems];
      progressItems.push(action.payload);
      return {
        ...state,
        progressItems
      };

    case types.DELETE_PROGRESS:

      //Filter out the progress item with the deleted progresm item's ID
      progressItems = state.progressItems.filter(item => item.id !== action.payload.id);
      return {
        ...state,
        progressItems
      };

    case types.UPDATE_PROGRESS:

      //Find the progress item to be updated and replace it with the payload
      progressItems = state.progressItems.map(item => {
        if (item.id === action.payload.id) item = action.payload;
        return item;
      })

      return {
        ...state,
        progressItems
      }

    default: return state;
  }
}

export default mainReducer;