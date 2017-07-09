import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSinglePoll, vote, addOption } from '../actions/polls';
import PollFactory from '../factories/poll-factory';

import SinglePollComponent from '../components/SinglePoll';
import PageContainer from '../components/PageContainer';

class SinglePoll extends Component {
  componentWillMount() {
    if (!this.props.poll) {
      this.props.fetchSinglePoll(this.props.pollId);
    }
  }

  render() {
    const { poll, isFetching } = this.props;

    if (poll) {
      return (
        <PageContainer>
          <SinglePollComponent
            poll={poll}
            vote={this.props.vote}
            addOption={this.props.addOption}
          />
        </PageContainer>
      );
    }

    if (isFetching) {
      return (
        <PageContainer>
          <div className="alert alert-info">
            Fetching the poll, please wait...
          </div>
        </PageContainer>
      );
    }

    return (
      <PageContainer>
        <div className="alert alert-warning">
          Error occurred while fetching the poll.
        </div>
      </PageContainer>
    );
  }
}

SinglePoll.propTypes = {
  fetchSinglePoll: PropTypes.func.isRequired,
  poll: PropTypes.object,
  pollId: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  vote: PropTypes.func.isRequired,
  addOption: PropTypes.func.isRequired,
};

SinglePoll.defaultProps = {
  poll: null,
};

function mapStateToProps(state, props) {
  const owners = state.data.owners;
  const polls = state.data.polls;
  const pollId = props.match.params.pollId;
  const normalizedPoll = polls.get(pollId);

  return {
    poll: normalizedPoll && PollFactory.denormalize(owners, normalizedPoll),
    pollId,
    isFetching: state.data.fetchingStates.getIn(['singlePoll', 'isFetching']),
  };
}

const mapDispatchToProps = {
  fetchSinglePoll,
  vote,
  addOption,
};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePoll);
