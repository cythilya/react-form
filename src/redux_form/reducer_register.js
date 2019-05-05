const LOAD = 'load';

const reducer = (state = {}, action) => {
  const { data, type } = action;
  switch (type) {
    case LOAD:
      return { data };
    default:
      return state;
  }
};

export const load = (data) => ({ type: LOAD, data });

export default reducer;
