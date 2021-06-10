import React from 'react';

import '../styles/components/header-nav.scss';

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