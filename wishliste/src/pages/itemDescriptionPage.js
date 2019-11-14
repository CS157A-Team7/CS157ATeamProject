import React, {useState, useEffect} from 'react';
import Header from '../components/header';
import Item from '../components/item';
import { getList } from '../data/fakeList';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import FullList from '../components/FullList';
import '../assets/App.css';

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
            {/* <div className="New-button-container">
                <div className="New-list-button-thin" onClick={() => console.log("Go back to home screen")}>
                    back
                </div>
                <div className="New-list-button-thin" onClick={() => console.log("Add new item")}>
                    +
                </div>
                <div className="New-list-button-thin" onClick={() => console.log("Delete item(s)")}>
                    trash
                </div>
            </div> */}

            <FullList listData={list} />
        </div>
        
    );
};

export default ItemDescriptionPage;