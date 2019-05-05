const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function composeAsyncValidators(validatorFns) {
  return async (values, dispatch, props, field) => {
    console.log(`field has async validation: ${field}`);
    let errors;
    for (const validatorFn of validatorFns) {
      try {
        await validatorFn(values, dispatch, props, field);
      } catch (err) {
        errors = Object.assign({}, errors, err);
      }
    }

    if (errors) throw errors;
  };
}

const isNameAvaliable = (values) => {
  return sleep(100).then(() => {
    // simulate server latency
    console.log('asyncValidate: isNameAvaliable');
    if (['john', 'paul', 'george'].includes(values.name)) {
      throw { name: 'That username is taken.' };
    }
  });
};

const isNameValid = (values) => {
  return sleep(1000).then(() => {
    // simulate server latency
    console.log('asyncValidate: isNameValid');
    if (['google', 'amazon', 'tesla', 'paul'].includes(values.name)) {
      throw { name: 'That name is invalid.' };
    }
  });
};

const asyncValidate = composeAsyncValidators([isNameValid, isNameAvaliable]);

export default asyncValidate;
