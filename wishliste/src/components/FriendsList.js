import React, {Component} from 'react';
import '../assets/App.css';

const ListHead = () => {
  return (
    <div className="Full-List-head">
      Your Friends
    </div>
  )
}

const ListBody = props => {
  const friends = props.friends.map((friend) => {
    return (
      <li onClick={() => console.log("clicked on " + friend.username)}>
        {friend.username}
      </li>
    )
  })

  return (
    <div className="Full-List-items">
      <ul>
        {friends}
      </ul>
    </div>
  )
}

class FriendsList extends Component {
  render() {
    const { friends } = this.props

    return (
      <div className="Full-List-container">
        <ListHead />
        <ListBody friends={friends} />
      </div>
    )
  }
}

export default FriendsList;
