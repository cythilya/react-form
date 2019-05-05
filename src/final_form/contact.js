import React from 'react';
import { Form } from './form';
import validate from './validate';

const Contact = () => {
  return (
    <div>
      <h1>#2</h1>
      <Form
        initialValues={{
          name: 'Ann',
          email: 'sample@test.com',
        }}
        onSubmit={(values) => {
          alert(JSON.stringify(values, 0, 2));
        }}
        validate={validate}
        subscription={['valid', 'pristine', 'submitting', 'values']}
      >
        <Form.Field label="Name" name="name" />
        <Form.Field label="Email" name="email" />
      </Form>
    </div>
  );
};

export default Contact;
