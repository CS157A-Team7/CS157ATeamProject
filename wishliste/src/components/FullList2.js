import React, {Component, useState} from 'react';
import '../assets/App.css';
import Popup from 'reactjs-popup';
import axios from 'axios';

const ListHead = props => {

  const [listTitle, setListTitle] = useState('');

  if (props.editingItems) {
    return (
      <Popup
        trigger={
          <div className={props.currentPage==="home"?"Full-List2-head":"Full-List-head"}>
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
              Edit list name <br />
              <input 
                type="text" 
                name="name" 
                placeholder="Name" 
                autoFocus
                maxLength="45"
                defaultValue={props.listData.name}
                onChange={(event) => {
                  setListTitle(event.target.value); 
                }} 
                autoFocus
              />
            </label>
          </form>
          <div className="Menu-button-container">
            <input 
              className="Menu-button" 
              type="button" 
              value="Confirm" 
              onClick={() => {
                let newTitle = listTitle === '' ? props.listData.name : listTitle;
                props.handleListNameChange(newTitle);
                props.updateDB(newTitle, '', '');
                props.closeEditMenu();
              }}
            />
            <input className="Menu-button" type="button" value="Cancel" onClick={() => props.closeEditMenu()}/>
          </div>
        </div>
      </Popup>
    )
  } else {
    return (
      <div className={props.currentPage==="home"?"Full-List2-head":"Full-List-head"}>
        {props.listData.name}
      </div>
    )
  }

}

const ListItem = props => {
  return (
    <li className={!props.deletingItems?'not-deleting':props.itemsToDelete.includes(props.item)?'deleting-checked':'deleting-unchecked'}
      onClick={() => {
        if (props.currentPage === "singleList" && !props.signedIn) {
        } else if (props.deletingItems) {
          props.handleItemsToDelete(props.item);
        } else {
          props.toggleCheckmark(props.index);
        }
      }} 
    >
      <li className={props.item.checked==1?'checked':'unchecked'}>
        {props.item.name}
      </li>
      <div className={props.currentPage==="home"?"Full-List2-item-description":"Full-List-item-description"}>
        {props.item.description} 
      </div>
    </li>
  )
}

const ListBody = props => {

  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [listDescription, setListDescription] = useState('');

  const items = props.listData.items.map((item, index) => {
    if (props.editingItems) {
      return (
        <Popup
          trigger={
            <li className='not-deleting'>
              <li className={item.checked==1?'checked':'unchecked'}>
                {item.name}
              </li>
              <div className={props.currentPage==="home"?"Full-List2-item-description":"Full-List-item-description"}>
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
                Edit item <br />
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Name" 
                  autoFocus
                  maxLength="45"
                  defaultValue={item.name}
                  onChange={(event) => {
                    setItemName(event.target.value);
                  }}
                  autoFocus
                />
              </label>
            </form>
            <form className="Label-menu-item">
              <label>
                <input 
                  type="text" 
                  name="description" 
                  maxLength="245"
                  placeholder="Description" 
                  defaultValue={item.description}
                  onChange={(event) => {
                    setItemDescription(event.target.value); 
                  }}
                />
              </label>
            </form>
            <div className="Menu-button-container">
              <input 
                className="Menu-button" 
                type="button" 
                value="Confirm" 
                onClick={() => {
                  let newName = itemName === '' ? item.name : itemName;
                  let newDescription = itemDescription;// === '' ? item.description : itemDescription;
                  props.handleItemChange(index,newName, newDescription);
                  props.updateDB(newName, newDescription, item.item_id, setItemName, setItemDescription);
                  props.closeEditMenu();
                }}/>
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
          index={index}
          toggleCheckmark={props.toggleCheckmark} 
          currentPage={props.currentPage}
          signedIn={props.signedIn}
        />
      )
    }
  })

  return (
    <div className={props.currentPage==="home"?"Full-List2-items":"Full-List-items"}>
      {props.editingItems?
        <Popup
          trigger={
            <div className={props.currentPage==="home"?"Full-List2-list-description":"Full-List-list-description"}>
              {props.listData.description} <br />
              {props.listData.date && props.listData.list_type === "surprise" && props.owner === props.username ? "Date set: " + props.listData.date
              : props.listData.date && props.listData.list_type === "surprise" ? "Date set by " + props.listData.owner + ": " + props.listData.date
              : props.listData.date && props.listData.list_type === "todo" ? "Complete by: " + props.listData.date
              : ""}
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
                Edit list description <br />
                <input 
                  type="text" 
                  name="description" 
                  placeholder="Description"
                  maxLength="245" 
                  defaultValue={props.listData.description} 
                  onChange={(event) => {
                    setListDescription(event.target.value);
                  }}
                  autoFocus
                />
              </label>
            </form>
            <div className="Menu-button-container">
              <input 
                className="Menu-button" 
                type="button"
                value="Confirm" 
                onClick={() => {
                  let newDescription = listDescription === '' ? props.listData.description : listDescription;
                  props.handleListDescriptionChange(newDescription);
                  props.updateDB('', newDescription, '');
                  props.closeEditMenu();
                }}/>
              <input className="Menu-button" type="button" value="Cancel" onClick={() => props.closeEditMenu()}/>
            </div>
          </div>
        </Popup>
      :
        <div className={props.currentPage==="home"?"Full-List2-list-description":"Full-List-list-description"}>
          {props.listData.description} <br /> 
          {props.listData.date && props.listData.list_type === "surprise" && props.owner === props.username ? "Date set: " + props.listData.date
          : props.listData.date && props.listData.list_type === "surprise" ? "Date set by " + props.listData.owner + ": " + props.listData.date
          : props.listData.date && props.listData.list_type === "todo" ? "Complete by: " + props.listData.date
          : ""}
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
    editMenuOpen: {}
  }

  openEditMenu = element => {
    this.setState({editMenuOpen: element})
  }

  closeEditMenu = () => {
    this.setState({editMenuOpen: {}})
  }

  updateDB = (name, description, item_id, setItemName, setItemDescription) => {
    const params = new URLSearchParams();
    if(name !== '' && description === '' && item_id === '')
    {
      params.append('list_id', this.props.listData.list_id);
      params.append('name', name);
      axios.post('/api/updateListName.php', params)
      .then((response) => {
        this.props.toggleDBChange();
      })
      .catch(function(error){
      });
    }
    else if(name === '' && description !== '' && item_id === '')
    {
      params.append('list_id', this.props.listData.list_id);
      params.append('description', description);
      axios.post('/api/updateListDescription.php', params)
      .then((response) => {
        this.props.toggleDBChange();
      })
      .catch(function(error){
      });
    }
    else {
      params.append('item_id', item_id);
      params.append('name', name);
      params.append('description', description);
      axios.post('/api/updateItem.php', params)
      .then((response) => {
        this.props.toggleDBChange();
        setItemName('');
        setItemDescription('');
      })
      .catch(function(error){
      });
    }
  }

  render() {
    const { 
      listData, 
      deletingItems, 
      handleItemsToDelete, 
      itemsToDelete, 
      editingItems, 
      handleListNameChange, 
      handleListDescriptionChange,
      handleItemChange,
      toggleCheckmark,
      currentPage,
      signedIn } = this.props

    if (!listData) {
      return (
        <div>
          <hr/>
        </div>
      )
    };

    return (
      <div className={currentPage==="home"?"Full-List2-container":"Full-List-container"}>
        <ListHead 
          listData={listData} 
          editingItems={editingItems} 
          editMenuOpen={this.state.editMenuOpen}
          openEditMenu={this.openEditMenu}
          closeEditMenu={this.closeEditMenu}
          updateDB = {this.updateDB}
          handleListNameChange = {handleListNameChange}
          currentPage = {currentPage}
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
          updateDB = {this.updateDB}
          handleItemChange = {handleItemChange}
          handleListDescriptionChange = {handleListDescriptionChange}
          toggleCheckmark = {toggleCheckmark}
          currentPage = {currentPage}
          signedIn = {signedIn}
        />
      </div>
    )
  }
}

export default FullList2;
