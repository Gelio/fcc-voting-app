import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPolls } from '../actions/polls';

import PollsList from '../components/PollsList';
import PageContainer from '../components/PageContainer';

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
      <PageContainer>
        <h1>Polls list</h1>
        {polls.length > 0 ? <PollsList polls={polls} /> : <NoPollsAvailable />}
      </PageContainer>
    );
  }
}

function mapStateToProps(state) {
  const polls = state.data.polls;
  const owners = state.data.owners;
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
