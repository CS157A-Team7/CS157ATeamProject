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
    friend: '',
    addingFriend: false,
    friendError: "",
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

  addFriend = () => {
    let checkDB = true;
    this.state.friends.map((aFriend) => {
      if (aFriend.username===this.state.friend) {
        this.setState({friendError: "alreadyAdded"})
        checkDB = false;
      }
    });
    if (this.state.friend===this.props.username) {
      this.setState({friendError: "yourself"})
    } else if (checkDB) {
      axios.get('/api/addFriend.php', {
        params: {
          username: this.props.username,
          friend: this.state.friend
        }
      })
      .then((response) => {
        if(response.data){
          this.setState({friendError: "doesntExist"})
          console.log(response.data)
        }
        else{
          let friends = this.state.friends;
          let friend = {username:this.state.friend};
          friends.push(friend);
          this.setState({friends: friends});
          this.setState({addingFriend: false})
          this.setState({friendError: ""})
        }
      })
      .catch(function(error){
          console.log(error);
      });
    }
  }

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
            onClose={() => {
              this.setState({addingFriend: false})
              this.setState({friendError: ""})
            }}
            closeOnDocumentClick
            mouseLeaveDelay={300}
            mouseEnterDelay={0}
            contentStyle={{ padding: "0px", border: "none" }}
            arrow={false}
          >
            <div className="Plain-menu">
              <form className="Label-menu-item">
                <label>
                  Add friend <br />
                  <input type="text" name="name" autoFocus maxLength="45" 
                    placeholder="Username"
                    className={this.state.friendError!==""?"input-error":""}
                    onChange={(event) => {
                      this.setState({ friend: event.target.value },()=>{
                        console.log(this.state.friend);
                      }) 
                    }}
                  />
                </label>
                <label className="bottom-text-error">
                  <br />
                  {this.state.friendError === "alreadyAdded" ? "User is already your friend"
                  :this.state.friendError === "yourself" ? "Can't add yourself..."
                  :this.state.friendError === "doesntExist" ? "User does not exist. Try again"
                  :""
                  }
                </label>
              </form>
            </div>
            <div className="Menu-button-container">
              <input className="Menu-button" type="button" value="Confirm" onClick={this.addFriend} />
              <input className="Menu-button" type="button" value="Cancel" onClick={() => {
                this.setState({addingFriend: false})
                this.setState({friendError: ""})
              }}/>
            </div>
          </Popup>
        </div>

        <FriendsList friends={this.state.friends} />

      </div>
    );
  }
}

export default FriendsPage;