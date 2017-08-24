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
           <!-- <li className="nav-item"><Link to={'/home'}>Home</Link></li>
                <li className="nav-item"><Link to={'/register'}>Register</Link></li>
                <li className="nav-item"><Link to={'/login'}>Sign In</Link></li> -->
              </ul>
            </div>  
          <Link to={'/home'}>Home</Link>
          <Link to={'/login'}>Log In</Link>
          <Link to={'/register'}>Register</Link>
          <Link to={'/task'}>_______Task______</Link>
          <Link to={'/collaborators'}> ______Collaborators______</Link>
        </div>
    )
}

export default Header;
