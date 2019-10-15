import React from 'react';

const Item = (props) => {
    return (
        <div>
             {props.items.map(item => (
                <div className="Item-Container">
                    <div className="Item-Checkbox">
                        <input type="checkbox"/>
                    </div>
                    <h3 className="Item-Title">{item.name}</h3>
                    <p className="Item-Description">{item.description}</p>
                </div>
            ))}
        </div>
    );
};

export default Item;
