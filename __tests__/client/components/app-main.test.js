/*
Tests for the top-level components/containers for the main application.
In other words, the top of the component tree.

Tested containers include:
  - MainPage
  - HeaderContainer
*/

import enzyme from 'enzyme'
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
// const ShallowRenderer = require('react-test-renderer/shallow')

import MainPage from '../../../src/client/pages/MainPage.jsx';
import ConnectedHeaderContainer, { HeaderContainer } from '../../../src/client/containers/HeaderContainer.jsx';
import HeaderNav from '../../../src/client/components/HeaderNav.jsx';
import PipelineContainer from '../../../src/client/containers/PipelineContainer.jsx';
import BoardsContainer from '../../../src/client/containers/BoardsContainer.jsx';

describe('top-level components', () => {

  describe('MainPage', () => {

    const wrapper = enzyme.shallow(<MainPage />);

    it('should only render three child nodes', () => {
      expect(wrapper.children()).toHaveLength(3);
    });

    it('should render a HeaderContainer', () => {
      expect(wrapper.find(ConnectedHeaderContainer)).toHaveLength(1);
    });

    it('should render a PipelineContainer', () => {
      expect(wrapper.find(PipelineContainer)).toHaveLength(1);
    });

    it('should render a BoardsContainer', () => {
      expect(wrapper.find(BoardsContainer)).toHaveLength(1);
    });
  });

  describe('HeaderContainer', () => {

    // const mockStore = configureMockStore();
    // const store = mockStore({});
    const wrapper = enzyme.shallow(
        <HeaderContainer firstName={'Schno'}/>
    );
    it('should only render two child nodes', () => {
      expect(wrapper.children()).toHaveLength(2);
    });

    it('should render a HeaderNav as the second child node', () => {
      expect(wrapper.find(HeaderNav)).toHaveLength(1);
      expect(wrapper.children()[2]).toEqual(wrapper.find('HeaderNav')[0]);
    });

    it('should render a div with the correct class name', () => {
      expect(wrapper.find('.greeting-text-container')).toHaveLength(1);
    });

    it('greeting-text-container should render a h1 with the correct text', () => {
      expect(wrapper.find('.greeting-text-container > h1').text()).toEqual('Welcome, Schno!');
    });
  });


});