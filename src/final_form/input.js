import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ error, label, name, touched, value, onBlur, onChange, onFocus }) => {
  return (
    <div className="field-control">
      <div className="field">
        <label className="field-label" htmlFor={name}>
          {label}
        </label>
        <input
          autoComplete="off"
          className="custom-text-field"
          id="name"
          name="name"
          type="text"
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
        />
      </div>
      {!!error && touched && <div className="error-message">{error}</div>}
    </div>
  );
};

Input.propTypes = {
  error: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  touched: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
};

Input.defaultProps = {
  error: '',
  touched: false,
};

export default Input;
