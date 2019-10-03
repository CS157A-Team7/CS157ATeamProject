import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';

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
        <div className="Header-bar">
          <div className="Header-text">WishListé</div>
        </div>
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
