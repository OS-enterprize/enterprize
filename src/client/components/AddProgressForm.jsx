import React from 'react';
import '../styles/components/add-progress-form.scss';

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
        <span className='form-span-label'>Progress</span>
        <select className='progress-type-selector'>
          <option value='Quick Apply'>Quick Apply</option>
          <option value='Manual Apply'>Manual Apply</option>
          <option value='Phone Screen'>Phone Screen</option>
          <option value='Onsite'>Onsite</option>
          <option value='Offer'>Offer</option>
        </select>
      </label>

      <label>
        <span className='form-span-label'>Company</span>
        <input type='text' name='company-name-input' className='company-name-input'/>
      </label>

      <div className='notes-container'>
        <label htmlFor='notes-input' className='notes-input-label'>
          Add Notes
        </label>
        <input type='text' name='notes-input' className='notes-input'/>
      </div>
      
      <div className='add-progress-form-button-container'>
        <input className='add-progress-form-submit add-progress-form-button' type='submit'/>
        <button 
          className='add-progress-form-cancel-button add-progress-form-button'
          onClick={() => props.setState({displayAddProgressForm: false})}
        >Cancel</button>
      </div>
    </form>
  )
}