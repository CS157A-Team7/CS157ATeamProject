import React, {useState, useEffect} from 'react';
import Header from '../components/header';
import Item from '../components/item';
import { getList } from '../data/fakeList';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const ItemDescriptionPage = () => {
    const [list, setList] = useState(null);

    useEffect(() => {
        axios.get('/api/getListItems.php', {
            params: {
                list_id: 27
            }
        })
        .then(function(response){
            setList(response.data);
            console.log(response.data);
        })
        .catch(function(error){
            console.log(error);
        });
    });

    if(!list){
        return (
        <div>
            <h1>Empty List</h1>
        </div>
        );
    }

    return (
        <div>
            <Header/>
            <div className="Title-Container">
                <div className="Back-Arrow-Container">
                    <button className="Back-Arrow"><FontAwesomeIcon icon={faArrowLeft} className="fa-lg"/> </button>
                </div>
                <div className="List-Title-Container">
                    <h2 className="List-Title">Art Supplies</h2>
                </div>
            </div>
            <Item items={list}/> 
        </div>
        
    );
};

export default ItemDescriptionPage;