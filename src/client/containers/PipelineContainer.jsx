import React, { Component } from 'react';
import { connect } from 'react-redux';

import PipelineComponent from '../components/PipelineComponent.jsx';
import AddProgressForm from '../components/AddProgressForm.jsx';

import { 
  getProgressActionCreator,
  addProgressActionCreator,
  deleteProgressActionCreator,
  updateProgressActionCreator
} from '../actions/progressActionCreators';

import '../styles/containers/pipeline-container.scss';

const mapStateToProps = (state) => ({
  //Update these to use Redux store
  userId: 2,
  progressItems: state.users.progressItems
})

const mapDispatchToProps = (dispatch) => ({
  getProgressItems: (userId) => dispatch(getProgressActionCreator(userId)),
  addProgressItem: (event, userId) => dispatch(addProgressActionCreator(event, userId)),
  updateProgressItem: (event, progressId) => dispatch(updateProgressActionCreator(event, progressId)),
  removeProgressItem: (progressId, userId) => dispatch(deleteProgressActionCreator(progressId, userId))
});

export class PipelineContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayAddProgressForm: false
    }
    this.setState = this.setState.bind(this);
  }

  componentDidMount() {
    this.props.getProgressItems(this.props.userId);
  }

  render() {

    //Create pipeline components (for progress items) for each of the user's progress items
    const progressItems = [];
    this.props.progressItems.forEach((progressItem, idx) => {
      progressItems.push(
        <PipelineComponent 
          {...progressItem}
          userId={this.props.userId}
          progressId={progressItem.id}
          updateProgressItem={this.props.updateProgressItem}
          removeProgressItem={this.props.removeProgressItem}
          key={`pipeline-${idx}`}
        />
      )
    })

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
        <div className='add-progress-container'>
          <button 
            className='add-progress-button'
            onClick={() => this.setState({ displayAddProgressForm: true})}>
            Add Item
          </button>
          {addProgressForm}
        </div>
        {progressItems}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PipelineContainer);