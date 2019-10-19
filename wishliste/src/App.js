import React, {Component} from 'react';
// import logo from './logo.svg';
import './assets/App.css';
import axios from 'axios';
import Header from './components/header';
import SignUp from './SignUp.js';

class App extends Component {
  state = {
    results: []
  };

  componentDidMount(){
    const url = '/api/test.php';
    axios.get(url).then(response => response.data)
    .then((data) => {
      this.setState({ results:data })
      console.log(this.state.results)
    })
  };

  render(){
    return (

      <div className="App">
        <Header />
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <div className="Container-head">
            Group #7 3-tier architecture demo <br />
          </div>
          <div className="Container-list">
            {this.state.results}
          </div>
        </header>

        

        </div>
    );
  }
}

export default App;
