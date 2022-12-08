import React from 'react';
import PropTypes from 'prop-types';

function NotFound() {
  return <h1>Not Found 404</h1>;
}

NotFound.propTypes = {
  name: PropTypes.string,
};

export default NotFound;
