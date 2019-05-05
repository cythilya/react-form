import React, { Component } from 'react';
import { createForm } from 'final-form';
import Input from './input';

export class Form extends Component {
  static Field = ({ data, formState, label, subscription }) => {
    const title = label.toLowerCase();

    return (
      <div>
        <Input
          error={data[title].error}
          label={label}
          name={title}
          subscription={subscription}
          touched={data[title].touched}
          value={formState.values[title]}
          onBlur={() => {
            data[title].blur();
          }}
          onChange={(event) => data[title].change(event.target.value || '')}
          onFocus={() => data[title].focus()}
        />
      </div>
    );
  };

  constructor(props) {
    super(props);

    const { onSubmit, validate, initialValues, subscription } = this.props;
    const properties = {};
    subscription.forEach((item) => {
      properties[item] = true;
    });

    this.initialState = {};
    this.inConstructor = true;
    this.form = createForm({ initialValues, onSubmit, validate });

    // subscribe to form changes
    this.unsubscribe = this.form.subscribe((formState) => {
      if (this.inConstructor) {
        this.initialState.formState = formState;
      } else {
        this.setState({ formState });
      }
    }, properties);

    this.state = this.initialState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.subscribeField = this.subscribeField.bind(this);
    this.subscribeField();
  }

  subscribeField() {
    // subscribe to field changes
    this.unsubscribeFields = ['name', 'email'].map((fieldName) => {
      return this.form.registerField(
        fieldName,
        (fieldState) => {
          // cannot call setState in constructor, but need to on subsequent notifications
          if (this.inConstructor) {
            this.initialState[fieldName] = fieldState;
          } else {
            this.setState({ [fieldName]: fieldState });
          }
        },
        {
          active: true,
          error: true,
          touched: true,
          value: true,
        },
      );
    });

    this.inConstructor = false;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.formState.values);
  }

  render() {
    const { formState, name, email } = this.state;
    const children = React.Children.map(this.props.children, (child) =>
      React.cloneElement(child, {
        formState: formState,
        data: {
          name: name,
          email: email,
        },
      }),
    );

    return (
      <form onSubmit={this.handleSubmit}>
        {children}
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
    );
  }
}
