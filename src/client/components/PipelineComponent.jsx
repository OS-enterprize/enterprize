import React from 'react';

import '../styles/components/pipeline-component.scss';

export default (props) => {

  // Convert timestamp to MM/DD/YYYY string
  const date = new Date(props.timestamp);
  const dateString = `${(date.getMonth() + 1).toString()}/${date.getUTCDate().toString()}/${date.getFullYear().toString()}`

  const [ editing, setEditingState ] = React.useState(false);

  const staticElements = {} 
  staticElements.date = (
    <p className='date-added-text'>
      <span>Date Added: </span>
      {dateString}
      </p>
  )
  staticElements.points = (
    <p className='points-text'>
      <span>Points: </span>
      {props.points}
    </p>
  )

  staticElements

  //Return editin form if user clicked edit button
  if (editing) {
    
    return (
      <div className='pipeline-component-container edit-mode'>

        <form 
          className='pipeline-edit-form'
          onSubmit={(e) => {
            e.preventDefault();
            props.updateProgressItem(e, props.progressId);
          }}
        >
          <label>
            <h3 className='company-text'>
              <span className='company-text-value'>
              Company:
              </span> 
              <input defaultValue={props.company}/>
            </h3>
          </label>
          {staticElements.date}
          <label>
            <span>
            Stage:
            </span>
            <select name='progress-type-selector'>
              <option value='Quick Apply'>Quick Apply</option>
              <option value='Manual Apply'>Manual Apply</option>
              <option value='Phone Screen'>Phone Screen</option>
              <option value='Onsite'>Onsite</option>
              <option value='Offer'>Offer</option>
            </select>
          </label>
          {staticElements.points}
          <label>
            <span>
            Notes:
            </span>
            <input defaultValue={props.notes}/>
          </label>

        <div className='progress-buttons-container edit-mode'>
          <button
            className='clear-progress-edit-button'
            onClick={() => setEditingState(false)}
          >
            Clear
          </button>
          <input type='submit' className='progress-submit-button'/>
        </div>

        </form>

      </div>
    )
  }

  //Return static content with edit/remove buttons if edit button is not yet clicked
  return (
    <div className='pipeline-component-container non-edit-mode'>

      <div className='progress-buttons-container non-edit-mode'>
        <button 
          className='edit-progress-button'
          onClick={() => setEditingState(true)}
        >Edit</button>

        <button 
          className='remove-progress-button'
          onClick={() => props.removeProgressItem(props.progressId, props.userId)}
        >Remove</button>
      </div>

      <div className='progress-item-detail-container non-edit-mode'>
        <h3 className='company-text'>
          <span>
          {props.company}
          </span>
        </h3>
        {staticElements.date}
        <p className='progress-type-text'>
          <span>Stage: </span>
          {props.progressType}
        </p>
        {staticElements.points}
        <p className='notes-text'>
          <span>Notes: </span>
          {props.notes}
        </p>
      </div>

    </div>
  )
}