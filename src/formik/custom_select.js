import React from 'react';
import Select from 'react-select';
import RenderCount from './render_count';

class CustomSelect extends React.Component {
  handleChange = (value) => {
    // this is going to call setFieldValue and manually update values.topcis
    this.props.onChange('fruit', value);
  };

  handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched.topcis
    this.props.onBlur('fruit', true);
  };

  render() {
    const { className, id, label, options, error, ...props } = this.props;

    return (
      <div className={`field-control select ${className}`}>
        <RenderCount />
        <div className="field">
          <label className="field-label" htmlFor={id}>
            {label}
          </label>
          <Select
            {...props}
            className="select-wrapper"
            classNamePrefix="custom-select"
            id={id}
            options={options}
            value={this.props.value}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
          />
        </div>
        {!!this.props.error && <div className="error-message">{error}</div>}
      </div>
    );
  }
}

export default CustomSelect;
