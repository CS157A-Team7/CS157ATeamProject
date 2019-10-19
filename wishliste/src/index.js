import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ItemDescriptionPage from './pages/itemDescriptionPage';
import * as serviceWorker from './serviceWorker';

import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import SignUp from './SignUp'
//import Feed from './Feed'

const routing = (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/SignUp">Signup</Link>
          </li>
        </ul>
        <Route exact path="/" component={App} />
        <Route path= "/SignUp" component={SignUp} />
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
