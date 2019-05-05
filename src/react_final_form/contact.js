import React from 'react';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import CustomTextField from './custom_text_field';
import { required } from './validation';

const Contact = () => {
  return (
    <div>
      <h1>#2</h1>
      <Form
        initialValues={{
          fruits: [{ name: 'apple' }, { name: 'grape' }],
        }}
        onSubmit={(values) => {
          alert(JSON.stringify(values, 0, 2));
        }}
        mutators={{
          ...arrayMutators,
        }}
        render={({
          dirtyFields,
          errors,
          form: {
            reset,
            mutators: { push, pop },
          },
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
                      component={CustomTextField}
                      label={`fruit #${index + 1}`}
                      name={`${name}.name`}
                      placeholder="Fruit name"
                      validate={required}
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

export default Contact;
