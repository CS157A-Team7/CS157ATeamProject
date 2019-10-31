import React, {Component} from 'react';
// import logo from './logo.svg';
import './assets/App.css';
import SignUp from './SignUp.js';
import HomePage from './pages/homePage';
import ItemDescriptionPage from './pages/itemDescriptionPage';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { Switch } from 'react-router-dom';

class App extends Component {
  state = {
    results: [],
  };

  render(){

    return (
      <Router>
        <div>
          <Switch>
            <div>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/SignUp">Signup</Link>
                </li>
                <li>
                  <Link to="/List">List</Link>
                </li>
              </ul>
              <Route exact path="/" component={HomePage} />
              <Route path="/SignUp" component={SignUp} />
              <Route path="/List" component={ItemDescriptionPage} />
            </div>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
