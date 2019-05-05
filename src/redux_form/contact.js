import React, { Component } from 'react';
import { connect } from 'react-redux';
import { required } from 'redux-form-validators';
import {
  Field,
  reduxForm,
  FieldArray,
  getFormMeta,
  getFormValues,
  getFormSyncErrors,
} from 'redux-form';
import CustomField from './custom_field';
import { load } from './reducer_register';

const renderFruits = ({ fields, meta: { error } }) => (
  <div>
    <button type="button" className="button" onClick={() => fields.push()}>
      Add Fruit
    </button>
    <ul>
      {fields.map((fruit, index) => (
        <li className="friut-item" key={index}>
          <Field
            component={CustomField}
            label={`Fruit #${index + 1}`}
            name={fruit}
            type="text"
            validate={[required({ message: 'Required.' })]}
          />
          <button
            className="button button-remove-fruit"
            title="Remove Fruit"
            type="button"
            onClick={() => fields.remove(index)}
          >
            x
          </button>
        </li>
      ))}
      {error && <div className="error">{error}</div>}
    </ul>
  </div>
);

class Contact extends Component {
  constructor(props) {
    super(props);

    this.getTouchedFields = this.getTouchedFields.bind(this);
    this.getDirtyFields = this.getDirtyFields.bind(this);
  }

  getTouchedFields() {
    const { formMeta } = this.props;
    const values = Object.values(formMeta)[0];

    return values
      ? values
          .map((item, index) => (item && item.touched === true ? index : null))
          .filter((item) => item !== null)
      : null;
  }

  getDirtyFields() {
    const { formMeta, initialValues, formValues } = this.props;
    const values = Object.values(formMeta)[0];
    const initialFruits = initialValues.fruits;
    const formCurrentFruits = formValues ? formValues.fruits : Array(Object.keys(formMeta).length);

    return values
      ? values
          .map((item, index) => {
            return item &&
              item.touched === true &&
              initialFruits[index] !== formCurrentFruits[index]
              ? index
              : null;
          })
          .filter((item) => item !== null)
      : null;
  }

  render() {
    const { dirty, formErrors, handleSubmit, pristine, reset, submitting, valid } = this.props;

    return (
      <div>
        <h1>#2</h1>
        <form
          onSubmit={handleSubmit((values) => {
            alert(JSON.stringify(values, null, 2));
          })}
        >
          <FieldArray name="fruits" component={renderFruits} />
          <div className="button-group">
            <button
              className="button"
              disabled={pristine || submitting}
              type="reset"
              onClick={reset}
            >
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
              {JSON.stringify(formErrors)}
            </li>
            <li>
              isValid:
              {JSON.stringify(valid)}
            </li>
            <li>
              dirty ({JSON.stringify(dirty)}):
              {JSON.stringify(this.getDirtyFields())}
            </li>
            <li>
              touched ({JSON.stringify(!pristine)}):
              {JSON.stringify(this.getTouchedFields())}
            </li>
          </ul>
        </form>
      </div>
    );
  }
}

Contact = reduxForm({
  form: 'simpeForm',
})(Contact);

Contact = connect(
  (state) => ({
    initialValues: {
      // mockup
      fruits: ['apple', 'grape'],
    },
    formMeta: getFormMeta('simpeForm')(state),
    formValues: getFormValues('simpeForm')(state),
    formErrors: getFormSyncErrors('simpeForm')(state),
  }),
  { load },
)(Contact);

export default Contact;
