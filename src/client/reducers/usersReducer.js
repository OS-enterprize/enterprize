import * as types from '../actions/actionTypes.js';

const initialState = {
  userId: null,
  loginStatus: false,
  groupIds: [],
  firstName: null,
  lastName: null,
  emailAddress: null,
  username: null,
  progressItems: []
}

const mainReducer = (state = initialState, action) => {

  let progressItems;
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
        progressItems: action.payload.progress,
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
        return item
      })

      return {
        ...state,
        progressItems
      }
      
    default: return state;
  }
}

export default mainReducer;