import React, {Component} from 'react';
import '../assets/App.css';
import axios from 'axios';
import Header from '../components/header';
import FriendsList from '../components/FriendsList';
import Popup from 'reactjs-popup';

class FriendsPage extends Component {
  state = {
    username: "ash_ketchum@hotmail.com",
    friends: [
      { username: "ching-seh.wu@sjsu.edu" },
      { username: "bill@aol.com" },
      { username: "sam@aol.com" }
    ],
    addingFriend: false,
  }
  
  render() {
    return (
      <div className="App">
        <Header />

        <div className="Centered-button-container">
          <Popup
            trigger={<div className="New-list-button-thin">+</div>}
            position="right top"
            on="click"
            open={this.state.addingFriend}
            onOpen={() => this.setState({addingFriend: true})}
            onClose={() => this.setState({addingFriend: false})}
            closeOnDocumentClick
            mouseLeaveDelay={300}
            mouseEnterDelay={0}
            contentStyle={{ padding: "0px", border: "none" }}
            arrow={false}
          >
            <div className="Plain-menu">
              <form className="Label-menu-item">
                <label>
                  Add friend
                  <input type="text" name="name" placeholder="Username" />
                </label>
              </form>
            </div>
            <div className="Menu-button-container">
              <input className="Menu-button" type="button" value="Confirm" onClick={console.log("Add friend or get error b/c user doesn't exist")} />
              <input className="Menu-button" type="button" value="Cancel" onClick={() => this.setState({addingFriend: false})}/>
            </div>
          </Popup>
        </div>

        <FriendsList friends={this.state.friends} />

      </div>
    );
  }
}

export default FriendsPage;