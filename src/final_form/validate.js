const validate = ({ name, email }) => {
  const error = {};

  if (!name) {
    error.name = 'Required.';
  } else if (name.length < 4) {
    error.name = 'Must more chan 3 characters.';
  }

  if (!email) {
    error.email = 'Required.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    error.email = 'Invalid email address';
  }

  return error;
};

export default validate;
