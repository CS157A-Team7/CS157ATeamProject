import React, {useState} from 'react';
import Header from '../components/header';
import Item from '../components/item';
import { getList } from '../data/fakeList';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ItemDescriptionPage = () => {
    const [list, setList] = useState(getList('wishliste.com/123oprjfusbrg'));

    return (
        <div>
            <Header/>
            <div>
                <FontAwesomeIcon icon={faArrowLeft} className="fa-lg"/>
                <h2>{list.title}</h2>
            </div>
            <Item items={list.items}/>
        </div>
        
    );
};

export default ItemDescriptionPage;