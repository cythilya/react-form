import React from 'react';
import { Formik, Form, Field } from 'formik';

const validate = (values) => {
  const { name, email } = values;
  const errors = {};

  // name
  if (name === '') {
    errors.name = 'Required.';
  } else if (name.length <= 3) {
    errors.name = 'At least 4 characters.';
  }

  // email
  if (email === '') {
    errors.email = 'Required.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address.';
  }

  return errors;
};

const Register = () => (
  <div>
    <h1>#1</h1>
    <Formik
      // 表單初始值
      initialValues={{
        name: '',
        email: '',
      }}
      // 驗證規則
      validate={validate}
      // 表單送出
      onSubmit={(values, actions) => {
        console.log(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }}
      render={({
        handleSubmit,
        handleChange,
        handleBlur,
        handleReset,
        values,
        errors,
        isValid,
        touched,
        dirty,
      }) => (
        <Form>
          <div className="field-control">
            <div className="field">
              <label className="field-label">Name</label>
              <Field className="custom-text-field" name="name" autoComplete="off" />
            </div>
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>
          <div className="field-control">
            <div className="field">
              <label className="field-label">Email</label>
              <Field className="custom-text-field" name="email" autoComplete="off" />
            </div>
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>
          <div className="button-group">
            <button className="button" type="reset" onClick={handleReset}>
              Reset
            </button>
            <button className="button-submit" type="submit">
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
              {JSON.stringify(isValid)}
            </li>
            <li>
              dirty:
              {JSON.stringify(dirty)}
            </li>
            <li>
              touched:
              {JSON.stringify(touched)}
            </li>
            <li>
              values:
              {JSON.stringify(values)}
            </li>
          </ul>
        </Form>
      )}
    />
  </div>
);

export default Register;
