import React, {Component} from 'react';
import '../assets/App.css';

const ListHead = props => {
  return (
    <div className="Full-List2-head">
      {props.listData.name}
      {/* Art Supplies */}
    </div>
  )
}

const ListBody = props => {
  const items = props.listData.items.map((item) => {
    return (
      <div>
        <li className={item.checked==1?'checked':'unchecked'}>
          {item.name}
        </li>
        <div className="Full-List2-description">
          {item.description} 
        </div>
      </div>
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
    const { listData } = this.props

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
        <ListBody listData={listData} />
      </div>
    )
  }
}

export default FullList2;
