import React from 'react';
import PropTypes from 'prop-types';

const PageContainer = ({ children }) => (
  <div className="container mt-2">
    {children}
  </div>
  );

PageContainer.propTypes = {
  children: PropTypes.children.isRequired,
};

export default PageContainer;
