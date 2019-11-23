import React from 'react';

import '../assets/App.css';
import Popup from 'reactjs-popup';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTwitter} from '@fortawesome/free-brands-svg-icons';
import {faFacebookF} from '@fortawesome/free-brands-svg-icons';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {faAt} from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    return (
        <div className="Header-bar">
            <div className="Header-text">WishListé</div>
            <div className="Header-icons">
                <FontAwesomeIcon icon={faAt} className="Header-icon fa-lg"/>
                <FontAwesomeIcon icon={faTwitter} className="Header-icon fa-lg" />
                <FontAwesomeIcon icon={faFacebookF} className="Header-icon fa-lg"/>
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
                    <div className="Plain-menu">
                        <div className="Plain-menu-item" onClick={() => console.log("Go to friends page")}>
                            Manage Friends
                        </div>
                        <div className="Plain-menu-item" onClick={() => console.log("Log out")}>
                            Logout
                        </div>
                    </div>
                </Popup>
            </div>
      </div>
    );
}

export default Header;