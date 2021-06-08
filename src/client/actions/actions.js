import * as types from './actionTypes.js';
import { dispatch } from 'react-redux';

export default {
  const login = (loggedIn) => ({
    type: types.LOG_IN,
    payload: loggedIn
  })

  const logout = (loggedOut) => ({
    type: types.LOG_OUT,
    payload: loggedOut
  })

  const createUser = (newUser) => ({
    type: types.CREATE_USER,
    payload: newUser
  })

  const getProgress = (progress) => ({
    type: types.GET_PROGRESS,
    payload: progress
  })

  const addProgress = (progress) => ({
    type: types.ADD_PROGRESS,
    payload: progress
  })

  const deleteProgress = (progress) => ({
    type: types.DELETE_PROGRESS,
    payload: progress
  })

  const updateProgress = (progress) => ({
    type: types.UPDATE_PROGRESS,
    payload: progress
  })
};