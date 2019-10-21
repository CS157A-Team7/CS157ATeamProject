import React, {Component} from 'react';
// import logo from './logo.svg';
import './assets/App.css';
import axios from 'axios';
import Header from './components/header';
import SignUp from './SignUp.js';
import List from './List.js';
import AllLists from './AllLists.js'

class App extends Component {
  state = {
    results: [],
    lists: [
      {
        name: 'Courses to take',
        items: [
          {
            checked: 'checked',
            name: 'Math 42',
          },
          {
            checked: 'unchecked',
            name: 'CS 157A',
          },
          {
            checked: 'unchecked',
            name: 'CS 157B'
          },
          {
            checked: 'checked',
            name: 'CS 146',
          },
        ],
      },
      {
        name: 'Games to play',
        items: [
          {
            checked: 'checked',
            name: 'Fire Emblem Three Houses',
          },
          {
            checked: 'checked',
            name: 'Disgaea 5',
          },
          {
            checked: 'unchecked',
            name: 'Pokemon Sword'
          },
          {
            checked: 'unchecked',
            name: 'The Last of Us 2',
          },
        ],
      },
      {
        name: 'BBQ Stuff',
        items: [
          {
            checked: 'checked',
            name: 'Hot dogs',
          },
          {
            checked: 'unchecked',
            name: 'Paper plates',
          },
          {
            checked: 'unchecked',
            name: 'Hamburgers'
          },
          {
            checked: 'unchecked',
            name: 'Ketchup',
          },
        ],
      },
      {
        name: 'Pokemon Plushies',
        items: [
          {
            checked: 'unchecked',
            name: 'Pikachu',
          },
          {
            checked: 'unchecked',
            name: 'Cyndaquil',
          },
          {
            checked: 'checked',
            name: 'Turtwig',
          },
        ]
      },
      {
        name: 'Dr. Seuss books',
        items: [
          {
            checked: 'unchecked',
            name: 'The Cat in the Hat',
          },
          {
            checked: 'unchecked',
            name: 'The Lorax',
          },
          {
            checked: 'checked',
            name: 'Database Systems: The Complete Book',
          },
          {
            checked: 'unchecked',
            name: 'Green Eggs and Ham',
          },
        ],
      },
    ],
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
        </header>

        <div className="Button-container">
          <div className="New-list-button">new wishlist</div>
          <div className="New-list-button">new surprise wishlist</div>
          <div className="New-list-button">new todo list</div>
        </div>

        <AllLists allLists={this.state.lists} />

        <header className="List-row">
          <div className="List-container">
            <div className="List-head">
              3-tier architecture demo (just to show it still works)
            </div>
            <div className="List-items">
              <ul>
                <li className="unchecked">{this.state.results}</li>
              </ul>
            </div>
          </div>
        </header>

        </div>
    );
  }
}

export default App;
