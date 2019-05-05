import _ from 'lodash';
import React, { Component } from 'react';
import { withFormik, FastField } from 'formik';
import * as yup from 'yup';
import CustomField from './custom_field';
import RenderCount from './render_count';

class Signup extends Component {
  shouldComponentUpdate(nextProps) {
    const { dirty, errors, isValid, values, touched } = this.props;
    const {
      dirty: nextDirty,
      errors: nextErrors,
      isValid: nextIsValid,
      touched: nextTouched,
      values: nextValues,
    } = nextProps;
    const isEqual =
      _.isEqual(values, nextValues) &&
      _.isEqual(dirty, nextDirty) &&
      _.isEqual(errors, nextErrors) &&
      _.isEqual(isValid, nextIsValid) &&
      _.isEqual(touched, nextTouched);

    return !isEqual;
  }

  render() {
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
    } = this.props;

    return (
      <div>
        <h1>#6</h1>
        <form onSubmit={handleSubmit}>
          <RenderCount />
          <FastField
            name="name"
            render={() => (
              <CustomField
                error={touched.name && errors.name}
                label="Name"
                name="name"
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            )}
          />
          <CustomField
            error={touched.the_only_field && errors.the_only_field}
            label="Not fastfield!"
            name="the_only_field"
            value={values.the_only_field}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <FastField
            name="password"
            render={() => (
              <CustomField
                error={touched.password && errors.password}
                label="Password"
                name="password"
                type="password"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            )}
          />
          {values.password !== '' && (
            <FastField
              name="confirm"
              render={() => (
                <CustomField
                  error={touched.confirm && errors.confirm}
                  label="Confirm?"
                  name="confirm"
                  type="password"
                  value={values.confirm}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              )}
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
  }
}

function equalTo(ref, msg) {
  return yup.mixed().test({
    name: 'equalTo',
    exclusive: false,
    message: msg || '${path} must be the same as ${reference}',
    params: {
      reference: ref.path,
    },
    test: (value) => {
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
    // .equalTo(yup.ref('password'), 'Passwords must match.')
    // .required('Required'),
  }),
  handleSubmit: (values, { setSubmitting }) => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
  },
  displayName: 'BasicForm',
})(Signup);
