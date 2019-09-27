import React, {Component} from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    results: []
  };

  componentDidMount() {
    const url = '/api/test.php'
    axios.get(url).then(response => response.data)
    .then((data) => {
      this.setState({ results: data })
      console.log(this.state.results)
     })
  };


  render() {
    return(
    <div className="App">
      <table border='1' width='100%'>
        <tr>
            <td>{ this.state.results}</td>
        </tr>
      </table>
    </div>
    );
  }
}

export default App;
