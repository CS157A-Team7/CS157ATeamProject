import React from 'react';

import '../assets/App.css';

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
                <FontAwesomeIcon icon={faUser} className="Header-icon fa-lg"/>
            </div>
      </div>
    );
}

export default Header;