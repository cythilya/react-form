import React from 'react';
import PropTypes from 'prop-types';
import CustomErrorMessage from './custom_error_message';

const CustomTextField = ({
  className,
  error,
  id,
  label,
  name,
  type,
  value,
  onChange,
  onBlur,
  ...props
}) => {
  return (
    <div className="field-control">
      <div className="field">
        <label className="field-label" htmlFor={id}>
          {label}
        </label>
        <input
          {...props}
          autoComplete="off"
          className="custom-text-field"
          id={name}
          name={name}
          placeholder={label}
          type={type || 'text'}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
        />
      </div>
      <CustomErrorMessage error={error} />
    </div>
  );
};

CustomTextField.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.any,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

CustomTextField.defaultProps = {
  className: null,
  error: null,
  type: 'text',
  value: '',
};

export default CustomTextField;
