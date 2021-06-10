import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const mapStateToProps = (state) => ({
  //dummy state at the moment, will need to change once hooked up with redux store
    authenticated: true,
    checkCookie: true
});

const mapDispatchToProps = (dispatch) => ({
    login: () => console.log('add login action creator here'),
});

class LoginContainer extends Component {

    constructor(props) {
      super(props);
    }
  
    render() {
  
      return (
        <div id='login-form-container' className='user-credential-form-container'>
      <h1>enterprize</h1>
      
      <form onSubmit={(e) => login(e)}>
        <div className='loginItem'>
          <label htmlFor='login-username'>Username</label>
          <input type='text' id='login-username'></input>
        </div>
        
        <div className='loginItem'>
          <label htmlFor='login-password'>Password</label>
          <input type='password' id='login-password'></input>
        </div>

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