import React from 'react';
import { Form, Field } from 'react-final-form';
import CustomTextField from './custom_text_field';
import { required, userNameAvailable } from './validation';
import { composeValidators } from './util';

const Register = () => {
  return (
    <div>
      <h1>#1</h1>
      <p>
        In this example, the numbers in the circles are the number of times that component has been
        rendered.
        <br />
        This is a form with no specified subscription, rerenders the whole form and every input on
        every change.
      </p>
      <hr />
      <Form
        onSubmit={(values) => {
          alert(JSON.stringify(values, 0, 2));
        }}
        initialValues={{
          name: 'Ann',
          email: 'test@sample.com',
          hasReferrer: true,
          referrer: 'Hello World',
        }}
        render={({
          dirtyFields,
          errors,
          form: { reset },
          handleSubmit,
          submitting,
          touched,
          valid,
          values,
        }) => (
          <form onSubmit={handleSubmit}>
            <Field
              component={CustomTextField}
              disabled={values.disable_all_fields}
              label="Name"
              name="name"
              validate={composeValidators(required, userNameAvailable)}
            />
            <Field
              component={CustomTextField}
              disabled={values.disable_all_fields}
              label="Email"
              name="email"
              validate={required}
              type="email"
            />
            <Field
              component={CustomTextField}
              disabled={values.disable_all_fields}
              label="Password"
              name="password"
              validate={required}
              type="password"
            />
            <Field
              component={CustomTextField}
              disabled={values.disable_all_fields}
              label="PW Again?"
              name="verify_password"
              validate={required}
              type="password"
            />
            <div className="field-control-select-box">
              <Field
                className="custom-checkbox-field"
                component="input"
                disabled={values.disable_all_fields}
                name="hasReferrer"
                type="checkbox"
              />
              <label className="hint">Has referrer?</label>
            </div>
            {values.hasReferrer && (
              <Field
                component={CustomTextField}
                disabled={values.disable_all_fields}
                label="Referrer"
                name="referrer"
                validate={values.hasReferrer ? composeValidators(required) : null}
              />
            )}
            <div className="field-control-select-box">
              <Field
                className="custom-checkbox-field"
                component="input"
                name="disable_all_fields"
                type="checkbox"
              />
              <label className="hint">Disabled all fields?</label>
            </div>
            <div className="button-group">
              <button className="button" disabled={submitting} type="reset" onClick={reset}>
                Reset
              </button>
              <button className="button-submit" disabled={!valid} type="submit">
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

export default Register;
