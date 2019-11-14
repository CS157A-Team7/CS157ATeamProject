import React, {Component} from 'react';
import '../assets/App.css';
import axios from 'axios';
import Header from '../components/header';
import AllLists from '../components/AllLists.js';
import ListNames from '../components/ListNames';
import FullList from '../components/FullList';
import FullList2 from '../components/FullList2';
import Popup from 'reactjs-popup';

class HomePage extends Component {
  state = {
    results: [],
    list: {},
    itemsToDelete: [], 
    newItemOpen: false,
    newItemName: "",
    newItemDescription: "",
    dbChange: false,
    newWishlistOpen: false,
    newSWishlistOpen: false,
    newTodoListOpen: false,
    deletingItems: false,
    editingItems: false,
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

      this.setState({dbChange: false});
    }
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
        this.setState({ dbChange: true });
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
      this.setState({ dbChange: true });
    })
    .catch(function(error){
        console.log(error);
    });
    this.setState({deletingItems: false})
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
          <div className="New-button-container-thin">
            <Popup
              trigger={<div className="New-list-button-thin">+</div>}
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
                        <input type="text" name="name" placeholder="Name"/>
                      </label>
                    </form>
                    <form className="Label-menu-item">
                      <label>
                        <input type="text" name="description" placeholder="Description"/>
                      </label>
                    </form>
                    <div className="Menu-button-container">
                      <input className="Menu-button" type="button" value="Confirm" onClick={() => console.log("New wishlist")}/>
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
                        <input type="text" name="name" placeholder="Name"/>
                      </label>
                    </form>
                    <form className="Label-menu-item">
                      <label>
                        <input type="text" name="description" placeholder="Description"/>
                      </label>
                    </form>
                    <form className="Label-menu-item">
                      <label>
                        <input type="text" name="date" placeholder="Expiration date"/>
                      </label>
                    </form>
                    <div className="Menu-button-container">
                      <input className="Menu-button" type="button" value="Confirm" onClick={() => console.log("New surprise wishlist")}/>
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
                        <input type="text" name="name" placeholder="Name"/>
                      </label>
                    </form>
                    <form className="Label-menu-item">
                      <label>
                        <input type="text" name="description" placeholder="Description"/>
                      </label>
                    </form>
                    <form className="Label-menu-item">
                      <label>
                        <input type="text" name="date" placeholder="Date"/>
                      </label>
                    </form>
                    <div className="Menu-button-container">
                      <input className="Menu-button" type="button" value="Confirm" onClick={() => console.log("New to-do list")}/>
                      <input className="Menu-button" type="button" value="Cancel" onClick={() => this.setState({newTodoListOpen: false})}/>
                    </div>
                  </div>
                </Popup>
              </div>
            </Popup>

            <div className="New-list-button-thin" onClick={() => console.log("Delete list(s)")}>
              trash
            </div>
          </div>

          {Object.entries(this.state.list).length === 0 ? '' : !this.state.deletingItems ?
          <div className="New-button-container-thin">
            <Popup
              trigger={<div className="New-list-button-thin">+</div>}
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

            <div className="New-list-button-thin" 
              onClick={() => {
                this.setState({deletingItems: true})
                this.setState({editingItems: false})
              }}
            >
              trash
            </div>
            <div className={this.state.editingItems?"Edit-button-selected":"New-list-button-thin"} 
              onClick={() => {
                if (this.state.editingItems) {
                  this.setState({editingItems: false})
                } else {
                  this.setState({editingItems: true})
                }
              }}
            >
              edit
            </div>
          </div>
          : //else (if user is deleting items)...
          <div className="New-button-container-thin">
            <div className="New-list-button" 
              onClick={this.deleteItems}
            >
              Confirm Delete
            </div>
            <div className="New-list-button" onClick={() => this.setState({deletingItems: false})}>
              Cancel
            </div>
          </div>
          }
        </div>

        {/* <AllLists allLists={this.state.results} /> */}

        <div className="New-Homepage-Layout">
          <ListNames listData={this.state.results} getList={this.handleGetList} listSelected={this.state.list} />
          {Object.entries(this.state.list).length !== 0 ? 
            <FullList2 
              listData={this.state.list} 
              deletingItems={this.state.deletingItems} 
              handleItemsToDelete={this.handleItemsToDelete} 
              itemsToDelete={this.state.itemsToDelete}
              editingItems={this.state.editingItems}
            /> : ''
          }
        </div>
        
      </div>
    );
  }
}

export default HomePage;
