import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Register from './register';
import Contact from './contact';
import Feedback from './feedback';
import Survey from './survey';
import Login from './login';
import Signup from './signup';
import Subscribe from './subscribe';
import Order from './order';

const Formik = () => {
  return (
    <Router>
      <div>
        <h1>Formik & Yup</h1>
        <ul>
          <li>
            <Link to="/formik/register">#1</Link>
            &nbsp; Synchronous validation.
          </li>
          <li>
            <Link to="/formik/contact">#2</Link>
            &nbsp; Asynchronous validation.
          </li>
          <li>
            <Link to="/formik/feedback">#3</Link>
            &nbsp; Dynamic fields.
          </li>
          <li>
            <Link to="/formik/survey">#4</Link>
            &nbsp; Validation with Yup, including array of numbers.
          </li>
          <li>
            <Link to="/formik/login">#5</Link>
            &nbsp; Validation with Yup, checking field equality (confirm password).
          </li>
          <li>
            <Link to="/formik/signup">#6</Link>
            &nbsp; Fastfield for performance optimization.
          </li>
          <li>
            <Link to="/formik/subscribe">#7</Link>
            &nbsp; Conditional validation.
          </li>
          <li>
            <Link to="/formik/order">#8</Link>
            &nbsp; Intergating with React Select and React Bootstrap.
          </li>
        </ul>
        <hr />
        <Route path="/" />
        <Route path="/formik/register" component={Register} />
        <Route path="/formik/contact" component={Contact} />
        <Route path="/formik/feedback" component={Feedback} />
        <Route path="/formik/survey" component={Survey} />
        <Route path="/formik/login" component={Login} />
        <Route path="/formik/signup" component={Signup} />
        <Route path="/formik/subscribe" component={Subscribe} />
        <Route path="/formik/order" component={Order} />
      </div>
    </Router>
  );
};

export default Formik;
