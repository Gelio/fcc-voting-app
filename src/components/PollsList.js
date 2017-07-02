import React from 'react';
import PropTypes from 'prop-types';

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

PollsList.propTypes = {
  polls: PropTypes.arrayOf(PropTypes.shape({
    pollId: PropTypes.any,
    title: PropTypes.string,
    owner: PropTypes.shape({
      ownerId: PropTypes.any,
      name: PropTypes.string
    })
  }))
};

export default PollsList;
