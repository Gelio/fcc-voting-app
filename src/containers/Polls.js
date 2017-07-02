import React from 'react';
import { connect } from 'react-redux';

import PollsList from '../components/PollsList';

const NoPollsAvailable = () => {
  return <p>No polls available. Sign in and create one.</p>;
};

const Polls = ({ polls }) => {
  return (
    <div className="container mt-2">
      <h1>Polls list</h1>
      {polls.length > 0 ? <PollsList polls={polls} /> : <NoPollsAvailable />}
    </div>
  );
};

function mapStateToProps(state) {
  const polls = state.polls.get('polls');
  const owners = state.polls.get('owners');
  return {
    // denormalized polls
    polls: polls
      .map(poll => poll.set('owner', owners.get(poll.ownerId).toJS()))
      .toArray()
  };
}

export default connect(mapStateToProps)(Polls);
