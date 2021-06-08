import * as types from './actionTypes.js';
import { dispatch } from 'react-redux';

export const login = (loggedIn) => ({
  type: types.LOG_IN,
  payload: loggedIn
});

export const logout = (loggedOut) => ({
  type: types.LOG_OUT,
  payload: loggedOut
});

export const createUser = (newUser) => ({
  type: types.CREATE_USER,
  payload: newUser
});

export const getProgress = (progress) => ({
  type: types.GET_PROGRESS,
  payload: progress
});

export const addProgress = (progress) => ({
  type: types.ADD_PROGRESS,
  payload: progress
});

export const deleteProgress = (progress) => ({
  type: types.DELETE_PROGRESS,
  payload: progress
});

export const updateProgress = (progress) => ({
  type: types.UPDATE_PROGRESS,
  payload: progress
});