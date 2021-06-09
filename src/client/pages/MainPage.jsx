import React from 'react';
import HeaderContainer from '../containers/HeaderContainer.jsx';
import BoardsContainer from '../containers/BoardsContainer.jsx';
import PipelineContainer from '../containers/PipelineContainer.jsx';

const MainPage = () => {
  return (
    <div id='main-page-container'>
      <HeaderContainer/>
      <PipelineContainer/>
      <BoardsContainer/>
    </div>
  )
}

export default MainPage;