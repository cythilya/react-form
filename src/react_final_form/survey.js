import React from 'react';
import { Form, Field, FormSpy } from 'react-final-form';
import CustomField from './custom_field';
import RenderCount from './render_count';
import { required, isEmail } from './validation';

const Survey = () => {
  return (
    <div>
      <h1>#4</h1>
      <p>
        This is a form that subscribes only to the changes it needs to update
        <br />
        By not rerendering the whole form on every change, the fields, too, become independent.
      </p>
      <hr />
      <Form
        onSubmit={(values) => {
          alert(JSON.stringify(values, 0, 2));
        }}
        initialValues={{
          name: '',
          email: 'test',
        }}
        subscription={{
          valid: true,
        }}
        render={({ form: { reset }, handleSubmit, valid }) => (
          <form onSubmit={handleSubmit}>
            <RenderCount />
            <Field component={CustomField} label="Name" name="name" validate={required} />
            <Field component={CustomField} label="Email" name="email" validate={isEmail} />
            <div className="button-group">
              <button className="button" type="reset" onClick={reset}>
                Reset
              </button>
              <button className="button-submit" disabled={!valid} type="submit">
                Submit
              </button>
            </div>
            <hr />
            <FormSpy
              subscription={{
                dirtyFields: true,
                errors: true,
                touched: true,
                valid: true,
              }}
            >
              {({ dirtyFields, errors, touched }) => (
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
              )}
            </FormSpy>
          </form>
        )}
      />
    </div>
  );
};

export default Survey;
