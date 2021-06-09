import enzyme from 'enzyme'
import React from 'react';

import { PipelineContainer } from '../../../src/client/containers/PipelineContainer.jsx';
import PipelineComponent from '../../../src/client/components/PipelineComponent.jsx';
import AddProgressForm from '../../../src/client/components/AddProgressForm.jsx';

describe('Pipeline Components', () => {

  describe('Pipeline Container', () => {

    const props = {
      userId: 5,
      progressItems: [
        {id: 5, progressType: 'Quick Apply', company: 'Google', points: 1, notes: '', timestamp: Date.now()},
        {id: 6, progressType: 'Phone Screen', company: 'Facebook', points: 25, notes: 'z', timestamp: Date.now()},
        {id: 143, progressType: 'Offer', company: 'Cool', points: 500, notes: 'af', timestamp: Date.now()}
      ],
      addProgressItem: jest.fn()
    }

    let wrapper;
    beforeEach(() => {
      wrapper = enzyme.shallow(<PipelineContainer {...props}/>)
    });

    it('should render a single subheader with the correct text as the first node', () => {

      const subHeader = wrapper.find('h2');
      expect(subHeader).toHaveLength(1);
      expect(wrapper.children()[0]).toEqual(subHeader[0]);
      expect(subHeader.text()).toEqual('My Pipeline');
    })

    it('should render the correct number of Pipeline Components', () => {
      expect(wrapper.find(PipelineComponent)).toHaveLength(props.progressItems.length);
    })

    describe('Add New Item button', () => {
      
      it('should render a single button within the Pipeline Container with the correct class name', () => {
        expect(wrapper.find('.add-progress-button')).toHaveLength(1);
      });

      it('should render a form when clicked', () => {
        wrapper.find('.add-progress-button').simulate('click');
        expect(wrapper.find(AddProgressForm)).toHaveLength(1);
        // expect(wrapper.find('.add-progress-button')).toHaveLength(0);
      });
    });
  });

  describe('Pipeline Component', () => {

    const curDate = Date.now();
    const props = {
      userId: 5,
      progressId: 10,
      progressType: 'Offer',
      company: 'Netflix',
      points: 500,
      notes: 'testy',
      timestamp: curDate,
      updateProgressItem: jest.fn(),
      removeProgressItem: jest.fn()
    };

    let wrapper;
    beforeEach(() => {
      wrapper = enzyme.shallow(<PipelineComponent {...props}/>)
    });

    it('should display an edit and remove button', () => {
      expect(wrapper.find('.edit-progress-button')).toHaveLength(1);
      expect(wrapper.find('.remove-progress-button')).toHaveLength(1);
      expect(wrapper.find('button')).toHaveLength(2);
    });

    it('should display all necessary progress item details', () => {
      expect(wrapper.find('.company-text').text().includes(props.company)).toEqual(true);
      const date = new Date(props.timestamp);
      const dateString = `${(date.getMonth() + 1).toString()}/${date.getUTCDate().toString()}/${date.getFullYear().toString()}`
      expect(wrapper.find('.date-added-text').text().includes(dateString)).toEqual(true);
      expect(wrapper.find('.progress-type-text').text().includes(props.progressType)).toEqual(true);
      expect(wrapper.find('.points-text').text().includes(props.points.toString())).toEqual(true);
      expect(wrapper.find('.notes-text').text().includes(props.notes)).toEqual(true);
    });

    it('should invoke a callback on remove', () => {
      wrapper.find('.remove-progress-button').simulate('click');
      expect(props.removeProgressItem).toHaveBeenCalled();
    });

    describe('Editing Progress Item', () => {

      let wrapper;
      beforeEach(() => {
        wrapper = enzyme.shallow(<PipelineComponent {...props} />);
        wrapper.find('.edit-progress-button').simulate('click');
      });

      it('should display a submit and clear button', () => {
        expect(wrapper.find('.submit-progress-edit-button')).toHaveLength(1);
        expect(wrapper.find('.clear-progress-edit-button')).toHaveLength(1);
      });

      it('should render an HTML form', () => {
        expect(wrapper.find('form')).toHaveLength(1);
      });

      it('should invoke a callback on submit', () => {
        wrapper.find('.save-progress-edit-button').simulate('click');
        expect(props.updateProgressItem).toHaveBeenCalled();
      });

      it('should remove the edit screen on clear', () => {
        wrapper.find('clear-progress-edit-button').simulate('click');
        expect(wrapper.find('submit-progress-edit-button')).toHaveLength(0)
      });

    })

  });


});