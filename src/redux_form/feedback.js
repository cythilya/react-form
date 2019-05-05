import React, { Component } from 'react';
import { connect } from 'react-redux';
import { required, email, length } from 'redux-form-validators';
import { Field, reduxForm, getFormMeta, getFormValues, getFormSyncErrors } from 'redux-form';
import CustomField from './custom_field';
import { load } from './reducer_register';
import asyncValidate from './asyncValidate';

class Feedback extends Component {
  constructor(props) {
    super(props);

    this.getTouchedFields = this.getTouchedFields.bind(this);
    this.getDirtyFields = this.getDirtyFields.bind(this);
  }

  getTouchedFields() {
    const { formMeta } = this.props;

    return Object.keys(formMeta)
      .map((key) => (formMeta[key].touched === true ? key : null))
      .filter((item) => !!item);
  }

  getDirtyFields() {
    const { formMeta, initialValues, formValues } = this.props;

    return Object.keys(formMeta)
      .map((key) =>
        formMeta[key].touched === true && initialValues[key] !== formValues[key] ? key : null,
      )
      .filter((item) => !!item);
  }

  render() {
    const { dirty, formErrors, handleSubmit, pristine, reset, submitting, valid } = this.props;

    return (
      <div>
        <h1>#3</h1>
        <form
          onSubmit={handleSubmit((values) => {
            alert(JSON.stringify(values, null, 2));
          })}
        >
          <Field
            component={CustomField}
            label="Name"
            name="name"
            type="text"
            validate={[
              required({ message: 'Required.' }),
              length({ min: 4, message: 'At least 4 charactors.' }),
            ]}
          />
          <Field
            component={CustomField}
            label="Email"
            name="email"
            type="text"
            validate={[
              required({ message: 'Required.' }),
              email({ message: 'Invalid email address.' }),
            ]}
          />
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

Feedback = reduxForm({
  form: 'register',
})(Feedback);

Feedback = connect(
  (state) => ({
    initialValues: {
      // mockup
      name: 'Ann',
      email: 'test@sample.com',
    },
    asyncValidate,
    asyncBlurFields: ['name'],
    formMeta: getFormMeta('register')(state),
    formValues: getFormValues('register')(state),
    formErrors: getFormSyncErrors('register')(state),
  }),
  { load },
)(Feedback);

export default Feedback;
