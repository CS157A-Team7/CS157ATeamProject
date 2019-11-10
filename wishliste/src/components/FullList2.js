import React, {Component} from 'react';
import '../assets/App.css';

const ListHead = props => {
  return (
    <div className="Full-List2-head">
      {props.listData.name}
    </div>
  )
}

const ListBody = props => {
  const items = props.listData.items.map((item) => {
    return (
      <li className={!props.deletingItems?'not-deleting':'deleting-unchecked'}
        onClick={() => {
          if (props.deletingItems) {
            console.log("Select/deselect "+item.name+" to be deleted")
          } else {
            console.log("Check/uncheck "+item.name)
          }
        }} 
      >
        <li className={item.checked==1?'checked':'unchecked'}>
          {item.name}
        </li>
        <div className="Full-List2-description">
          {item.description} 
        </div>
      </li>
    )
  })

  return (
    <div className="Full-List2-items">
      <ul>
        {items}
      </ul>
    </div>
  )
}

class FullList2 extends Component {
  render() {
    const { listData, deletingItems } = this.props

    if (!listData) {
      return (
        <div>
          <hr/>
        </div>
      )
    };

    return (
      <div className="Full-List2-container">
        <ListHead listData={listData} />
        <ListBody listData={listData} deletingItems={deletingItems} />
      </div>
    )
  }
}

export default FullList2;
