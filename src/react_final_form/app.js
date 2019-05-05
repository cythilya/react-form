import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Register from './register';
import Contact from './contact';
import Feedback from './feedback';
import Survey from './survey';
import Login from './login';

const ReactFinalForm = () => {
  return (
    <Router>
      <div>
        <h1>React Final Form</h1>
        <ul>
          <li>
            <Link to="/react-final-form/register">#1</Link>
            &nbsp; Hybrid sync/async validation, conditional validation.
          </li>
          <li>
            <Link to="/react-final-form/contact">#2</Link>
            &nbsp; Dynamic fields.
          </li>
          <li>
            <Link to="/react-final-form/feedback">#3</Link>
            &nbsp; Validating with "react-final-form-html5-validation".
          </li>
          <li>
            <Link to="/react-final-form/survey">#4</Link>
            &nbsp; Performance optimization through subscriptions.
          </li>
          <li>
            <Link to="/react-final-form/login">#5</Link>
            &nbsp; Decorators.
          </li>
        </ul>
        <hr />
        <Route path="/" />
        <Route path="/react-final-form/register" component={Register} />
        <Route path="/react-final-form/contact" component={Contact} />
        <Route path="/react-final-form/feedback" component={Feedback} />
        <Route path="/react-final-form/survey" component={Survey} />
        <Route path="/react-final-form/login" component={Login} />
      </div>
    </Router>
  );
};

export default ReactFinalForm;
