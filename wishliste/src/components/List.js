import React, {Component} from 'react';
import '../assets/App.css';

const ListHead = props => {
  return (
    <div className="List-head">
      {props.listData.name}
    </div>
  )
}

const ListBody = props => {
  const items = props.listData.items.map((item) => {
    return (
      <li className={item.checked==1?'checked':'unchecked'}>
        {item.name}
      </li>
    )
  })

  return (
    <div className="List-items">
      <ul>
        {items}
      </ul>
    </div>
  )
}

class List extends Component {
  render() {
    const { listData } = this.props

    return (
      <div className="List-container" onClick={() => console.log("hello " + listData.name)}>
        <ListHead listData={listData} />
        <ListBody listData={listData} />
        <div className="List-extra-space" />
      </div>
    )
  }
}

export default List;
