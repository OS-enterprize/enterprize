import React, { Component } from 'react';
import { connect } from 'react-redux';

import PipelineComponent from '../components/PipelineComponent.jsx';
import AddProgressForm from '../components/AddProgressForm.jsx';

const mapStateToProps = (state) => ({
  //Update these to use Redux store
  userId: 5,
  progressItems: [
    {id: 5, progressType: 'Quick Apply', company: 'Google', points: 1, notes: '', timestamp: Date.now()},
    {id: 6, progressType: 'Phone Screen', company: 'Facebook', points: 25, notes: 'z', timestamp: Date.now()},
    {id: 143, progressType: 'Offer', company: 'Cool', points: 500, notes: 'af', timestamp: Date.now()}
  ],
})

const mapDispatchToProps = (dispatch) => ({
  addProgressItem: () => console.log('Replace me with an action creator'),
  updateProgressItem: () => console.log('Replace me with an action creator'),
  removeProgressItem: () => console.log('Replace me with an action creator')
});

export class PipelineContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayAddProgressForm: false
    }
    this.setState = this.setState.bind(this);
  }

  render() {

    //Create pipeline components (for progress items) for each of the user's progress items
    const progressItems = [];
    for (const progressItem of this.props.progressItems) {
      progressItems.push(
        <PipelineComponent 
          {...progressItem}
          userId={this.props.userId}
          progressId={this.props.progressId}
          updateProgressItem={this.props.updateProgressItem}
          removeProgressItem={this.props.removeProgressItem}
        />
      )
    }

    //Render an overlay form for adding a new progress item
    let addProgressForm;
    if (this.state.displayAddProgressForm) {
      addProgressForm = <AddProgressForm 
        userId={this.props.userId} 
        addProgressItem={this.props.addProgressItem}
        displayAddProgressForm={this.props.displayAddProgressForm}
        setState={this.setState}
        />
    }

    return (
      <div className='pipeline-container'>
        <h2 className='pipeline-container-subheader'>My Pipeline</h2>
        <button 
          className='add-progress-button'
          onClick={() => this.setState({ displayAddProgressForm: true})}>
          Add Item
        </button>
        {addProgressForm}
        {progressItems}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PipelineContainer);