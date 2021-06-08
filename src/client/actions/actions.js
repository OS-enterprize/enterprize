import * as types from './actionTypes.js';
import { dispatch } from 'react-redux';

export const loginActionCreator = (loggedIn) => ({
  type: types.LOG_IN,
  payload: loggedIn
});

export const logoutActionCreator = (loggedOut) => ({
  type: types.LOG_OUT,
  payload: loggedOut
});

export const createUserActionCreator = (newUser) => ({
  type: types.CREATE_USER,
  payload: newUser
});

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