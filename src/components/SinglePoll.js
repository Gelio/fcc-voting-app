import React from 'react';

const Option = ({ title, percentage }) => {
  return (
    <li className="list-group-item justify-content-between">
      <div className="col-12 col-md-10">
        {title}
      </div>
      <div className="badge badge-default badge-pill">
        {percentage.toFixed(2)}%
      </div>
    </li>
  );
};

const SinglePoll = ({ poll }) => {
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
          />
        )}
      </ul>
    </div>
  );
};

export default SinglePoll;
