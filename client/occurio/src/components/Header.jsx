import React from 'react';

const Header = () => {
    return (
        <div className="header">
            <div>
              <h1 className="logo">okurio</h1>
            </div>
            <div class="nav">
              <ul class="nav-list">
                <li class="nav-item">Home</li>
                <li class="nav-item">About</li>
                <li class="nav-item">Product</li>
                <li class="nav-item">Contact</li>
                <li class="nav-item">Sign In</li>
              </ul>
            </div>  
        </div>
    )
}

export default Header;