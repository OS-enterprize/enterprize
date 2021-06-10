import React, { Component } from 'react';
import { connect } from 'react-redux';

import { LOG_OUT } from '../actions/actionTypes.js';
import HeaderNav from '../components/HeaderNav.jsx';
import '../styles/containers/header-container.scss';

const mapStateToProps = (state) => ({
  firstName: state.users.firstName
});

const mapDispatchToProps = (dispatch) => ({
  signOutHandler: () => dispatch({
    type: LOG_OUT,
  })
});

export class HeaderContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className='header-container'>
        <div className='greeting-text-container'>
          <h1>Welcome, {this.props.firstName}!</h1>
        </div>
        <HeaderNav signOutHandler={this.props.signOutHandler}/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);