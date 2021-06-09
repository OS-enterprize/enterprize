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

      <input type='submit'/>
    </form>
  )
}