import React from 'react';
// LOGIN/REGISTER
import Login from './Login';
import Register from './Register';
import SideNavDrop from './SideNavDrop';

import { Link } from 'react-router-dom';


const Header = () => {
    return (
      <header className="header">
            <div className="nav">
              <h1 className="logo"><Link to={'/'}>Okurio</Link></h1>
            </div>
            <div className="nav2">
              <ul className="nav-list">
                <li className="nav-item"><Link to={'/login'}>Login</Link></li>
                <li className="nav-item"><Link to={'/register'}>Register</Link></li>
                <li className="nav-item"><Link to={'/collaborators'}>Collaborators</Link></li>
              </ul>
            </div>
            <SideNavDrop />
      </header>
    )
}

export default Header;
