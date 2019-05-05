import React from 'react';
import classNames from 'classnames';
import RenderCount from './render_count';

const CustomField = ({ input, label, type, meta: { touched, error, active }, ...rest }) => {
  return (
    <div className="field-control">
      <RenderCount />
      <div
        className={classNames('field', {
          'field-active': active,
        })}
      >
        <label className="field-label" htmlFor={input.name}>
          {label}
        </label>
        <input
          {...input}
          {...rest}
          autoComplete="off"
          className="custom-text-field"
          placeholder={label}
          type={type || 'text'}
        />
      </div>
      {touched && (error && <div className="error-message">{error}</div>)}
    </div>
  );
};
export default CustomField;
