import React, {Component} from 'react';
import '../assets/App.css';
import axios from 'axios';
import Header from '../components/header';
import AllLists from '../components/AllLists.js';

class HomePage extends Component {
  state = {
    results: [],
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

export default HomePage;
