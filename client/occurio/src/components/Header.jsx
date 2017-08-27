import React from 'react';
// LOGIN/REGISTER
import Login from './Login';
import Register from './Register';
import SideNavDrop from './SideNavDrop';

import { Link } from 'react-router-dom';


const Header = (props) => {
    return (
      <header className="header">
            <div className="nav">
              <h1 className="logo"><Link to={'/'}>okurio</Link></h1>
            </div>
            <div className="nav2">
              <ul className="nav-list">
                <li name="n1"className="nav-item"><Link to={'/login'}>Login</Link></li>
                <li name="n2"className="nav-item"><Link to={'/register'}>Register</Link></li>
                <br/>
                <li name="n3"className="nav-item" onClick={props.logOut()}><Link to={'/'}>Logout</Link></li>
              </ul>
            </div>
            <SideNavDrop />
      </header>
    )
}

export default Header;
