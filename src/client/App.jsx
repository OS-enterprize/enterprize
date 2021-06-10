import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MainPage from './pages/MainPage.jsx';
import LoginContainer from './pages/Login.jsx';
import SignUpUser from './pages/SignUp.jsx'

import './styles/app.global.scss';
import { checkSessionActionCreator, createUserActionCreator } from './actions/actions.js';

const mapStateToProps = (state) => ({
  authenticated: state.users.authenticated,
  cookieChecked: state.users.cookieChecked
})

const mapDispatchToProps = (dispatch) => ({
  checkSession: () => dispatch(checkSessionActionCreator()),
  createUser: () => dispatch(createUserActionCreator())
})

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //blank page
    //send a request to check the session
    this.props.checkSession();
  }

  render() {


    // if (this.props.checkCookie === null) {
    //   return <div>Wait, the page is loading...</div>;
    // }


    let MainPageDisplay;
    if (!this.props.authenticated) {
      MainPageDisplay = LoginContainer
    } else {
      MainPageDisplay = MainPage
    }

    return (

      <Router>
        <div>
          <Switch>
            <Route exact path="/" exact component={MainPageDisplay} />
            <Route path="/signup" component={SignUpUser} />
          </Switch>
        </div>
      </Router>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(App);



// import React, { Component } from 'react';
// import MainPage from './pages/MainPage.jsx';

// class App extends Component {

//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <div id='app'>
//         <MainPage />
//       </div>
//     )
//   }
// }

// export default App;