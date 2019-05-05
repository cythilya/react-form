import React from 'react';
import PropTypes from 'prop-types';
import CustomErrorMessage from './custom_error_message';
import RenderCount from './render_count';

const CustomField = ({
  className,
  error,
  id,
  label,
  name,
  type,
  value,
  onBlur,
  onChange,
  ...props
}) => {
  return (
    <div className="field-control">
      <RenderCount />
      <div className="field">
        <label className="field-label" htmlFor={id}>
          {label}
        </label>
        <input
          {...props}
          autoComplete="off"
          className="custom-text-field"
          name={name}
          id={name}
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

CustomField.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.any,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

CustomField.defaultProps = {
  className: null,
  error: null,
  type: 'text',
  value: '',
};

export default CustomField;
