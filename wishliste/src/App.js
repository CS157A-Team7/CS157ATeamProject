import React, {Component} from 'react';
// import logo from './logo.svg';
import './assets/App.css';
// import SignUp from './SignUp.js';
import SignUpPage from './pages/signUpPage';
import SignInPage from './pages/signInPage';
import HomePage from './pages/homePage';
import ItemDescriptionPage from './pages/itemDescriptionPage';
import FriendsPage from './pages/friendsPage';
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
                  <Link to="/SignIn">Sign in</Link>
                </li>
                <li>
                  <Link to="/List">List</Link>
                </li>
                <li>
                  <Link to="/Friends">Friends</Link>
                </li>
              </ul>
              <Route exact path="/" component={HomePage} />
              {/* <Route path="/SignUp" component={SignUp} /> */}
              <Route path="/SignUp" component={SignUpPage} />
              <Route path="/SignIn" component={SignInPage} />
              <Route path="/List" component={ItemDescriptionPage} />
              <Route path="/Friends" component={FriendsPage} />
            </div>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
