import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './SinglePoll.css';

const Option = ({ title, percentage, onChoose, isPicked }) => {
  const classes =
    'list-group-item list-group-item-action justify-content-between option' +
    (isPicked ? ' list-group-item-success' : '');

  return (
    <li className={classes} onClick={onChoose}>
      <div className="col-12 col-md-10">
        {title}
      </div>
      <div className="badge badge-default badge-pill">
        {percentage.toFixed(2)}%
      </div>
    </li>
  );
};
Option.propTypes = {
  title: PropTypes.string.isRequired,
  percentage: PropTypes.number.isRequired,
  onChoose: PropTypes.func.isRequired,
  isPicked: PropTypes.bool.isRequired
};

class SinglePoll extends Component {
  onChooseOption(optionId) {
    this.props.vote(this.props.poll.pollId, optionId);
  }

  render() {
    const poll = this.props.poll;
    const totalVotes = poll.options.reduce(
      (total, option) => total + option.votesCount,
      0
    );

    return (
      <div>
        <h2>
          {poll.title}
        </h2>
        <p>
          Poll created by <b>{poll.owner.name}</b>
        </p>

        <h3>Options:</h3>
        <ul className="list-group">
          {poll.options.map((option, i) =>
            <Option
              key={i}
              title={option.title}
              percentage={option.votesCount / totalVotes * 100}
              onChoose={this.onChooseOption.bind(this, i)}
              isPicked={i === poll.optionPicked}
            />
          )}
        </ul>
      </div>
    );
  }
}
SinglePoll.propTypes = {
  poll: PropTypes.object.isRequired,
  optionPicked: PropTypes.number,
  vote: PropTypes.func.isRequired
};

export default SinglePoll;
