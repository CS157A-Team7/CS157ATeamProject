import React from 'react';

const Item = (props) => {
    return (
        <div>
             {props.items.map(item => (
                <div className="Item-Container">
                    <div className="Item-Checkbox">
                        <input type="checkbox"/>
                    </div>
                    <div className="Item-Title-Container">
                         <h3>{item.name}</h3>
                    </div>
                    <div className="Item-Description-Container">
                        <p>{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Item;
