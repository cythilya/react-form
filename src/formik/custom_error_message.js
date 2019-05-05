import React from 'react';
import { connect } from 'formik';
import PropTypes from 'prop-types';

const CustomErrorMessage = ({ error }) => {
  return error ? <div className="error-message">{error}</div> : null;
};

CustomErrorMessage.propTypes = {
  error: PropTypes.string,
};

CustomErrorMessage.defaultProps = {
  error: null,
};

export default connect(CustomErrorMessage);
