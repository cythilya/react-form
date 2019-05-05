const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Required.';
  } else if (values.name.length < 4) {
    errors.name = 'Must more chan 3 characters.';
  }
  if (!values.email) {
    errors.email = 'Required.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address.';
  }
  return errors;
};

export default validate;
