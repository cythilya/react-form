import React from 'react';
import { withFormik } from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import CustomTextField from './custom_text_field';

const Subscribe = ({
  dirty,
  errors,
  isValid,
  touched,
  values,
  handleSubmit,
  handleChange,
  handleBlur,
  handleReset,
  setFieldValue,
}) => {
  return (
    <div>
      <h1>#7</h1>
      <form onSubmit={handleSubmit}>
        <CustomTextField
          error={touched.name && errors.name}
          label="Name"
          name="name"
          type="text"
          value={values.name}
          onBlur={handleBlur}
          onChange={(e) => {
            e.preventDefault();
            handleChange(e);
            console.log('a');
          }}
        />
        <CustomTextField
          error={touched.email && errors.email}
          label="Email"
          name="email"
          type="text"
          value={values.email}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <div className="field-control">
          <div className="field">
            <input
              className="custom-checkbox-field"
              label="Subscribe to the newsletter"
              name="subscribe"
              type="checkbox"
              value={values.subscribe}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <label className="field-long-label">Subscribe to the newsletter</label>
          </div>
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
      </form>
    </div>
  );
};

Subscribe.propTypes = {
  dirty: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  isValid: PropTypes.bool.isRequired,
  touched: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

yup.addMethod(yup.string, 'isEmail', function(message) {
  return this.test('isEmail', message, (value) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
  });
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
yup.addMethod(yup.string, 'isNameAvailable', function(message) {
  return this.test({
    name: 'isNameAvailable',
    exclusive: true,
    message,
    async test(value) {
      return await sleep(300).then(() => {
        if (~['john', 'paul', 'george', 'ringo', 'jack'].indexOf(value && value.toLowerCase())) {
          return false;
        }
        return true;
      });
    },
  });
});

yup.addMethod(yup.string, 'isValidName', function(message) {
  return this.test({
    name: 'isValidName',
    exclusive: true,
    message,
    async test(value) {
      return await sleep(300).then(() => {
        if (~['google', 'pchome', 'facebook'].indexOf(value && value.toLowerCase())) {
          return false;
        }
        return true;
      });
    },
  });
});

const schemas = yup.object().shape({
  name: yup
    .string()
    .required('Required.')
    .trim()
    .isNameAvailable('Name is taken!')
    .min(4, 'Length must exceed 3 characters.')
    .isValidName('Invalid name. Cannot be Google, Facebook or PChome.'),
  email: yup.string().when('subscribe', {
    is: true,
    then: (fieldSchema) => fieldSchema.required('Required.').isEmail('Invalid email address.'),
  }),
  subscribe: yup.boolean(),
});

export default withFormik({
  mapPropsToValues: () => ({
    name: 'Alice',
    email: '',
    subscribe: false,
  }),
  validationSchema: schemas,
  handleSubmit: (values, { setSubmitting }) => {
    const result = schemas.cast({
      [values.name]: {
        name: values.name,
        email: values.email,
        subscribe: values.subscribe,
      },
    });

    alert(JSON.stringify(result, null, 2));
    setSubmitting(false);
  },
  displayName: 'subscribeForm',
})(Subscribe);
