import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSinglePoll } from '../actions/polls';

import { denormalizePoll } from '../utilities';

class SinglePoll extends Component {
  componentWillMount() {
    if (!this.props.poll) {
      this.props.fetchSinglePoll(this.props.pollId);
    }
  }

  render() {
    const { poll, pollId } = this.props;

    return (
      <div className="container mt-2">
        <p>Single poll with id: {pollId}</p>
        Poll data:
        <pre>{JSON.stringify(poll, null, '  ')}</pre>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const owners = state.polls.get('owners');
  const polls = state.polls.get('polls');
  const pollId = props.match.params.pollId;

  return {
    poll: denormalizePoll(owners, polls.get(pollId)),
    pollId
  };
}

const mapDispatchToProps = {
  fetchSinglePoll
};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePoll);
