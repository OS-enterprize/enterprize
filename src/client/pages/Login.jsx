import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginActionCreator } from '../actions/actions.js';

import '../styles/containers/login-page.scss'

const mapStateToProps = (state) => ({
  //dummy state at the moment, will need to change once hooked up with redux store
  authenticated: state.users.authenticated,
  cookieChecked: state.users.cookieChecked
});

const mapDispatchToProps = (dispatch) => ({
  login: (e) => dispatch(loginActionCreator(e))
});

class LoginContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div id='login-form-container' className='user-credential-form-container'>
        <h1>enterprize</h1>

        <form 
          className='user-credential-form'
          onSubmit={(e) => {
            e.preventDefault();
            this.props.login(e);
        }}>

            <label htmlFor='login-username'>Username</label>
            <input type='text' id='login-username' className='credential-input'></input>


            <label htmlFor='login-password'>Password</label>
            <input type='password' id='login-password' className='credential-input'></input>

          <input type='submit' id='loginButton' value='Log in'></input>
        </form>

        <Link to='/signup'>
          <p id='signupLink'>Need an Account? Sign up</p>
        </Link>
        {/* link is react router taking us to a new place */}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);