import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createUserActionCreator } from '../actions/actions.js';

import '../styles/containers/signup-page.scss';


const mapStateToProps = (state) => ({
  authenticated: state.users.authenticated
});
const mapDispatchToProps = (dispatch) => ({
  createUser: (e) => dispatch(createUserActionCreator(e))
})

class SignUpUser extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    //If the user is now successfully created and logged in
    //Redirect them to the home page
    if (this.props.authenticated === true) {
      return (
        <Redirect to='/' />
      )
    } else {
      return (
        <div id='create-user-form-container' className='user-credential-form-container'>
          <h1>enterprize</h1>
          <h2>Create an account</h2>

          <form 
            className = 'signup-form'
            onSubmit={(e) => {
              e.preventDefault();
              this.props.createUser(e)
          }}>

            <label htmlFor='create-username'>Username</label>
            <input type='text' className='create-field' id='create-username'></input>

            <label htmlFor='create-password'>Password</label>
            <input type='password' className='create-field' id='create-password'></input>


            <label htmlFor='create-email'>Email</label>
            <input type='text' className='create-field' id='create-email'></input>

            <label htmlFor='create-first-name'>First Name</label>
            <input type='text' className='create-field' id='create-first-name'></input>

            <label htmlFor='create-last-name'>Last Name</label>
            <input type='text' className='create-field' id='create-last-name'></input>

            <input type='submit' id='create-button' value='Sign up now' className='create-user-submit-button'></input>
          </form>

        </div>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpUser);