import React, {Component} from 'react';
import axios from 'axios';
// import logo from './logo.svg';
import './assets/App.css';
// import SignUp from './SignUp.js';
import SignUpPage from './pages/signUpPage';
import SignInPage from './pages/signInPage';
import HomePage from './pages/homePage';
import ItemDescriptionPage from './pages/itemDescriptionPage';
import FriendsPage from './pages/friendsPage';
import { Route, Link, Redirect, BrowserRouter as Router } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import ForgotPasswordPage from './pages/forgotPasswordPage';
import EmailSentPage from './pages/emailSent';
import ResetPasswordPage from './pages/resetPasswordPage';

class App extends Component {
  state = {
    username: '',
    loggedIn: false
  };

  componentDidMount(){
    axios.get('/api/getCookie.php')
    .then((response) => {
      if(response.data){
        console.log(response.data);
        this.setState({username: response.data});
        this.setState({loggedIn: true});

      }
    })
    .catch(function(error){
        console.log(error);
    });
  };

  setUsername = name => {
    this.setState({username: name});
  }

  toggleLogIn = () => {
    this.setState(state => {
      return {
        loggedIn: !state.loggedIn,
      }
    })
  }

  render(){

    return (
      <Router>
        <div>
          <Switch>
            <div>
              <ul>
                <li>
                  <Link to="/Home">Home</Link>
                </li>
                <li>
                  <Link to="/SignUp">Signup</Link>
                </li>
                <li>
                  <Link to="/">Sign in</Link>
                </li>
                <li>
                  <Link to="/ForgotPassword">Forgot password</Link>
                </li>
                <li>
                  <Link to="/EmailSent">Email sent</Link>
                </li>
                <li>
                  <Link to="/ResetPassword">Reset password</Link>
                </li>
                <li>
                  <Link to="/List">List</Link>
                </li>
                <li>
                  <Link to="/Friends">Friends</Link>
                </li>
              </ul>
              <Route path="/Home" render={() => 
                this.state.loggedIn ? (
                  <HomePage 
                    username={this.state.username}
                    setUsername={this.setUsername}
                    toggleLogIn={this.toggleLogIn}
                  />
                ) : (
                  <Redirect to="/" />  
                )
              } 
              />
              {/* <Route path="/SignUp" component={SignUp} /> */}
              <Route path="/SignUp" render={() => (
                <SignUpPage 
                  setUsername={this.setUsername} 
                  toggleLogIn={this.toggleLogIn} 
                />)} 
              />
              <Route exact path="/" render={() => (
                <SignInPage 
                  setUsername={this.setUsername} 
                  toggleLogIn={this.toggleLogIn} 
                />)}  
              />
              <Route path="/ForgotPassword" component={ForgotPasswordPage} />
              <Route path="/EmailSent" component={EmailSentPage} />
              <Route path="/ResetPassword" component={ResetPasswordPage} />
              <Route path="/List/:id" render={() => (
                <ItemDescriptionPage 
                  setUsername={this.setUsername}
                  toggleLogIn={this.toggleLogIn}
                  loggedIn={this.state.loggedIn}
                  username={this.state.username}
                />)}
              />
              <Route path="/Friends" render={() => 
                this.state.loggedIn ? (
                  <FriendsPage
                    setUsername={this.setUsername}
                    toggleLogIn={this.toggleLogIn}
                    username={this.state.username}
                  />
                ) : (
                  <Redirect to="/" />  
                )
              }  
              />
            </div>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
