import React from 'react';
import { withFormik } from 'formik';
import * as yup from 'yup';
import CustomTextField from './custom_text_field';

const Survey = ({
  dirty,
  errors,
  isValid,
  values,
  touched,
  handleSubmit,
  handleChange,
  handleBlur,
  handleReset,
  setFieldValue,
}) => {
  return (
    <div>
      <h1>#4</h1>
      <form onSubmit={handleSubmit}>
        <CustomTextField
          error={touched.name && errors.name}
          label="Name"
          name="name"
          type="text"
          value={values.name}
          onBlur={handleBlur}
          onChange={handleChange}
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
              label="Has referrer?"
              name="hasReferrer"
              type="checkbox"
              value={values.hasReferrer}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <label>hasReferrer</label>
          </div>
        </div>
        <CustomTextField
          error={touched.referrer && errors.referrer}
          label="Referrer"
          name="referrer"
          type="text"
          value={values.referrer}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <CustomTextField
          error={touched.fruits && errors.fruits}
          label="Fruits"
          name="fruits"
          type="text"
          value={values.fruits}
          onBlur={(e) => {
            handleBlur(e);
            setFieldValue('fruits', e.target.value.split(','));
          }}
          onChange={handleChange}
        />
        <div className="button-group">
          <button className="button" type="reset" onClick={handleReset}>
            Reset
          </button>
          <button className="button-submit" type="submit" disabled={!isValid}>
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

yup.addMethod(yup.string, 'isEmail', function(message) {
  return this.test('test-name', message, (value) => {
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

yup.addMethod(yup.string, 'isPetName', function(message) {
  return this.test({
    name: 'isPetName',
    exclusive: true,
    message,
    async test(value) {
      return await sleep(300).then(() => {
        if (~['doggie'].indexOf(value && value.toLowerCase())) {
          return false;
        }
        return true;
      });
    },
  });
});

export default withFormik({
  mapPropsToValues: () => ({
    name: '',
    email: '',
    hasReferrer: false,
    referrer: '',
    fruits: ['apple', 'grape', 1],
  }),
  validationSchema: yup.object().shape({
    name: yup
      .string()
      .required('Required.')
      .isNameAvailable('Name is taken!')
      .min(4, 'Length must exceed 3 characters.')
      .isPetName('Cannot be a pet name.'),
    email: yup
      .string()
      .required('Required.')
      .isEmail('Invalid email address.'),
    hasReferrer: yup.boolean(),
    referrer: yup.string().when('hasReferrer', {
      is: true,
      then: (fieldSchema) => fieldSchema.required('Required.'),
    }),
    fruits: yup
      .array()
      .of(
        yup.number().typeError((value) => {
          return `${value.originalValue} must be an integer. `;
        }),
      )
      .required('Required.'),
  }),
  handleSubmit: (values, { setSubmitting }) => {
    console.log(JSON.stringify(values, null, 2));
    setSubmitting(false);
  },
  displayName: 'surveyForm',
})(Survey);
