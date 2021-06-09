import React from 'react';

export default (props) => {

  return(
    <form 
      className='add-progress-form' 
      onSubmit={(e) => {
        e.preventDefault();
        props.addProgressItem(e, props.userId);
        props.setState({displayAddProgressForm: false});
      }} 
    >

      <label>
        Progress
        <select name='progress-type-selector'>
          <option value='Quick Apply'>Quick Apply</option>
          <option value='Manual Apply'>Manual Apply</option>
          <option value='Phone Screen'>Phone Screen</option>
          <option value='Onsite'>Onsite</option>
          <option value='Offer'>Offer</option>
        </select>
      </label>

      <label>
        Company
        <input type='text' name='company-name-input'/>
      </label>

      <label>
        Add Notes
        <input type='text' name='notes-input'/>
      </label>
      
      <input type='submit'/>

      <button 
        onClick={() => props.setState({displayAddProgressForm: false})}
      >Cancel</button>
    </form>
  )
}