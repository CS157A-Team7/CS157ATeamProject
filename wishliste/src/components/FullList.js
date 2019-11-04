import React, {Component} from 'react';
import '../assets/App.css';

const ListHead = props => {
  return (
    <div className="Full-List-head">
      {/* {props.listData.name} */}
      Art Supplies
    </div>
  )
}

const ListBody = props => {
  // const items = props.listData.items.map((item) => {
  const items = props.listData.map((item) => {
    return (
      <div onClick={() => console.log("clicked on " + item.name)}>
        <li className={item.checked==1?'checked':'unchecked'}>
          {item.name}
        </li>
        <div className="Full-List-description">
          {item.description} 
        </div>
      </div>
    )
  })

  return (
    <div className="Full-List-items">
      <ul>
        {items}
      </ul>
    </div>
  )
}

class FullList extends Component {
  render() {
    const { listData } = this.props

    return (
      <div className="Full-List-container">
        <ListHead listData={listData} />
        <ListBody listData={listData} />
      </div>
    )
  }
}

export default FullList;
