import React from 'react';

import { Link } from 'react-router-dom';

const Poll = ({ pollId, title }) => {
  return (
    <Link to={`/poll/${pollId}`}>
      {title}
    </Link>
  );
};

const PollsList = ({ polls }) => {
  return (
    <ul>
      {polls.map(poll =>
        <li>
          <Poll key={poll.pollId} {...poll} />
        </li>
      )}
    </ul>
  );
};

export default PollsList;
