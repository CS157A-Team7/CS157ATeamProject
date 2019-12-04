import React, {Component} from 'react';
import '../assets/App.css';
import axios from 'axios';
import Header from '../components/header';
import FriendsList from '../components/FriendsList';
import Popup from 'reactjs-popup';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

class FriendsPage extends Component {
  state = {
    // username: "ash_ketchum@hotmail.com",
    friends: [],
    addingFriend: false,
  }
  
  componentDidMount(){
    const params = new URLSearchParams();
    params.append('username', this.props.username);
    axios.post('/api/getFriends.php', params)
    .then((response) => {
      if(response.data instanceof Array)
      {
        this.setState({ friends:response.data });
      }
      console.log(response.data);
    })
    .catch(function(error){
        console.log(error);
    });
  };

  render() {
    return (
      <div className="App">
        <Header 
          page="FriendsPage" 
          toggleLogIn={this.props.toggleLogIn} 
          setUsername={this.props.setUsername}
          username={this.props.username} 
        />

        <div className="Centered-button-container">
          <Popup
            trigger={
              <div className="Fa-icon-style Fa-icon-color">
                <FontAwesomeIcon icon={faPlus} size="s" />
              </div>
            }
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
              <input className="Menu-button" type="button" value="Confirm" onClick={() => console.log("Add friend or get error b/c user doesn't exist")} />
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