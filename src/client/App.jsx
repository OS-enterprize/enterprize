import React, { Component } from 'react';
import MainPage from './pages/MainPage.jsx';

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id='app'>
        <MainPage />
      </div>
    )
  }
}

export default App;