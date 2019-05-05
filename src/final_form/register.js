import React, { Component } from 'react';
import { createForm } from 'final-form';
import { validate, onSubmit } from './utils';

class Register extends Component {
  constructor(props) {
    super(props);

    const initialState = {};
    const initialValues = {
      name: 'Ann',
      email: 'test@sample.com',
    };
    let inConstructor = true;
    this.form = createForm({ initialValues, onSubmit, validate });

    // subscribe to form changes
    this.unsubscribe = this.form.subscribe(
      (formState) => {
        if (inConstructor) {
          initialState.formState = formState;
        } else {
          this.setState({ formState });
        }
      },
      {
        valid: true,
        active: true,
        pristine: true,
        submitting: true,
        values: true,
      },
    );

    // subscribe to field changes
    this.unsubscribeFields = ['name', 'email'].map((fieldName) => {
      return this.form.registerField(
        fieldName,
        (fieldState) => {
          // cannot call setState in constructor, but need to on subsequent notifications
          if (inConstructor) {
            initialState[fieldName] = fieldState;
          } else {
            this.setState({ [fieldName]: fieldState });
          }
        },
        {
          error: true,
          touched: true,
          value: true,
        },
      );
    });

    this.state = initialState;
    this.handleSubmit = this.handleSubmit.bind(this);
    inConstructor = false;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.form.submit();
  }

  render() {
    const { formState, name, email } = this.state;
    return (
      <div>
        <h1>#1</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="field-control">
            <div className="field">
              <label className="field-label" htmlFor="name">
                Name
              </label>
              <input
                className="custom-text-field"
                id="name"
                name="name"
                type="text"
                onBlur={() => name.blur()}
                onChange={(event) => name.change(event.target.value || undefined)}
                onFocus={() => name.focus()}
                value={name.value || ''}
                autoComplete="off"
              />
            </div>
            {!!name.error && name.touched && <div className="error-message">{name.error}</div>}
          </div>
          <div className="field-control">
            <div className="field">
              <label className="field-label" htmlFor="email">
                Email
              </label>
              <input
                className="custom-text-field"
                id="email"
                name="email"
                type="text"
                onBlur={() => email.blur()}
                onChange={(event) => email.change(event.target.value || undefined)}
                onFocus={() => email.focus()}
                value={email.value || ''}
                autoComplete="off"
              />
            </div>
            {!!email.error && email.touched && <div className="error-message">{name.email}</div>}
          </div>
          <button
            className="button-submit"
            type="submit"
            disabled={formState.submitting || !formState.valid}
          >
            Submit
          </button>
          <hr />
          <pre>{JSON.stringify(this.state, 0, 2)}</pre>
        </form>
      </div>
    );
  }
}

export default Register;
