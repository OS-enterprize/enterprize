import React from 'react';

export default (props) => {
  return (
    <div className='header-nav-container'>
      <button 
        className='sign-out-button'
        onClick={props.signOutHandler}>
        Sign Out
      </button>
    </div>
  )
}