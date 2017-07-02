import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPolls } from '../actions/polls';

import PollsList from '../components/PollsList';

import { denormalizePoll } from '../utilities';

const NoPollsAvailable = () => {
  return <p>No polls available. Sign in and create one.</p>;
};

class Polls extends Component {
  componentDidMount() {
    this.props.fetchPolls();
  }

  render() {
    const { polls } = this.props;
    return (
      <div className="container mt-2">
        <h1>Polls list</h1>
        {polls.length > 0 ? <PollsList polls={polls} /> : <NoPollsAvailable />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const polls = state.polls.get('polls');
  const owners = state.polls.get('owners');
  return {
    // denormalized polls
    polls: polls
      .map(denormalizePoll.bind(null, owners))
      .toArray()
  };
}

const mapDispatchToProps = {
  fetchPolls
};

export default connect(mapStateToProps, mapDispatchToProps)(Polls);
