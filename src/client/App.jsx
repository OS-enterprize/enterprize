import React, { Component } from 'react';
import MainPage from './pages/MainPage.jsx';

import './styles/app.global.scss';
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