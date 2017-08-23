import React from 'react';
// LOGIN/REGISTER
import Login from './Login';
import Register from './Register';

import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <div className="header">
            <div>
              <h1 className="logo">Occurio</h1>
            </div>
            <div className="nav">
              <ul className="nav-list">
                <li className="nav-item">Contact</li>
                <li className="nav-item"><Link to={'/login'}>Log In</Link></li>
              </ul>
            </div>
        </div>
    )
}

export default Header;
