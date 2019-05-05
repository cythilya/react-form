import { createStore, combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import register from './reducer_register';

const reducer = combineReducers({
  register,
  form: reduxFormReducer,
});

export default createStore(reducer);
