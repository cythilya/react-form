export const required = (value) => (value ? null : 'Required.');

export const minLength = (value) =>
  value.length > 0 && value.length < 4 ? 'Length must exceed 3 characters.' : null;

export const isEmail = (value) =>
  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : null;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export const userNameAvailable = async (value) => {
  await sleep(200);
  if (~['john', 'paul', 'george', 'ringo', 'jack'].indexOf(value && value.toLowerCase())) {
    return 'User name taken!';
  }
};
