import React, {Component} from 'react';
import '../assets/App.css';
import List from './List.js';

const ListRow = props => {
  var lists = [];
  for (var i = props.startIndex; i <= props.endIndex; i++) {
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
    var counter = 0;
    var moreToDraw = true;
    while (moreToDraw) {
      if (allLists.length - counter > 4) {
        everything.push(<ListRow allLists={allLists} startIndex={counter} endIndex={counter+3} />)
        counter += 4;
      }
      else {
        everything.push(<ListRow allLists={allLists} startIndex={counter} endIndex={allLists.length-1} />)
        moreToDraw = false;
      }
    }

    return (
      <div>
        {everything}
      </div>
    )
  }
}

export default AllLists;