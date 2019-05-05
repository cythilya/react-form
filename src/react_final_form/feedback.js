import React from 'react';
import { Form } from 'react-final-form';
import { Field } from 'react-final-form-html5-validation';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';

const Input = ({ input, label, type, meta: { error, touched }, ...rest }) => (
  <div className="field-control">
    <div className="field">
      <label className="field-label " htmlFor={input.name}>
        {label}
      </label>
      <input
        autoComplete="off"
        className="custom-text-field"
        placeholder={label}
        type={type}
        {...input}
        {...rest}
      />
    </div>
    {touched && (error && <div className="error-message">{error}</div>)}
  </div>
);

const Feedback = () => {
  return (
    <div>
      <h1>#3</h1>
      <Form
        initialValues={{
          fruits: [{ name: 'Apple' }, { name: 'Grape' }],
        }}
        mutators={{
          ...arrayMutators,
        }}
        onSubmit={(values) => {
          alert(JSON.stringify(values, 0, 2));
        }}
        render={({
          dirtyFields,
          errors,
          mutators: { push, pop, unshift },
          form: { reset },
          handleSubmit,
          pristine,
          submitting,
          touched,
          valid,
          values,
        }) => (
          <form onSubmit={handleSubmit}>
            <FieldArray name="fruits">
              {({ fields }) =>
                fields.map((name, index) => (
                  <div className="field-item" key={name}>
                    <Field
                      component={Input}
                      label={`fruit #${index + 1}`}
                      required
                      maxLength={20}
                      minLength={4}
                      name={`${name}.name`}
                      placeholder="Fruit name"
                      type="text"
                      tooLong="This name is too long."
                      tooShort="This name is too short."
                      valueMissing="Required."
                    />
                    <a className="button-remove" onClick={() => fields.remove(index)}>
                      x
                    </a>
                  </div>
                ))
              }
            </FieldArray>
            <div className="button-group">
              <button className="button" type="button" onClick={() => push('fruits', undefined)}>
                Add field
              </button>
              <button className="button" type="button" onClick={() => pop('fruits')}>
                Remove field
              </button>
              <button className="button" disabled={submitting} type="reset" onClick={reset}>
                Reset
              </button>
              <button className="button-submit" disabled={!valid} type="submit">
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
                {JSON.stringify(valid)}
              </li>
              <li>
                dirty:
                {JSON.stringify(dirtyFields)}
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
};

export default Feedback;
