/*
Tests for the highest-level containers for the main application.

Tested containres include:


*/

const enzyme = require('enzyme');
const path = require('path');
// const ShallowRenderer = require('react-test-renderer/shallow')

const clientDir = path.resolve(__dirname, '../../src/client');

const MainPage = require(path.join(clientDir, './pages/MainPage.jsx'));
const HeaderContainer = require(path.join(clientDir, './containers/HeaderContainer.jsx'));
const PipelineContainer = require(path.join(clientDir, './containers/PipelineContainer.jsx'));
const BoardsContainer = require(path.join(clientDir, './containers/BoardsContainer.jsx'));

describe('high-level components', () => {

  describe('MainPage', () => {

    let wrapper;
    beforeEach(() => {
      wrapper = enzyme.shallow(<MainPage/>)
    });

    it('should only render three child mnodes', () => {
      expect(wrapper.children).toHaveLength(3);
    });

    it('should render a HeaderContainer', () => {
      expect(wrapper.find(HeaderContainer)).toHaveLength(1);
    });

    it('should render a PipelineContainer', () => {
      expect(wrapper.find(PipelineContainer)).toHaveLength(1);
    });

    it('should render a BoardsContainer', () => {
      expect(wrapper.find(BoardsContainer)).toHaveLength(1);
    });
  });
});