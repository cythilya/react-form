import React from 'react';
import { Form, Field } from 'react-final-form';
import createDecorator from 'final-form-focus';
import CustomField from './custom_field';
import { required } from './validation';

const focusOnErrors = createDecorator();

const Login = () => {
  return (
    <div>
      <h1>#5</h1>
      <Form
        onSubmit={(values) => {
          alert(JSON.stringify(values, 0, 2));
        }}
        decorators={[focusOnErrors]}
        initialValues={{
          name: 'Ann',
          password: '12345',
        }}
        render={({ dirtyFields, errors, handleSubmit, submitting, touched, valid, values }) => (
          <form onSubmit={handleSubmit}>
            <Field component={CustomField} label="Name" name="name" validate={required} />
            <Field
              component={CustomField}
              label="Password"
              name="password"
              validate={required}
              type="password"
            />
            <div className="button-group">
              <button className="button-submit" disabled={!valid && submitting} type="submit">
                Submit
              </button>
            </div>
            <hr />
            <ul>
              <li>
                errors:
                {JSON.stringify(errors)}
              </li>
              <li>
                isValid:
                {JSON.stringify(valid)}
              </li>
              <li>
                dirty:
                {JSON.stringify(dirtyFields)}
              </li>
              <li>
                touched:
                {JSON.stringify(touched)}
              </li>
            </ul>
          </form>
        )}
      />
    </div>
  );
};

export default Login;
