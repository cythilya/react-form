import React from 'react';
import { withFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import CustomBootstrapField from './custom_bootstrap_field';
import CustomBootstrapCheckboxField from './custom_bootstrap_checkbox';
import CustomSelect from './custom_select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const Order = (props) => {
  const {
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
    setFieldTouched,
  } = props;

  return (
    <div>
      <h1>#8</h1>
      <Form onSubmit={handleSubmit}>
        <CustomBootstrapField
          className="custom-bootstrap-field"
          error={touched.name && errors.name}
          label="Name"
          name="name"
          placeholder="Enter your name"
          value={values.name}
          onBlur={handleBlur}
          onChange={handleChange}
        />

        <CustomSelect
          className="custom-bootstrap-select-field"
          defaultInputValue=""
          error={touched.fruit && errors.fruit}
          label="Fruit"
          id="fruit"
          name="fruit"
          options={options}
          touched={touched.fruit}
          value={values.fruit}
          onBlur={setFieldTouched}
          onChange={setFieldValue}
        />

        <CustomBootstrapCheckboxField
          className="custom-bootstrap-checkbox-field"
          error={touched.dessert && errors.dessert}
          label="Dessert"
          name="dessert"
          options={['pie', 'pudding', 'cake']}
          touched={touched.dessert}
          value={values.dessert}
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
        />

        <div className="button-group">
          <Button type="reset" onClick={handleReset}>
            Reset
          </Button>
          <Button disabled={!isValid} type="submit" variant="primary">
            Submit
          </Button>
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
    </div>
  );
};

export default withFormik({
  mapPropsToValues: () => ({
    name: '',
    fruit: '',
    dessert: [],
  }),
  validationSchema: yup.object().shape({
    name: yup
      .string()
      .required('Required.')
      .min(4, 'Length must exceed 3 characters.'),
    fruit: yup
      .string()
      .ensure()
      .required('Fruit is required!'),
    dessert: yup.array().min(1, 'At least select one dessert.'),
  }),
  handleSubmit: (values, { setSubmitting }) => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
  },
  displayName: 'BasicForm',
})(Order);
