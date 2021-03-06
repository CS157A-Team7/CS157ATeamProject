import React from 'react';
import axios from 'axios';
import '../assets/App.css';
import Popup from 'reactjs-popup';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

const logMeOut = (props, history) => {
    axios.get('/api/deleteCookie.php', {
        params: {
            username: props.username
        }
    })
    .then((response) => {
        localStorage.removeItem('wishliste');
        props.toggleLogIn();
        props.setUsername('');
        history.push("/");
    })
    .catch(function(error){
    });
}

const Header = (props) => {
    let history = useHistory();
    return (
        <div className="Header-bar">
            <div className="Header-text">WishListé</div>
            <div className="Header-icons">
                <Popup
                    trigger={
                        <div className="Header-icon-popup">
                            <FontAwesomeIcon icon={faUser} className="Header-icon fa-lg"/>
                        </div>
                    }
                    position="left top"
                    on="click"
                    closeOnDocumentClick
                    mouseLeaveDelay={300}
                    mouseEnterDelay={0}
                    contentStyle={{ padding: "0px", border: "none" }}
                    arrow={false}
                >
                    {props.page === "HomePage" ?
                        <div className="Plain-menu">
                            <div className="Plain-menu-item" onClick={() => history.push('/Friends')}>
                                Manage Friends
                            </div>
                            <div className="Plain-menu-item" onClick={() => logMeOut(props, history)}>
                                Logout
                            </div>
                        </div>
                    : props.page === "FriendsPage" ?
                        <div className="Plain-menu">
                            <div className="Plain-menu-item" onClick={() => history.push('/Home')}>
                                View Lists
                            </div>
                            <div className="Plain-menu-item" onClick={() => logMeOut(props, history)}>
                                Logout
                            </div>
                        </div>    
                    : props.signedIn ? //Item Description page signed in
                        <div className="Plain-menu">
                            <div className="Plain-menu-item" onClick={() => history.push('/Friends')}>
                                Manage Friends
                            </div>
                            <div className="Plain-menu-item" onClick={() => history.push('/Home')}>
                                View Lists
                            </div>
                            <div className="Plain-menu-item" onClick={() => logMeOut(props, history)}>
                                Logout
                            </div>
                        </div>
                    : //Item Description page not signed in
                        <div className="Plain-menu">
                            <div className="Plain-menu-item" onClick={() => history.push('/')}>
                                Sign in
                            </div>
                        </div>
                    }
                </Popup>
            </div>
      </div>
    );
}

export default Header;