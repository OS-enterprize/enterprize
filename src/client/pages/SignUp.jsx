import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

//import action creator for creating the user


const mapStateToProps = (state) => ({
  authenticated: null,
});
const mapDispatchToProps = (dispatch) => ({
  createUser: (e) => console.log('insert createUser action creator here')
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
        <Redirect to='/'/>
      )
    } else {
      return (
        <div id='create-user-form-container' className='user-credential-form-container'>
      <h1>enterprize</h1>
      <h2>Create an account</h2>

      <form onSubmit={(e) => createUser(e)}>
        <div>
          <label htmlFor='create-username'>Username</label>
          <input type='text' className='create-field' id='create-username'></input>
        </div>

        <div>
          <label htmlFor='create-password'>Password</label>
          <input type='password' className='create-field' id='create-password'></input>
        </div>

        <div>
          <label htmlFor='create-email'>Email</label>
          <input type='text' className='create-field' id='create-email'></input>
        </div>

        <div>
          <label htmlFor='create-first-name'>First Name</label>
          <input type='text' className='create-field' id='create-first-name'></input>
        </div>
        
        <div>
          <label htmlFor='create-last-name'>Last Name</label>
          <input type='text' className='create-field' id='create-last-name'></input>
        </div>

        <input type='submit' id='create-button' value='Sign up now'></input>
      </form>

    </div>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpUser);