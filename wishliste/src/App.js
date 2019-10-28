import React, {Component} from 'react';
// import logo from './logo.svg';
import './assets/App.css';
import axios from 'axios';
import Header from './components/header';
import SignUp from './SignUp.js';
import AllLists from './components/AllLists.js';

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
    const params = new URLSearchParams();
    params.append('username', 'ash_ketchum@hotmail.com');
    axios.post('/api/getListswithItems.php', params)
    .then((response) => {
      this.setState({ results:response.data });
      console.log(this.state.results)
    })
    .catch(function(error){
        console.log(error);
    });
  };

  render(){

    if(!this.state.results){
      return(
        <div>
          <hr/>
        </div>
      )
    };

    return (

      <div className="App">
        <Header />

        <div className="New-button-container">
          <div className="New-list-button">new wishlist</div>
          <div className="New-list-button">new surprise wishlist</div>
          <div className="New-list-button">new todo list</div>
        </div>

        <AllLists allLists={this.state.results} />
        </div>
    );
  }
}

export default App;
