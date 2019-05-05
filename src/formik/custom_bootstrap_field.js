import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Form } from 'react-bootstrap';
import CustomErrorMessage from './custom_error_message';
import RenderCount from './render_count';

const CustomBootstrapField = ({
  className,
  error,
  id,
  label,
  placeholder,
  type,
  value,
  onBlur,
  onChange,
  ...props
}) => {
  return (
    <div className={`field-control ${className}`}>
      <RenderCount />
      <Form.Group controlId={id}>
        <div className="field">
          <Form.Label>{label}</Form.Label>
          <Form.Control
            {...props}
            autoComplete="off"
            id={id}
            placeholder={placeholder}
            type={type || 'text'}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
          />
        </div>
        <CustomErrorMessage error={error} />
      </Form.Group>
    </div>
  );
};

export default CustomBootstrapField;
