import React, {useState, useEffect} from 'react';
import Header from '../components/header';
import Item from '../components/item';
import { getList } from '../data/fakeList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlus, faPen, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import FullList from '../components/FullList';
import '../assets/App.css';

const ItemDescriptionPage = () => {
    const [list, setList] = useState(null);
    const [signedIn, setSignedIn] = useState(true);

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
            <Header page="ItemDescriptionPage" signedIn={signedIn} />

            {signedIn ? 
                <div className="Centered-button-container">
                    <div className="Fa-icon-style Fa-icon-color" onClick={() => console.log("Go to home page")}>
                        <FontAwesomeIcon icon={faArrowLeft} size="s" />
                    </div>
                    <div className="Fa-icon-style Fa-icon-color">
                        <FontAwesomeIcon icon={faPlus} size="s" />
                    </div>
                    <div className="Fa-icon-style Fa-icon-color">
                        <FontAwesomeIcon icon={faTrashAlt} size="s" />
                    </div>
                    <div className="Fa-icon-style Fa-icon-color">
                        <FontAwesomeIcon icon={faPen} size="s" />
                    </div>
                </div>
            : '' }

            <FullList listData={list} />
        </div>
        
    );
};

export default ItemDescriptionPage;