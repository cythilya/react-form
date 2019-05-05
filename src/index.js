import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ReduxForm from './redux_form/app';
import FinalForm from './final_form/app';
import ReactFinalForm from './react_final_form/app';
import Formik from './formik/app';
import './styles/index.scss';

const Index = () => {
  return (
    <Router>
      <div>
        <h1>
          <Link to="/">React Form</Link>
        </h1>
        <ul>
          <li>
            <Link to="/redux-form/">Redux Form</Link>
          </li>
          <li>
            <Link to="/final-form">Final Form</Link>
          </li>
          <li>
            <Link to="/react-final-form">React Final Form</Link>
          </li>
          <li>
            <Link to="/formik">Formik</Link>
          </li>
        </ul>
        <hr />
        <Route path="/" />
        <Route path="/redux-form/" component={ReduxForm} />
        <Route path="/final-form/" component={FinalForm} />
        <Route path="/react-final-form/" component={ReactFinalForm} />
        <Route path="/formik/" component={Formik} />
      </div>
    </Router>
  );
};

ReactDOM.render(<Index />, document.getElementById('app'));
