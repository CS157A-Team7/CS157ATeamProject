import React, {Component} from 'react';
import '../assets/App.css';
import Popup from 'reactjs-popup';

const ListHead = props => {
  if (props.editingItems) {
    return (
      <Popup
        trigger={
          <div className="Full-List2-head">
            {props.listData.name}
          </div>
        }
        position="left top"
        on="click"
        open={props.editMenuOpen===props.listData.name}
        onOpen={() => props.openEditMenu(props.listData.name)}
        onClose={() => props.closeEditMenu()}
        closeOnDocumentClick
        closeOnDocumentClick
        mouseLeaveDelay={300}
        mouseEnterDelay={0}
        contentStyle={{ padding: "0px", border: "none" }}
        arrow={false}
      >
        <div className="Plain-menu">
          <form className="Label-menu-item">
            <label>
              Edit list name
              <input type="text" name="name" placeholder="Name" defaultValue={props.listData.name} />
            </label>
          </form>
          <div className="Menu-button-container">
            <input className="Menu-button" type="button" value="Confirm" onClick={() => console.log("Edited list name")}/>
            <input className="Menu-button" type="button" value="Cancel" onClick={() => props.closeEditMenu()}/>
          </div>
        </div>
      </Popup>
    )
  } else {
    return (
      <div className="Full-List2-head">
        {props.listData.name}
      </div>
    )
  }

}

const ListItem = props => {
  return (
    <li className={!props.deletingItems?'not-deleting':props.itemsToDelete.includes(props.item)?'deleting-checked':'deleting-unchecked'}
      onClick={() => {
        if (props.deletingItems) {
          console.log("Select/deselect "+props.item.name+" to be deleted");
          props.handleItemsToDelete(props.item);
        } else {
          console.log("Check/uncheck "+props.item.name)
        }
      }} 
    >
      <li className={props.item.checked==1?'checked':'unchecked'}>
        {props.item.name}
      </li>
      <div className="Full-List2-item-description">
        {props.item.description} 
      </div>
    </li>
  )
}

const ListBody = props => {
  const items = props.listData.items.map((item) => {
    if (props.editingItems) {
      return (
        <Popup
          trigger={
            <li className='not-deleting'>
              <li className={item.checked==1?'checked':'unchecked'}>
                {item.name}
              </li>
              <div className="Full-List2-item-description">
                {item.description} 
              </div>
            </li>
          }
          position="left top"
          on="click"
          open={props.editMenuOpen===item}
          onOpen={() => props.openEditMenu(item)}
          onClose={() => props.closeEditMenu()}
          closeOnDocumentClick
          mouseLeaveDelay={300}
          mouseEnterDelay={0}
          contentStyle={{ padding: "0px", border: "none" }}
          arrow={false}
        >
          <div className="Plain-menu">
            <form className="Label-menu-item">
              <label>
                Edit item
                <input type="text" name="name" placeholder="Name" defaultValue={item.name}/>
              </label>
            </form>
            <form className="Label-menu-item">
              <label>
                <input type="text" name="description" placeholder="Description" defaultValue={item.description}/>
              </label>
            </form>
            <div className="Menu-button-container">
              <input className="Menu-button" type="button" value="Confirm" onClick={() => console.log("Edited " + item.name)}/>
              <input className="Menu-button" type="button" value="Cancel" onClick={() => props.closeEditMenu()}/>
            </div>
          </div>
        </Popup>
      )
    } else {
      return (
        <ListItem           
          deletingItems={props.deletingItems} 
          handleItemsToDelete={props.handleItemsToDelete} 
          itemsToDelete={props.itemsToDelete}  
          item={item} 
        />
      )
    }
  })

  return (
    <div className="Full-List2-items">
      {props.editingItems?
        <Popup
          trigger={
            <div className="Full-List2-list-description">
              {props.listData.description}
            </div>
          }
          position="left top"
          on="click"
          open={props.editMenuOpen===props.listData.description}
          onOpen={() => props.openEditMenu(props.listData.description)}
          onClose={() => props.closeEditMenu()}
          closeOnDocumentClick
          closeOnDocumentClick
          mouseLeaveDelay={300}
          mouseEnterDelay={0}
          contentStyle={{ padding: "0px", border: "none" }}
          arrow={false}
        >
          <div className="Plain-menu">
            <form className="Label-menu-item">
              <label>
                Edit list description
                <input type="text" name="description" placeholder="Description" defaultValue={props.listData.description} />
              </label>
            </form>
            <div className="Menu-button-container">
              <input className="Menu-button" type="button" value="Confirm" onClick={() => console.log("Edited list description")}/>
              <input className="Menu-button" type="button" value="Cancel" onClick={() => props.closeEditMenu()}/>
            </div>
          </div>
        </Popup>
      :
        <div className="Full-List2-list-description">
          {props.listData.description}
        </div>
      }
      <ul>
        {items}
      </ul>
    </div>
  )
}

class FullList2 extends Component {
  state = {
    editMenuOpen: {},
  }

  openEditMenu = element => {
    this.setState({editMenuOpen: element})
  }

  closeEditMenu = () => {
    this.setState({editMenuOpen: {}})
  }

  render() {
    const { listData, deletingItems, handleItemsToDelete, itemsToDelete, editingItems } = this.props

    if (!listData) {
      return (
        <div>
          <hr/>
        </div>
      )
    };

    return (
      <div className="Full-List2-container">
        <ListHead 
          listData={listData} 
          editingItems={editingItems} 
          editMenuOpen={this.state.editMenuOpen}
          openEditMenu={this.openEditMenu}
          closeEditMenu={this.closeEditMenu}
        />
        <ListBody 
          listData={listData} 
          deletingItems={deletingItems} 
          handleItemsToDelete={handleItemsToDelete} 
          itemsToDelete={itemsToDelete} 
          editingItems={editingItems}
          editMenuOpen={this.state.editMenuOpen}
          openEditMenu={this.openEditMenu}
          closeEditMenu={this.closeEditMenu}
        />
      </div>
    )
  }
}

export default FullList2;
