import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Register from './register';
import Contact from './contact';
import Feedback from './feedback';

const ReduxForm = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <h1>Redux Form</h1>
          <ul>
            <li>
              <Link to="/redux-form/register">#1</Link>
              &nbsp; Simple example. Set field default value, validation, create custom component.
              Validating with redux-form-validators.
            </li>
            <li>
              <Link to="/redux-form/contact">#2</Link>
              &nbsp; Create dynamic fields.
            </li>
            <li>
              <Link to="/redux-form/feedback">#3</Link>
              &nbsp; Hybrid synchronous/asynchronous validation.
            </li>
          </ul>
          <hr />
          <Route path="/" />
          <Route path="/redux-form/register" component={Register} />
          <Route path="/redux-form/contact" component={Contact} />
          <Route path="/redux-form/feedback" component={Feedback} />
        </div>
      </Router>
    </Provider>
  );
};

export default ReduxForm;
