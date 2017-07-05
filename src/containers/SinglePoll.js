import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSinglePoll, vote } from '../actions/polls';

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
          <SinglePollComponent poll={poll} vote={this.props.vote} />
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

function mapStateToProps(state, props) {
  const owners = state.polls.get('owners');
  const polls = state.polls.get('polls');
  const pollId = props.match.params.pollId;

  return {
    poll: denormalizePoll(owners, polls.get(pollId)),
    pollId,
    isFetching: state.polls.get('isFetching')
  };
}

const mapDispatchToProps = {
  fetchSinglePoll,
  vote
};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePoll);
