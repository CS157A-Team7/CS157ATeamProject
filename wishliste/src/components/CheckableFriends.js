import React from 'react';
import '../assets/App.css';

const CheckableFriends = props => {
  const items = props.friends.map((friend) => {
    return (
      <li className={props.friendsSelected.includes(friend)?"checked":"unchecked"}
        onClick={() => props.handleFriendsSelected(friend)}
      >
        {friend.username}
      </li>
    )
  })

  return (
    <ul className="List-menu-item">
      {items}
    </ul>
  )
}

export default CheckableFriends;