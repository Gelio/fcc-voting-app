import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const Poll = ({ pollId, title }) => (
  <Link to={`/poll/${pollId}`}>
    {title}
  </Link>
  );

Poll.propTypes = {
  pollId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

const PollsList = ({ polls }) => (
  <ul>
    {polls.map(poll =>
        (<li key={poll.pollId}>
          <Poll {...poll} />
        </li>),
      )}
  </ul>
  );

PollsList.propTypes = {
  polls: PropTypes.arrayOf(PropTypes.shape({
    pollId: PropTypes.any,
    title: PropTypes.string,
    owner: PropTypes.shape({
      ownerId: PropTypes.any,
      name: PropTypes.string,
    }),
  })).isRequired,
};

export default PollsList;
