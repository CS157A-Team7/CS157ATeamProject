import React, {Component} from 'react';
import '../assets/App.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';


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
              {/* {!deletingLists?'':listsToDelete.includes(list)?
                <FontAwesomeIcon icon={faTrashAlt} className="Delete-icon-selected" size="xs" />
                : 
                <FontAwesomeIcon icon={faTrashAlt} className="Delete-icon-deselected" size="xs" />
              } */}
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
