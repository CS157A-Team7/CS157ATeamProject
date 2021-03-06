import React, {useState, useEffect} from 'react';
import '../assets/App.css';
import axios from 'axios';
import Header from '../components/header';
import FullList2 from '../components/FullList2';
import Popup from 'reactjs-popup';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlus, faPen, faTimes, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useHistory, useParams } from 'react-router-dom';

const ItemDescriptionPage = (props) => {
    const [list, setList] = useState([]);
    const [itemsToDelete, setItemsToDelete] = useState([]);
    const [newItemOpen, setNewItemOpen] = useState(false);
    const [newItemName, setNewItemName] = useState("");
    const [newItemDescription, setNewItemDescription] = useState("");
    const [dbChange, setDbChange] = useState(false);
    const [deletingItems, setDeletingItems] = useState(false);
    const [editingItems, setEditingItems] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [shareError, setShareError] = useState("");

    let history = useHistory();
    let {id} = useParams();

    useEffect(() => {
        axios.get('/api/getItems.php', {
            params: {
                list_id: id
            }
        })
        .then(function(response){
            if(response.data instanceof Object){
                setList(response.data);
            } else {
              setShareError(response.data);
            }
        })
        .catch(function(error){
        });
    },[]);
  
  const addItem = () => {
    if (newItemName) {
      axios.get('/api/addItemToTable.php', {
        params: {
          name: newItemName,
          description: newItemDescription,
          checked: 0,
          list_id: list.list_id
        }
      })
      .then((response) => {
        if(response.data){
          toggleDBChange();
          updateList();
        };
      })
      .catch(function(error){
      });
      setNewItemOpen(false);
      setNameError(false);
    } else {
      setNameError(true);
    }
  }

  const deleteItems = () => { 
    axios({
    url: '/api/deleteItemsFromTable.php',
    method: 'post',
    data: itemsToDelete  
    })
    .then((response) => {
      setItemsToDelete([]);
      toggleDBChange();
      updateList();
    })
    .catch(function(error){
    });
    setDeletingItems(false);
  }

  const updateList = () => {
    axios.get('/api/getListItems.php', {
      params: {
        list_id: list.list_id
      }
    })
    .then((response) => {
      setList({
        ...list,
        items: response.data
      })
    })
    .catch(function(error){
    });
  }

  const handleItemsToDelete = item => {
    if(itemsToDelete.includes(item))
    {
      const filteredItems = itemsToDelete.filter(i => i.item_id !== item.item_id);
      setItemsToDelete(filteredItems);
    }
    else{
      setItemsToDelete([...itemsToDelete, item]);
    }
  };
  
  const handleListNameChange = newName => {
    setList({...list, name: newName});
  };
  
  const handleListDescriptionChange = newDescription => {
    setList({...list, description: newDescription});
  };
  
  const handleItemChange = (index, newName, newDescription) => {
    let items = list.items;
    items[index].name = newName;
    items[index].description = newDescription;
  
    setList({...list, items: items});
  };

  const toggleDBChange = () => {
    if (dbChange) {
      setDbChange(false)
    } else {
      setDbChange(true)
    }
  }
  
  const toggleCheckmark = index => {
    let items = list.items;
    items[index].checked = items[index].checked == 1 ? 0 : 1;
    setList({...list, items: items});
  
    const params = new URLSearchParams();
    params.append('checkmark', items[index].checked);
    params.append('item_id', items[index].item_id);
    axios.post('/api/updateItemCheckmark.php', params)
    .then((response) => {
    })
    .catch(function(error){
    });
  };

  if(!list){
    return (
      <div>
        <h1>Empty List</h1>
      </div>
    );
  }

  return (

    <div className="App">
      <Header page="ItemDescriptionPage" signedIn={props.loggedIn} toggleLogIn={props.toggleLogIn} setUsername={props.setUsername} username={props.username}/>

      {shareError !== "" ? 
        <div className="List-Unaccessable-Error">
          Error: {shareError}
        </div>
      : !props.loggedIn ? '' : !deletingItems ?
        <div className="Centered-button-container">
          <div className="Fa-icon-style Fa-icon-color" onClick={() => {
            history.push('/Home')
          }}>
            <FontAwesomeIcon icon={faArrowLeft} size="s" />
          </div>
          <Popup
            trigger={
              <div className="Fa-icon-style Fa-icon-color">
                <FontAwesomeIcon icon={faPlus} size="s" />
              </div>
            }
            position="right top"
            on="click"
            open={newItemOpen}
            onOpen={() => setNewItemOpen(true)}
            onClose={() => {
              setNewItemOpen(false)
              setNameError(false)
            }}
            closeOnDocumentClick
            mouseLeaveDelay={300}
            mouseEnterDelay={0}
            contentStyle={{ padding: "0px", border: "none" }}
            arrow={false}
          >
            <div className="Plain-menu">
              <form className="Label-menu-item">
                <label>
                  New item <br />
                  <input type="text" name="name" autoFocus maxLength="45"
                    placeholder={nameError?"Name (required)":"Name"}
                    className={nameError?"input-error":""}
                    onChange={(event) => {
                      setNewItemName(event.target.value)
                    }}
                  />
                </label>
              </form>
              <form className="Label-menu-item">
                <label>
                  <input type="text" name="description" placeholder="Description" maxLength="245"
                    onChange={(event) => {
                      setNewItemDescription(event.target.value)
                    }}
                  />
                </label>
              </form>
              <div className="Menu-button-container">
                <input className="Menu-button" type="button" value="Confirm" onClick={() => addItem()} 
                />
                <input className="Menu-button" type="button" value="Cancel" onClick={() => {
                  setNewItemOpen(false)
                  setNameError(false)
                }}/>
              </div>
            </div>
          </Popup>

          <div className="Fa-icon-style Fa-icon-color" 
            onClick={() => {
              setDeletingItems(true)
              setEditingItems(false)
            }}
          >
            <FontAwesomeIcon icon={faTrashAlt} size="s" />
          </div>
          <div className={editingItems?"Fa-icon-style Fa-icon-selected-color":"Fa-icon-style Fa-icon-color"} 
            onClick={() => {
              if (editingItems) {
                setEditingItems(false)
              } else {
                setEditingItems(true)
              }
            }}
          >
            <FontAwesomeIcon icon={faPen} size="s" />
          </div>
        </div>
        : //else (if user is deleting items)...
        <div className="Centered-button-container">
          <div className="Fa-icon-style Fa-icon-deleting-color" onClick={() => deleteItems()}>
            <FontAwesomeIcon icon={faTrashAlt} size="s" />
          </div>
          <div className="Fa-icon-style Fa-icon-deleting-color" onClick={() => setDeletingItems(false)}>
            <FontAwesomeIcon icon={faTimes} size="s" />
          </div>
        </div>
      }

      <div className="New-Homepage-Layout">
        {shareError === "" && list && list.items ? 
          <FullList2 
            listData={list} 
            deletingItems={deletingItems} 
            handleItemsToDelete={handleItemsToDelete} 
            itemsToDelete={itemsToDelete}
            editingItems={editingItems}
            handleListNameChange={handleListNameChange}
            handleListDescriptionChange={handleListDescriptionChange}
            handleItemChange={handleItemChange}
            toggleDBChange={toggleDBChange}
            toggleCheckmark={toggleCheckmark}
            currentPage="singleList"
            signedIn={props.loggedIn}
          /> 
          : '' 
        }
      </div>
      
    </div>
  );
  
};

export default ItemDescriptionPage;
