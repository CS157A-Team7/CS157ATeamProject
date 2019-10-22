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
      <li className={item.checked}>
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
      <div className="List-container">
        <ListHead listData={listData} />
        <ListBody listData={listData} />
      </div>
    )
  }
}

export default List;