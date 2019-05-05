import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Register from './register';
import Contact from './contact';

const FinalForm = () => {
  return (
    <Router>
      <div>
        <h1>Final Form</h1>
        <ul>
          <li>
            <Link to="/final-form/register/">#1</Link>
            &nbsp; Simple example for how to use Final Form.
          </li>
          <li>
            <Link to="/final-form/contact/">#2</Link>
            &nbsp; React wrapper for Final Form.
          </li>
        </ul>
        <hr />
        <Route path="/" />
        <Route path="/final-form/register/" component={Register} />
        <Route path="/final-form/contact/" component={Contact} />
      </div>
    </Router>
  );
};

export default FinalForm;
