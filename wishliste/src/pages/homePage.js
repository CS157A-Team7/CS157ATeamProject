import React, {Component} from 'react';
import '../assets/App.css';
import axios from 'axios';
import Header from '../components/header';
import ListNames from '../components/ListNames';
import FullList2 from '../components/FullList2';
import Popup from 'reactjs-popup';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlus, faPen, faTimes, faShare } from '@fortawesome/free-solid-svg-icons';
import CheckableFriends from '../components/CheckableFriends';

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
    owner: this.props.username,
    typeOfList: 0,
    type: "",
    dbChange: false,
    newWishlistOpen: false,
    newSWishlistOpen: false,
    newTodoListOpen: false,
    deletingItems: false,
    editingItems: false,
    deletingLists: false,
    listsToDelete: [],
    nameError: false,
    listSharingOpen: false,
    surpriseSharingOpen: false,
    friends: [],
    friendsSelected: [],
  };

  componentDidMount(){
    const params = new URLSearchParams();
    params.append('username', this.props.username);
    axios.post('/api/getListswithItems.php', params)
    .then((response) => {
      if(response.data instanceof Array)
      {
        this.setState({ results:response.data });
      }
    })
    .catch(function(error){
    });

    axios.post('/api/getFriends.php', params)
    .then((response) => {
      if(response.data instanceof Array)
      {
        this.setState({ friends:response.data });
      }
    })
    .catch(function(error){
    });
  };

  componentDidUpdate(){
    if(this.state.dbChange){
      const params = new URLSearchParams();
      params.append('username', this.props.username);
      axios.post('/api/getListswithItems.php', params)
      .then((response) => {
        if(response.data instanceof Array){
          this.setState({ results:response.data });
        }
      })
      .catch(function(error){
      });

      this.toggleDBChange();
    }
  }
  
  addList = () => {
    if (this.state.newListName) {
      axios.get('/api/addNewList.php', {
        params: {
          name: this.state.newListName,
          description: this.state.newListDescription,
          url: this.state.url,
          owner: this.state.owner,
          type: this.state.type,
          expiration_date: this.state.newListDate,
          date: this.state.newListDate,
          username: this.props.username,
          listType: this.state.typeOfList
        }
      })
      .then((response) => {
        if(response.data){
          this.toggleDBChange();
          this.setState({newListName: ""});
          this.setState({newListDescription: ""});
          this.setState({newListDate: ""});
        };
      })
      .catch(function(error){
      });
      this.setState({newWishlistOpen: false});
      this.setState({newSWishlistOpen: false});
      this.setState({newTodoListOpen: false});
      this.setState({nameError: false});
    } else {
      this.setState({nameError: true});
    }
  }

  addItem = () => {
    if (this.state.newItemName) {
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
          this.updateList();
          this.setState({newItemName: ""});
          this.setState({newItemDescription: ""});
        };
      })
      .catch(function(error){
      });
      this.setState({newItemOpen: false});
      this.setState({nameError: false});
    } else {
      this.setState({nameError: true});
    }
  }

  deleteItems = () => { 
    axios({
    url: '/api/deleteItemsFromTable.php',
    method: 'post',
    data: this.state.itemsToDelete  
    })
    .then((response) => {
      this.setState({itemsToDelete: []});
      this.toggleDBChange();
      this.updateList();
    })
    .catch(function(error){
    });
    this.setState({deletingItems: false})
  }

  deleteLists = () => {
    axios({
      url: '/api/deleteLists.php',
      method: 'post',
      data: this.state.listsToDelete  
      })
      .then((response) => {
        this.setState({listsToDelete: []});
        this.toggleDBChange();
      })
      .catch(function(error){
      });
      this.setState({deletingLists: false})
  }

  updateList = () => {
    axios.get('/api/getListItems.php', {
      params: {
        list_id: this.state.list.list_id
      }
    })
    .then((response) => {
      this.setState({
        list: {
          ...this.state.list,
          items: response.data
        }
      });
    })
    .catch(function(error){
    });
  }

  sendSupriseList = () => {
  this.setState({
    list: {
      ...this.state.list,
      type: 0
    }
  }, () => {
    axios({
      url: '/api/sendSurpriseList.php',
      method: 'post',
      data: {
        list: this.state.list,
        selected_friends: this.state.friendsSelected
      }
      })
      .then((response) => {
        this.toggleDBChange();
      })
      .catch(function(error){
      });
    });
  }

  handleGetList = list => {
    const selectedList = list;
    this.setState({list: selectedList});
    this.setState({newItemOpen: false});
    this.setState({deletingItems: false});
    this.setState({itemsToDelete: []});
    this.setState({editingItems: false});
    this.setState({listSharingOpen: false});
    this.setState({surpriseSharingOpen: false});
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

    if(this.state.list.list_type === "surprise" && this.state.list.type === "1"){
      if(items[index].checked === 1){
        var byLine = " -checked by ";
        var name = byLine.concat(this.props.username);
        var signature = items[index].description.concat(name);
        items[index].description = signature;
      }
      else{
        let loc = items[index].description.indexOf(' -checked by');
        let editedDescription = items[index].description.slice(0,loc);
        items[index].description = editedDescription;
      }
    }

    this.setState({
      list: {
        ...this.state.list,
        items: items
      }
    }, () => {
      const params = new URLSearchParams();
      params.append('checkmark', items[index].checked);
      params.append('item_id', items[index].item_id);
      params.append('description',items[index].description);
      params.append('list_type',this.state.list.type);
      axios.post('/api/updateItemCheckmark.php', params)
      .then((response) => {
      })
      .catch(function(error){
      });
    });
  };

  handleFriendsSelected = friend => {
    if(this.state.friendsSelected.includes(friend))
    {
      const filteredFriends = this.state.friendsSelected.filter(i => i.username !== friend.username);
      this.setState({
        friendsSelected: filteredFriends
      });
    }
    else{
      this.setState({
        friendsSelected: [...this.state.friendsSelected, friend]
      });
    }
  }

  generateUrl = () => {
    const params = new URLSearchParams();
    params.append('list_id', this.state.list.list_id);
    axios.post('/api/updateUrl.php', params)
    .then((response) => {
      this.toggleDBChange();
      this.setState({
        list: {
          ...this.state.list,
          url: response.data
        }
      });
    })
    .catch(function(error){
    });
  }

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
        <Header 
          page="HomePage" 
          toggleLogIn={this.props.toggleLogIn} 
          setUsername={this.props.setUsername}
          username={this.props.username} 
        />

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
                  onClose={() => {
                    this.setState({newWishlistOpen: false})
                    this.setState({nameError: false})
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
                        <input type="text" name="name" autoFocus maxLength="45" 
                          placeholder={this.state.nameError?"Name (required)":"Name"}
                          className={this.state.nameError?"input-error":""}
                          onChange={(event) => {
                            this.setState({ newListName: event.target.value }) 
                          }}
                        />
                      </label>
                    </form>
                    <form className="Label-menu-item">
                      <label>
                        <input type="text" name="description" placeholder="Description" maxLength="245"
                         onChange={(event) => {
                          this.setState({ newListDescription: event.target.value }) 
                        }}
                        />
                      </label>
                    </form>
                    <div className="Menu-button-container">
                      <input className="Menu-button" type="button" value="Confirm" onClick={() => {
                        this.setState({typeOfList: 0},
                          () => {this.addList()});
                      }}/>
                      <input className="Menu-button" type="button" value="Cancel" onClick={() => {
                        this.setState({newWishlistOpen: false})
                        this.setState({nameError: false})
                      }}/>
                    </div>
                  </div>
                </Popup>
                <Popup
                  trigger={<div className="Plain-menu-item">New Surprise Wishlist</div>}
                  position="right top"
                  on="click"
                  open={this.state.newSWishlistOpen}
                  onOpen={() => this.setState({newSWishlistOpen: true})}
                  onClose={() => {
                    this.setState({newSWishlistOpen: false})
                    this.setState({nameError: false})
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
                        <input type="text" name="name" autoFocus maxLength="45"
                          placeholder={this.state.nameError?"Name (required)":"Name"}
                          className={this.state.nameError?"input-error":""}
                          onChange={(event) => {
                            this.setState({ newListName: event.target.value }) 
                          }}
                        />
                      </label>
                    </form>
                    <form className="Label-menu-item">
                      <label>
                        <input type="text" name="description" placeholder="Description" maxLength="245"
                         onChange={(event) => {
                          this.setState({ newListDescription: event.target.value }) 
                        }}
                        />
                      </label>
                    </form>
                    <form className="Label-menu-item">
                      <label>
                        <input type="date" name="date" 
                          onChange={(event) => {
                            this.setState({ newListDate: event.target.value}, () => {
                            })
                          }}
                        />
                      </label>
                    </form>
                    <div className="Menu-button-container">
                      <input className="Menu-button" type="button" value="Confirm" onClick={() => {
                        this.setState({typeOfList: 1}, 
                          () => {this.addList()});
                      }}/>
                      <input className="Menu-button" type="button" value="Cancel" onClick={() => {
                        this.setState({newSWishlistOpen: false})
                        this.setState({nameError: false})
                      }}/>
                    </div>
                  </div>
                </Popup>
                <Popup
                  trigger={<div className="Plain-menu-item">New To-do List</div>}
                  position="right top"
                  on="click"
                  open={this.state.newTodoListOpen}
                  onOpen={() => this.setState({newTodoListOpen: true})}
                  onClose={() => {
                    this.setState({newTodoListOpen: false})
                    this.setState({nameError: false})
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
                        <input type="text" name="name" autoFocus maxLength="45"
                          placeholder={this.state.nameError?"Name (required)":"Name"}
                          className={this.state.nameError?"input-error":""}
                          onChange={(event) => {
                            this.setState({ newListName: event.target.value }) 
                          }}
                        />
                      </label>
                    </form>
                    <form className="Label-menu-item">
                      <label>
                        <input type="text" name="description" placeholder="Description" maxLength="245"
                         onChange={(event) => {
                          this.setState({ newListDescription: event.target.value }) 
                        }}
                        />
                      </label>
                    </form>
                    <form className="Label-menu-item">
                      <label>
                        <input type="date" name="date" 
                          onChange={(event) => {
                          this.setState({ newListDate: event.target.value}, () => {
                          })
                        }}
                        />
                      </label>
                    </form>
                    <div className="Menu-button-container">
                      <input className="Menu-button" type="button" value="Confirm" onClick={()=>{
                        this.setState({typeOfList: 2},
                          () => {this.addList()});
                      }}/>
                      <input className="Menu-button" type="button" value="Cancel" onClick={() => {
                        this.setState({newTodoListOpen: false})
                        this.setState({nameError: false})
                      }}/>
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
            <div className="Fa-icon-style Fa-icon-deleting-color" onClick={this.deleteLists}>
              <FontAwesomeIcon icon={faTrashAlt} size="s" />
            </div>
            <div className="Fa-icon-style Fa-icon-deleting-color" onClick={() => this.setState({deletingLists: false})}>
              <FontAwesomeIcon icon={faTimes} size="s" />
            </div>
          </div>
          } 

          {Object.entries(this.state.list).length === 0 ? '' : this.state.list.type==="1" && this.props.username!==this.state.list.owner ? ""
          : !this.state.deletingItems ?
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
              onClose={() => {
                this.setState({newItemOpen: false})
                this.setState({nameError: false})
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
                      placeholder={this.state.nameError?"Name (required)":"Name"}
                      className={this.state.nameError?"input-error":""}
                      onChange={(event) => {
                        this.setState({ newItemName: event.target.value }) 
                      }}
                    />
                  </label>
                </form>
                <form className="Label-menu-item">
                  <label>
                    <input type="text" name="description" placeholder="Description" maxLength="245"
                      onChange={(event) => {
                        this.setState({ newItemDescription: event.target.value })
                      }}
                    />
                  </label>
                </form>
                <div className="Menu-button-container">
                  <input className="Menu-button" type="button" value="Confirm" onClick={this.addItem} />
                  <input className="Menu-button" type="button" value="Cancel" onClick={() => {
                    this.setState({newItemOpen: false})
                    this.setState({nameError: false})
                  }}/>
                </div>
              </div>
            </Popup>

            <div className="Fa-icon-style Fa-icon-color" 
              onClick={() => {
                this.setState({deletingItems: true});
                this.setState({editingItems: false});
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
            {this.state.list.list_type==="wish"?
              <Popup
                trigger={
                  <div className="Fa-icon-style Fa-icon-color">
                    <FontAwesomeIcon icon={faShare} size="s" />
                  </div>
                }
                position="right top"
                on="click"
                open={this.state.listSharingOpen}
                onOpen={() => this.setState({listSharingOpen: true})}
                onClose={() => this.setState({listSharingOpen: false})}
                closeOnDocumentClick
                mouseLeaveDelay={300}
                mouseEnterDelay={0}
                contentStyle={{ padding: "0px", border: "none" }}
                arrow={false}
              > 
                {this.state.list.url ? 
                  <div className="Plain-menu">
                    <label className="Label-menu-item">
                      Shareable URL is: <br />
                      {this.state.list.url}
                    </label>
                  </div>
                :
                  <div className="Plain-menu"> 
                    <label className="Label-menu-item">
                      Generate shareable URL for this list?
                    </label>
                    <div className="Menu-button-container">
                      <input className="Menu-button" type="button" value="Confirm" onClick={this.generateUrl} />
                      <input className="Menu-button" type="button" value="Cancel" onClick={() => this.setState({listSharingOpen: false})}/>
                    </div>
                  </div>
                }
              </Popup>
            :this.state.list.list_type==="surprise" && !this.state.list.type? //original, hasn't been shared
              <Popup
                trigger={
                  <div className="Fa-icon-style Fa-icon-color">
                    <FontAwesomeIcon icon={faShare} size="s" />
                  </div>
                }
                position="left top"
                on="click"
                open={this.state.surpriseSharingOpen}
                onOpen={() => this.setState({surpriseSharingOpen: true})}
                onClose={() => this.setState({surpriseSharingOpen: false})}
                closeOnDocumentClick
                mouseLeaveDelay={300}
                mouseEnterDelay={0}
                contentStyle={{ padding: "0px", border: "none", width:"400px" }}
                arrow={false}
              >
                <div className="Wide-menu"> 
                  <label className="Label-menu-item">
                    Select collaborators for '{this.state.list.name}' 
                  </label>
                  <CheckableFriends 
                    friends={this.state.friends}
                    friendsSelected={this.state.friendsSelected} 
                    handleFriendsSelected={this.handleFriendsSelected}
                  />
                  <label className="Label-menu-item">
                    Note: you can't make any changes to the list once it's sent to collaborators
                  </label>
                  <div className="Menu-button-container">
                    <input className="Menu-button" type="button" value="Send" onClick={() => {
                      this.sendSupriseList()
                      this.setState({surpriseSharingOpen: false})
                      }}
                    />
                    <input className="Menu-button" type="button" value="Cancel" onClick={() => this.setState({surpriseSharingOpen: false})}/>
                  </div>
                </div>
              </Popup>
            :this.state.list.list_type==="surprise" && this.state.list.type==="0"? //original, already sent
              <Popup
                trigger={
                  <div className="Fa-icon-style Fa-icon-color">
                    <FontAwesomeIcon icon={faShare} size="s" />
                  </div>
                }
                position="right top"
                on="click"
                open={this.state.surpriseSharingOpen}
                onOpen={() => this.setState({surpriseSharingOpen: true})}
                onClose={() => this.setState({surpriseSharingOpen: false})}
                closeOnDocumentClick
                mouseLeaveDelay={300}
                mouseEnterDelay={0}
                contentStyle={{ padding: "0px", border: "none" }}
                arrow={false}
              >
                <div className="Plain-menu">
                  <label className="Label-menu-item">
                    '{this.state.list.name}' has been shared! <br />
                    Any further changes made to the list won't be seen by the collaborators
                  </label>
                </div>
              </Popup>
            :"" /*no share button for todo lists or surprise wishlist (copy)*/}
          </div>
          : //else (if user is deleting items)...
          <div className="New-button-container-thin">
            <div className="Fa-icon-style Fa-icon-deleting-color" onClick={this.deleteItems}>
              <FontAwesomeIcon icon={faTrashAlt} size="s" />
            </div>
            <div className="Fa-icon-style Fa-icon-deleting-color" onClick={() => this.setState({deletingItems: false})}>
              <FontAwesomeIcon icon={faTimes} size="s" />
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
              currentPage="home"
              username={this.props.username}
            /> : ''
          }
        </div>
        
      </div>
    );
  }
}

export default HomePage;
