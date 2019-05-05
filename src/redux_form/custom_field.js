import React from 'react';

const CustomField = ({ label, input, meta: { touched, error }, type = 'text' }) => {
  const { name } = input;

  return (
    <div className="field-control">
      <div className="field">
        <label className="field-label" htmlFor={name}>
          {label}
        </label>
        <input
          {...input}
          autoComplete="off"
          className="custom-text-field"
          placeholder={label}
          type={type}
        />
      </div>
      {touched && error && <div className="error-message">{error}</div>}
    </div>
  );
};
export default CustomField;
