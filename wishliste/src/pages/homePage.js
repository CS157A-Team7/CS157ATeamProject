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
    isOpen: false,
    newItemName: "",
    newItemDescription: "",
    itemAdded: false,
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
    if(this.state.itemAdded){
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

      this.setState({itemAdded: false})
    }
  }
  
  addItem = () => {
    axios.get('/api/addItemToTable.php', {
      params: {
        name: this.state.newItemName,
        description: this.state.newItemDescription,
        checked: 0,
        list_id: 19
      }
    })
    .then((response) => {
      this.setState({ itemAdded: response.data });
      console.log(response.data)
    })
    .catch(function(error){
        console.log(error);
    });

    console.log(this.state.newItem);
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
            <div className="New-list-menu">
              <div className="New-list-menu-item" onClick={() => console.log("Create New Wishlist")}>
                new wishlist
              </div>
              <div className="New-list-menu-item" onClick={() => console.log("Create New Surprise Wishlist")}>
                new surprise wishlist
              </div>
              <div className="New-list-menu-item" onClick={() => console.log("Create New To-do List")}>
                new to-do list
              </div>
            </div>
          </Popup>

          <Popup
            trigger={<div className="New-list-button-thin">trash</div>}
            position="right top"
            on="click"
            closeOnDocumentClick
            mouseLeaveDelay={300}
            mouseEnterDelay={0}
            contentStyle={{ padding: "0px", border: "none" }}
            arrow={false}
          >
            <div className="New-list-menu">
              <div className="New-list-menu-item" onClick={() => console.log("Delete list(s)")}>
                delete list
              </div>
            </div>
          </Popup>

        </div>

        <div className="New-button-container-thin">

          <Popup
            trigger={<div className="New-list-button-thin">+</div>}
            position="right top"
            on="click"
            open={this.state.isOpen}
            onOpen={() => this.setState({isOpen: true})}
            mouseLeaveDelay={300}
            mouseEnterDelay={0}
            contentStyle={{ padding: "0px", border: "none" }}
            arrow={false}
          >
            <div className="New-list-menu">
              <div className="New-list-menu-item" onClick={() => console.log("input item name")}>
                <form>
                  <label>
                    name
                    <input type="text" name="name" 
                      onChange={(event) => {
                        this.setState({ newItemName: event.target.value }) 
                        console.log(this.state.newItemName)
                      }}
                    />
                  </label>
                </form>
              </div>
              <div className="New-list-menu-item" onClick={() => console.log("input item description")}>
                <form>
                  <label>
                    description
                    <input type="text" name="description" 
                      onChange={(event) => {
                        this.setState({ newItemDescription: event.target.value })
                        console.log(this.state.newItemDescription)
                      }}
                    />
                  </label>
                </form>
              </div>
              <input type="button" value="Confirm" onClick= {this.addItem} />
              <input type="button" value="Cancel" onClick={() => this.setState({isOpen: false})}/>
            </div>
          </Popup>

          <div className="New-list-button-thin">trash</div>
          <div className="New-list-button-thin">edit</div>

        </div>

        </div>

        {/* <AllLists allLists={this.state.results} /> */}

        <div className="New-Homepage-Layout">
          <ListNames listData={this.state.results} />
          <FullList2 listData={this.state.results[2]} />
        </div>
        
      </div>
    );
  }
}

export default HomePage;
