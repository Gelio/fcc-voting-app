import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPolls } from '../actions/polls';
import PollFactory from '../factories/poll-factory';

import PollsList from '../components/PollsList';
import PageContainer from '../components/PageContainer';

const NoPollsAvailable = () => <p>No polls available. Sign in and create one.</p>;

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

Polls.propTypes = {
  polls: PropTypes.array.isRequired,
  fetchPolls: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const polls = state.data.polls;
  const owners = state.data.owners;
  return {
    // denormalized polls
    polls: polls
      .map(PollFactory.denormalize.bind(null, owners))
      .toArray(),
  };
}

const mapDispatchToProps = {
  fetchPolls,
};

export default connect(mapStateToProps, mapDispatchToProps)(Polls);
