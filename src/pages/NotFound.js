import React from 'react';
import PropTypes from 'prop-types';
import PageContainer from 'layout/PageContainer';

function NotFound() {
  return (
    <PageContainer>
      <h1>Not Found 404</h1>
    </PageContainer>
  );
}

NotFound.propTypes = {
  name: PropTypes.string,
};

export default NotFound;
