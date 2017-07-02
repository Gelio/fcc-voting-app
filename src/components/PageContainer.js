import React from 'react';

const PageContainer = ({ children }) => {
  return (
    <div className="container mt-2">
      {children}
    </div>
  );
};

export default PageContainer;
