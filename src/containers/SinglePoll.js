import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSinglePoll, vote, addOption } from '../actions/polls';

import { denormalizePoll } from '../utilities';

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
            Fetching the polls, please wait...
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
  poll: PropTypes.object.isRequired,
  pollId: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  vote: PropTypes.func.isRequired,
  addOption: PropTypes.func.isRequired,
};

function mapStateToProps(state, props) {
  const owners = state.data.owners;
  const polls = state.data.polls;
  const pollId = props.match.params.pollId;

  return {
    poll: denormalizePoll(owners, polls.get(pollId)),
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
