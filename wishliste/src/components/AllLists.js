import React, {Component} from 'react';
import '../assets/App.css';
import List from './List.js';

const ListRow = props => {
  var lists = [];
  for (var i = props.startIndex; i < props.startIndex + 4; i++) {
    if (props.allLists[i] == null) {
      break;
    }
    lists.push(<List listData={props.allLists[i]} />)
  }

  return (
    <header className="Row-of-lists">
      {lists}
    </header>  
  )
}

class AllLists extends Component {
  render() {
    const { allLists } = this.props

    var everything = [];
    for (var i = 0; i < allLists.length; i += 4) {
      everything.push(<ListRow allLists={allLists} startIndex={i} />)
    }

    return (
      <div>
        {everything}
      </div>
    )
  }
}

export default AllLists;