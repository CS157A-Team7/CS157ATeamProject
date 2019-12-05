import React, {Component} from 'react';
import '../assets/App.css';


class ListNames extends Component {
  render() {
    const { listData, listSelected, deletingLists, listsToDelete } = this.props

    const names = listData.map((list) => {
        return (
            <div className={deletingLists&&listsToDelete.includes(list)?"List-Name-deleting-selected"
              :deletingLists?"List-Name-deleting"
              :list===listSelected?"List-Name-selected"
              :"List-Name"} 
              onClick={() => {
                if (deletingLists) {
                  this.props.handleListsToDelete(list)
                } else {
                  this.props.getList(list)
                }
              }}
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
