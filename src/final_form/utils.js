export const onSubmit = async (values) => {
  await new Promise((resolve) => setTimeout(resolve, 0));
  alert(JSON.stringify(values, 0, 2));
};

export const validate = (values) => {
  const error = {};

  if (!values.name) {
    error.name = 'Required.';
  } else if (values.name.length < 4) {
    error.name = 'Must more chan 3 characters.';
  }
  if (!values.email) {
    error.email = 'Required.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    error.email = 'Invalid email address';
  }
  return error;
};
