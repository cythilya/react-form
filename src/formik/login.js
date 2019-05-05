import React from 'react';
import { withFormik } from 'formik';
import * as yup from 'yup';
import CustomTextField from './custom_text_field';

const Login = (props) => {
  const {
    dirty,
    errors,
    isValid,
    touched,
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    handleReset,
  } = props;

  return (
    <div>
      <h1>#5</h1>
      <form onSubmit={handleSubmit}>
        <CustomTextField
          error={touched.name && errors.name}
          label="Name"
          name="name"
          type="name"
          value={values.name}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <CustomTextField
          error={touched.password && errors.password}
          label="Password"
          name="password"
          type="password"
          value={values.password}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {values.password !== '' && (
          <CustomTextField
            error={touched.confirm && errors.confirm}
            label="Confirm?"
            name="confirm"
            type="password"
            value={values.confirm}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        )}
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

function equalTo(ref, msg) {
  return yup.mixed().test({
    name: 'equalTo',
    exclusive: false,
    message: msg || '${path} must be the same as ${reference}',
    params: {
      reference: ref.path,
    },
    test(value) {
      return value === this.resolve(ref);
    },
  });
}

yup.addMethod(yup.string, 'equalTo', equalTo);

export default withFormik({
  mapPropsToValues: () => ({
    name: '',
    password: '',
    confirm: '',
  }),
  validationSchema: yup.object().shape({
    name: yup
      .string()
      .required('Required.')
      .min(4, 'Length must exceed 3 characters.'),
    password: yup.string().required('Required.'),
    confirm: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match.')
      .required('Required.'),
  }),
  handleSubmit: (values, { setSubmitting }) => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
  },
  displayName: 'BasicForm',
})(Login);
