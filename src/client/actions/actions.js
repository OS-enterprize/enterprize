import * as types from './actionTypes.js';
import { dispatch } from 'react-redux';

export const loginActionCreator = (e) => (dispatch, getState) => {
  fetch('http://localhost:3000/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: e.target[0].value,
      password: e.target[1].value
    })
  })
    .then((resp) => resp.json())
    .then((data) => {
      dispatch({
        type: types.LOG_IN,
        payload: data
      })
    })
}

export const checkSessionActionCreator = () => (dispatch, getState) => {
  //make a fetch call to the server to check the cookie
  fetch('http://localhost:3000/api/users/')
    .then((resp) => resp.json())
    .then((data) => {
      dispatch({
        type: types.CHECK_COOKIE,
        payload: data
      })
    })
  //once a response is returned, we dispatch and object with type: CHEKC_COOKIE, payload: response
}
//mapDispatchToProps = (dispatch) => {
//checkSession: () => dispatch(checkSessionActionCreator());
//}

export const logoutActionCreator = (loggedOut) => ({
  type: types.LOG_OUT,
  payload: logout
});

export const createUserActionCreator = (e) => (dispatch, getState) => {
  console.log(e);
  fetch('http://localhost:3000/api/users/create/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: e.target[0].value,
      password: e.target[1].value,
      email: e.target[2].value,
      firstName: e.target[3].value,
      lastName: e.target[4].value
    })
  })
    .then((resp) => resp.json())
    .then((data) => {
      dispatch({
        type: types.CREATE_USER,
        payload: data
      })
    })
};

export const getProgressActionCreator = (progress) => ({
  type: types.GET_PROGRESS,
  payload: progress
});

export const addProgressActionCreator = (progress) => ({
  type: types.ADD_PROGRESS,
  payload: progress
});

export const deleteProgressActionCreator = (progress) => ({
  type: types.DELETE_PROGRESS,
  payload: progress
});

export const updateProgressActionCreator = (progress) => ({
  type: types.UPDATE_PROGRESS,
  payload: progress
});