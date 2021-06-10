import * as types from './actionTypes.js'
import 'regenerator-runtime/runtime';

const progressTypeMapper = {
  'Quick Apply': 1,
  'Manual Apply': 2,
  'Phone Screen': 3,
  'Final Round': 4,
  'Offer': 5
}

export const getProgressActionCreator = (userId) => async (dispatch, getState) => {
/*
  Retrieves all progress items for the user.
    - Makes a HTTP GET to retrieve all progress objects
    - Dispatches the progress items array as the payload to the redux store.
*/

  try {
    const response = await fetch(`http://localhost:3000/api/progress?userId=${userId}`);
    const progressItems = await response.json();

    dispatch({
      type: types.GET_PROGRESS,
      payload: progressItems
    })
  } catch (err) {
    console.log(err);
  }


};

export const addProgressActionCreator = (event, userId) => async (dispatch, getState) => {
/*
  Creates a new progress item:
    - Makes a HTTP POST request to create the new progress object
    - Dispatches the response body to add the new progress object to the redux store.
*/

  const requestBody = {
    progress_type_id: progressTypeMapper[event.target[0].value], 
    company: event.target[1].value,
    notes: event.target[2].value
  }

  try {
    const response = await fetch(`http://localhost:3000/api/progress/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    const newProgressItem = await response.json();
    dispatch({
      type: types.ADD_PROGRESS,
      payload: newProgressItem
    });

  } catch (err) {
    console.log(err);
  }
};

export const deleteProgressActionCreator = (progressId) => async (dispatch, getState) => {
/*
  Deletes a progress item:
    - Makes a HTTP DELETE request to delete the progress item resource
    - Dispatches the response body, which provides detail on the deleted resource
*/

  try {
    const response = await fetch(`http://localhost:3000/api/progress/${progressId}`, {
      method: 'DELETE'
    });

    const deletedProgressItem = await response.json();
    console.log(deletedProgressItem);
    dispatch({
      type: types.DELETE_PROGRESS,
      payload: deletedProgressItem
    });

  } catch (err) {
    console.log(err);
  }
};

export const updateProgressActionCreator = (event, progressId) => async (dispatch, getState) => {
/*
  Deletes a progress item:
    - Makes a HTTP PUT request to update the progress item resource
    - Dispatches the response body, which provides detail on the updated resource
*/

  const requestBody = {
    company: event.target[0].value,
    progress_type_id: progressTypeMapper[event.target[1].value],
    notes: event.target[2].value
  };

  try {

    const response = await fetch(`http://localhost:3000/api/progress/${progressId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    const updatedProgressItem = await response.json();
    dispatch({
      type: types.UPDATE_PROGRESS,
      payload: updatedProgressItem
    });

  } catch (err) {
    console.log(err);
  }
};