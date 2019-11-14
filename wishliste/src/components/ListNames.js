import React, {Component} from 'react';
import '../assets/App.css';


class ListNames extends Component {
  render() {
    const { listData, listSelected } = this.props

    const names = listData.map((list) => {
        return (
            <div className={list===listSelected?"List-Names-head-selected":"List-Names-head"} 
              onClick={() => {this.props.getList(list)}}
            >
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
