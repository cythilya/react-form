import React from 'react';
import _ from 'lodash';
import 'bootstrap/dist/css/bootstrap.css';
import { Form } from 'react-bootstrap';
import CustomErrorMessage from './custom_error_message';
import RenderCount from './render_count';

const CustomBootstrapCheckboxField = ({
  className,
  name,
  options,
  value,
  error,
  id,
  label,
  placeholder,
  type,
  onChange,
  onBlur,
  touched,
  setFieldValue,
  setFieldTouched,
  ...props
}) => {
  return (
    <div className={`field-control ${className}`}>
      <RenderCount />
      <div className="field">
        <Form.Label>{label}</Form.Label>
        <Form.Group controlId={id}>
          <div className="field">
            {_.map(options, (option) => {
              return (
                <Form.Check
                  {...props}
                  checked={value.includes(option)}
                  id={option}
                  key={option}
                  label={option}
                  name={name}
                  type="checkbox"
                  value={value}
                  onBlur={() => {
                    setFieldTouched(name, true);
                  }}
                  onChange={() => {
                    if (value.includes(option)) {
                      const nextValue = value.filter((item) => item !== option);
                      setFieldValue(name, nextValue);
                    } else {
                      const nextValue = value.concat(option);
                      setFieldValue(name, nextValue);
                    }
                  }}
                />
              );
            })}
          </div>
        </Form.Group>
      </div>
      <CustomErrorMessage error={error} />
    </div>
  );
};

export default CustomBootstrapCheckboxField;
