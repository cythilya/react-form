import React from 'react';
import { Formik } from 'formik';

// sync validation
const validate = (values) => {
  const { name, email } = values;
  const errors = {};

  // name
  if (name === '') {
    errors.name = 'Required.';
  } else if (name.length < 4) {
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

const Feedback = () => (
  <div>
    <h1>#3</h1>
    <Formik
      // 表單初始值
      initialValues={{
        list: ['name', 'email'],
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
        values,
        touched,
        handleBlur,
        handleChange,
        handleReset,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          {values.list.map((item, index) => (
            <div className="field-control" key={index}>
              <div className="field">
                <label className="field-label">{item}</label>
                <input
                  autoComplete="off"
                  className="custom-text-field"
                  name={item}
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {errors[item] && <div className="error-message">{errors[item]}</div>}
            </div>
          ))}
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

export default Feedback;
