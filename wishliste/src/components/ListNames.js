import React, {Component} from 'react';
import '../assets/App.css';


class ListNames extends Component {
  render() {
    const { listData } = this.props

    const names = listData.map((list) => {
        return (
            <div className="List-Names-head" onClick={() => console.log("Display " + list.name)}>
              {list.name}
            </div>
        )
    })

    return (
        <div className="List-Names-container">
            {names}
        </div>
    )
  }
}

export default ListNames;
