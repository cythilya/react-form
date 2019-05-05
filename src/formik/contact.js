import React from 'react';
import { Formik } from 'formik';

// async validation
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const validate = (values) => {
  return sleep(500).then(() => {
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

    if (Object.keys(errors).length) {
      throw errors;
    }
  });
};

const Contact = () => (
  <div>
    <h1>#2</h1>
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
        dirty,
        errors,
        isValid,
        touched,
        values: { valName, valEmail },
        handleBlur,
        handleChange,
        handleReset,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <div className="field-control">
            <div className="field">
              <label className="field-label">Name</label>
              <input
                autoComplete="off"
                className="custom-text-field"
                name="name"
                type="text"
                value={valName}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>
          <div className="field-control">
            <div className="field">
              <label className="field-label">Email</label>
              <input
                autoComplete="off"
                className="custom-text-field"
                name="email"
                type="text"
                value={valEmail}
                onBlur={handleBlur}
                onChange={handleChange}
              />
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
          </ul>
        </form>
      )}
    />
  </div>
);

export default Contact;
