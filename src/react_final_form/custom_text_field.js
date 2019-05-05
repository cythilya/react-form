import React from 'react';
import classNames from 'classnames';

const CustomTextField = ({
  input, label, type, meta: { touched, error, active }, ...rest
}) => {
  return (
    <div className="field-control">
      <div
        className={classNames('field', {
          'field-active': active,
        })}
      >
        <label className="field-label" htmlFor={input.name}>
          {label}
        </label>
        <input {...input} {...rest} className="custom-text-field" placeholder={label} type={type || 'text'} autoComplete="off" />
      </div>
      {touched && (error && <div className="error-message">{error}</div>)}
    </div>
  );
};
export default CustomTextField;
