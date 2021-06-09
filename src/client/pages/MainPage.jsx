import React from 'react';
import HeaderContainer from '../containers/HeaderContainer';
import BoardsContainer from '../containers/BoardsContainer';
import PipelineContainer from '../containers/PipelineContainer';

const MainPage = () => {
  return (
    <div id='main-page-container'>
      <HeaderContainer/>
      <BoardsContainer/>
      <PipelineContainer/>
    </div>
  )
}

export default MainPage;