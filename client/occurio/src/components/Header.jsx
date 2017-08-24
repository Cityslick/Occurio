import React from 'react';
// LOGIN/REGISTER
import Login from './Login';
import Register from './Register';

import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <div className="header">
            <div className="nav">
              <h1 className="logo"><Link to={'/home'}>okurio</Link></h1>
            </div>
            <div className="nav2">
              <ul className="nav-list">
                <li><Link to={'/login'}>Log In</Link></li>
                <li><Link to={'/register'}>Register</Link></li>
                <li><Link to={'/task'}>Task</Link></li>
                <li><Link to={'/collaborators'}>Collaborators</Link></li>
              </ul>
            </div>  
        </div>
    )
}

export default Header;
