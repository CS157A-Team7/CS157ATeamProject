import React, {Component} from 'react';
import '../assets/App.css';
import axios from 'axios';
import Header from '../components/header';
import ListNames from '../components/ListNames';
import FullList2 from '../components/FullList2';
import Popup from 'reactjs-popup';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlus, faPen } from '@fortawesome/free-solid-svg-icons';

class HomePage extends Component {
  state = {
    results: [],
    list: {},
    itemsToDelete: [], 
    newItemOpen: false,
    newItemName: "",
    newItemDescription: "",
    newListName: "",
    newListDescription: "",
    newListDate: "",
    url: "",
    owner: "",
    typeOfList: 0,
    type: 0,
    dbChange: false,
    newWishlistOpen: false,
    newSWishlistOpen: false,
    newTodoListOpen: false,
    deletingItems: false,
    editingItems: false,
    deletingLists: false,
    listsToDelete: [],
  };

  componentDidMount(){
    const params = new URLSearchParams();
    params.append('username', 'ash_ketchum@hotmail.com');
    axios.post('/api/getListswithItems.php', params)
    .then((response) => {
      this.setState({ results:response.data });
      console.log(this.state.results)
    })
    .catch(function(error){
        console.log(error);
    });
  };

  componentDidUpdate(){
    if(this.state.dbChange){
      const params = new URLSearchParams();
      params.append('username', 'ash_ketchum@hotmail.com');
      axios.post('/api/getListswithItems.php', params)
      .then((response) => {
        this.setState({ results:response.data });
        console.log(this.state.results)
      })
      .catch(function(error){
          console.log(error);
      });

      this.toggleDBChange();
    }
  }
  
  addList = () => {
    axios.get('/api/addNewList.php', {
      params: {
        name: this.state.newListName,
        description: this.state.newListDescription,
        url: this.state.url,
        owner: this.state.owner,
        type: this.state.type,
        expiration_date: this.state.newListDate,
        date: this.state.newListDate,
        username: 'ash_ketchum@hotmail.com',
        listType: this.state.typeOfList
      }
    })
    .then((response) => {
      if(response.data){
        this.toggleDBChange();
      };
      console.log(response.data);
    })
    .catch(function(error){
        console.log(error);
    });
    console.log("CreatedList");
  }

  addItem = () => {
    axios.get('/api/addItemToTable.php', {
      params: {
        name: this.state.newItemName,
        description: this.state.newItemDescription,
        checked: 0,
        list_id: this.state.list.list_id
      }
    })
    .then((response) => {
      if(response.data){
        this.toggleDBChange();
      };
      console.log(response.data);
    })
    .catch(function(error){
        console.log(error);
    });
    this.setState({newItemOpen: false});
    console.log(this.state.newItem);
  }

  deleteItems = () => { 
    axios({
    url: '/api/deleteItemsFromTable.php',
    method: 'post',
    data: this.state.itemsToDelete  
    })
    .then((response) => {
      console.log(response.data);
      this.setState({itemsToDelete: []});
      this.toggleDBChange();
    })
    .catch(function(error){
        console.log(error);
    });
    this.setState({deletingItems: false})
    console.log(this.state.itemsToDelete);
  }

  deleteLists = () => {
    axios({
      url: '/api/deleteLists.php',
      method: 'post',
      data: this.state.listsToDelete  
      })
      .then((response) => {
        console.log(response.data);
        this.setState({listsToDelete: []});
        this.toggleDBChange();
      })
      .catch(function(error){
          console.log(error);
      });
      this.setState({deletingLists: false})
      console.log(this.state.itemsToDelete);
  }


  handleGetList = list => {
    const selectedList = list;
    this.setState({list: selectedList});
    console.log(this.state.list);
  }

  handleItemsToDelete = item => {
    if(this.state.itemsToDelete.includes(item))
    {
      const filteredItems = this.state.itemsToDelete.filter(i => i.item_id !== item.item_id);
      this.setState({
        itemsToDelete: filteredItems
      });
    }
    else{
      this.setState({
        itemsToDelete: [...this.state.itemsToDelete, item]
      });
    }
    console.log(this.state.itemsToDelete);
  }

  handleListsToDelete = list => {
    if(this.state.listsToDelete.includes(list))
    {
      const filteredLists = this.state.listsToDelete.filter(i => i.list_id !== list.list_id);
      this.setState({
        listsToDelete: filteredLists
      });
    }
    else{
      this.setState({
        listsToDelete: [...this.state.listsToDelete, list]
      });
    }
    console.log(this.state.listsToDelete);
  }

  handleListNameChange = newName => {
    this.setState({
      list: {
        ...this.state.list,
        name: newName
      }
    });
  };

  handleListDescriptionChange = newDescription => {
    this.setState({
      list: {
        ...this.state.list,
        description: newDescription
      }
    });
  }

  handleItemChange = (index, newName, newDescription) => {
    let items = this.state.list.items;
    items[index].name = newName;
    items[index].description = newDescription;

    this.setState({
      list: {
        ...this.state.list,
        items: items
      }
    });
  };

  toggleDBChange = () => {
    this.setState(state => {
      return {
        dbChange: !state.dbChange,
      }
    })
  };

  toggleCheckmark =  index => {
    let items = this.state.list.items;
    items[index].checked = items[index].checked == 1 ? 0 : 1;

    this.setState({
      list: {
        ...this.state.list,
        items: items
      }
    }, () => {
      const params = new URLSearchParams();
      params.append('checkmark', items[index].checked);
      params.append('item_id', items[index].item_id);
      axios.post('/api/updateItemCheckmark.php', params)
      .then((response) => {
        console.log(response.data);
      })
      .catch(function(error){
          console.log(error);
      });
    });
  };

  render(){

    if(!this.state.results){
      return(
        <div>
          <hr/>
        </div>
      )
    };

    return (

      <div className="App">
        <Header />

        <div className="New-button-container-container">

          {!this.state.deletingLists?
          <div className="New-button-container-thin">
            <Popup
              trigger={
                <div className="Fa-icon-style Fa-icon-color">
                  <FontAwesomeIcon icon={faPlus} size="s" />
                </div>
              }
              position="right top"
              on="click"
              closeOnDocumentClick
              mouseLeaveDelay={300}
              mouseEnterDelay={0}
              contentStyle={{ padding: "0px", border: "none" }}
              arrow={false}
            >
              <div className="Plain-menu">
                <Popup
                  trigger={<div className="Plain-menu-item">New Wishlist</div>}
                  position="right top"
                  on="click"
                  open={this.state.newWishlistOpen}
                  onOpen={() => this.setState({newWishlistOpen: true})}
                  onClose={() => this.setState({newWishlistOpen: false})}
                  closeOnDocumentClick
                  mouseLeaveDelay={300}
                  mouseEnterDelay={0}
                  contentStyle={{ padding: "0px", border: "none" }}
                  arrow={false}
                >
                  <div className="Plain-menu">
                    <form className="Label-menu-item">
                      <label>
                        <input type="text" name="name" placeholder="Name"
                         onChange={(event) => {
                          this.setState({ newListName: event.target.value }) 
                          console.log(this.state.newListName)
                        }}
                        />
                      </label>
                    </form>
                    <form className="Label-menu-item">
                      <label>
                        <input type="text" name="description" placeholder="Description"
                         onChange={(event) => {
                          this.setState({ newListDescription: event.target.value }) 
                          console.log(this.state.newListDescription)
                        }}
                        />
                      </label>
                    </form>
                    <div className="Menu-button-container">
                      <input className="Menu-button" type="button" value="Confirm" onClick={() => {
                        this.setState({typeOfList: 0},
                          () => {this.addList()});
                        this.setState({newWishlistOpen: false});
                      }}/>
                      <input className="Menu-button" type="button" value="Cancel" onClick={() => this.setState({newWishlistOpen: false})}/>
                    </div>
                  </div>
                </Popup>
                <Popup
                  trigger={<div className="Plain-menu-item">New Surprise Wishlist</div>}
                  position="right top"
                  on="click"
                  open={this.state.newSWishlistOpen}
                  onOpen={() => this.setState({newSWishlistOpen: true})}
                  onClose={() => this.setState({newSWishlistOpen: false})}
                  closeOnDocumentClick
                  mouseLeaveDelay={300}
                  mouseEnterDelay={0}
                  contentStyle={{ padding: "0px", border: "none" }}
                  arrow={false}
                >
                  <div className="Plain-menu">
                    <form className="Label-menu-item">
                      <label>
                        <input type="text" name="name" placeholder="Name"
                         onChange={(event) => {
                          this.setState({ newListName: event.target.value }) 
                          console.log(this.state.newListName)
                        }}
                        />
                      </label>
                    </form>
                    <form className="Label-menu-item">
                      <label>
                        <input type="text" name="description" placeholder="Description"
                         onChange={(event) => {
                          this.setState({ newListDescription: event.target.value }) 
                          console.log(this.state.newListDescription)
                        }}
                        />
                      </label>
                    </form>
                    <form className="Label-menu-item">
                      <label>
                        {/* Date: &nbsp; */}
                        <input type="date" name="date" />
                      </label>
                    </form>
                    <div className="Menu-button-container">
                      <input className="Menu-button" type="button" value="Confirm" onClick={() => {
                        this.setState({typeOfList: 1}, 
                          () => {this.addList()});
                        this.setState({newSWishlistOpen: false});
                      }}/>
                      <input className="Menu-button" type="button" value="Cancel" onClick={() => this.setState({newSWishlistOpen: false})}/>
                    </div>
                  </div>
                </Popup>
                <Popup
                  trigger={<div className="Plain-menu-item">New To-do List</div>}
                  position="right top"
                  on="click"
                  open={this.state.newTodoListOpen}
                  onOpen={() => this.setState({newTodoListOpen: true})}
                  onClose={() => this.setState({newTodoListOpen: false})}
                  closeOnDocumentClick
                  mouseLeaveDelay={300}
                  mouseEnterDelay={0}
                  contentStyle={{ padding: "0px", border: "none" }}
                  arrow={false}
                >
                  <div className="Plain-menu">
                    <form className="Label-menu-item">
                      <label>
                        <input type="text" name="name" placeholder="Name"
                         onChange={(event) => {
                          this.setState({ newListName: event.target.value }) 
                          console.log(this.state.newListName)
                        }}
                        />
                      </label>
                    </form>
                    <form className="Label-menu-item">
                      <label>
                        <input type="text" name="description" placeholder="Description"
                         onChange={(event) => {
                          this.setState({ newListDescription: event.target.value }) 
                          console.log(this.state.newListDescription)
                        }}
                        />
                      </label>
                    </form>
                    <form className="Label-menu-item">
                      <label>
                        {/* Date: &nbsp; */}
                        <input type="date" name="date" placeholder="Date"/>
                      </label>
                    </form>
                    <div className="Menu-button-container">
                      <input className="Menu-button" type="button" value="Confirm" onClick={()=>{
                        this.setState({typeOfList: 2},
                          () => {this.addList()});
                        this.setState({newTodoListOpen: false});
                      }}/>
                      <input className="Menu-button" type="button" value="Cancel" onClick={() => this.setState({newTodoListOpen: false})}/>
                    </div>
                  </div>
                </Popup>
              </div>
            </Popup>

            <div className="Fa-icon-style Fa-icon-color" onClick={() => this.setState({deletingLists: true})}>
              <FontAwesomeIcon icon={faTrashAlt} size="s" />
            </div>
          </div>
          : //else (if user is deleting lists...)
          <div className="New-button-container-thin">
            <div className="Confirm-delete-button" onClick={this.deleteLists}>
              Confirm Delete
            </div>
            <div className="Confirm-delete-button" onClick={() => this.setState({deletingLists: false})}>
              Cancel
            </div>
          </div>
          } 

          {Object.entries(this.state.list).length === 0 ? '' : !this.state.deletingItems ?
          <div className="New-button-container-thin">
            <Popup
              trigger={
                <div className="Fa-icon-style Fa-icon-color">
                  <FontAwesomeIcon icon={faPlus} size="s" />
                </div>
              }
              position="right top"
              on="click"
              open={this.state.newItemOpen}
              onOpen={() => this.setState({newItemOpen: true})}
              closeOnDocumentClick
              mouseLeaveDelay={300}
              mouseEnterDelay={0}
              contentStyle={{ padding: "0px", border: "none" }}
              arrow={false}
            >
              <div className="Plain-menu">
                <form className="Label-menu-item">
                  <label>
                    New item
                    <input type="text" name="name" placeholder="Name"
                      onChange={(event) => {
                        this.setState({ newItemName: event.target.value }) 
                        console.log(this.state.newItemName)
                      }}
                    />
                  </label>
                </form>
                <form className="Label-menu-item">
                  <label>
                    <input type="text" name="description" placeholder="Description"
                      onChange={(event) => {
                        this.setState({ newItemDescription: event.target.value })
                        console.log(this.state.newItemDescription)
                      }}
                    />
                  </label>
                </form>
                <div className="Menu-button-container">
                  <input className="Menu-button" type="button" value="Confirm" onClick={this.addItem} />
                  <input className="Menu-button" type="button" value="Cancel" onClick={() => this.setState({newItemOpen: false})}/>
                </div>
              </div>
            </Popup>

            <div className="Fa-icon-style Fa-icon-color" 
              onClick={() => {
                this.setState({deletingItems: true})
                this.setState({editingItems: false})
              }}
            >
              <FontAwesomeIcon icon={faTrashAlt} size="s" />
            </div>
            <div className={this.state.editingItems?"Fa-icon-style Fa-icon-selected-color":"Fa-icon-style Fa-icon-color"} 
              onClick={() => {
                if (this.state.editingItems) {
                  this.setState({editingItems: false})
                } else {
                  this.setState({editingItems: true})
                }
              }}
            >
              <FontAwesomeIcon icon={faPen} size="s" />
            </div>
          </div>
          : //else (if user is deleting items)...
          <div className="New-button-container-thin">
            <div className="Confirm-delete-button" 
              onClick={this.deleteItems}
            >
              Confirm Delete
            </div>
            <div className="Confirm-delete-button" onClick={() => this.setState({deletingItems: false})}>
              Cancel
            </div>
          </div>
          }
        </div>

        <div className="New-Homepage-Layout">
          <ListNames 
            listData={this.state.results} 
            getList={this.handleGetList} 
            listSelected={this.state.list}
            deletingLists={this.state.deletingLists} 
            listsToDelete={this.state.listsToDelete}
            handleListsToDelete={this.handleListsToDelete}
          />
          {Object.entries(this.state.list).length !== 0 ? 
            <FullList2 
              listData={this.state.list} 
              deletingItems={this.state.deletingItems} 
              handleItemsToDelete={this.handleItemsToDelete} 
              itemsToDelete={this.state.itemsToDelete}
              editingItems={this.state.editingItems}
              handleListNameChange={this.handleListNameChange}
              handleListDescriptionChange={this.handleListDescriptionChange}
              handleItemChange={this.handleItemChange}
              toggleDBChange={this.toggleDBChange}
              toggleCheckmark={this.toggleCheckmark}
            /> : ''
          }
        </div>
        
      </div>
    );
  }
}

export default HomePage;
