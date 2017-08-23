import React from 'react';

const Header = () => {
    return (
        // <div class="container-h">
        <div className="header">
            <div className="header-logo">
                <h1 className="logo">okurio</h1>
            </div>
            <nav className="header-navigation">
                <ul>
                  <li>Home</li>
                  <li>About</li>
                  <li>Enter</li>
                  <li>Sign In</li>
                </ul>
            </nav>
        </div>
        // </div>
    )
}

export default Header;