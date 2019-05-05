import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import App from './app';
import Register from './register';
import Contact from './contact';
import Feedback from './feedback';
import Survey from './survey';

const Index = () => {
  return (
    <Router>
      <div>
        <h1>React Final Form</h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>: hybrid sync/async validation, conditional
            validation
          </li>
          <li>
            <Link to="/contact">Contact</Link>: dynamic fields
          </li>
          <li>
            <Link to="/feedback">Feedback</Link>: validating with
            "react-final-form-html5-validation"（很雞肋）
          </li>
          <li>
            <Link to="/survey">Survey</Link>: performance optimization through subscriptions
          </li>
        </ul>
        <hr />
        <Route path="/" component={App} />
        <Route path="/register" component={Register} />
        <Route path="/contact" component={Contact} />
        <Route path="/feedback" component={Feedback} />
        <Route path="/survey" component={Survey} />
      </div>
    </Router>
  );
};

ReactDOM.render(<Index />, document.getElementById('root'));
