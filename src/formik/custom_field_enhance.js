import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomErrorMessage from './custom_error_message';
import RenderCount from './render_count';

class CustomFieldEnhance extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { type, id, label, error, value, onChange, className, onBlur, ...props } = this.props;

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
            id={id}
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
  }
}

CustomFieldEnhance.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

CustomFieldEnhance.defaultProps = {
  className: null,
  error: null,
  type: 'text',
};

export default CustomFieldEnhance;
