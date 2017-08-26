import React from 'react';

const Home = () => {
  return (
    <div>
    <div className="home-page">
      {/* <div className="sidenav">
        <a href="#">1</a>
        <a href="#">2</a>
        <a href="#">3</a>
        <a href="#">4</a>
      </div>
      <span onclick="openNav()">&#9776; Go</span> */}
      {/* <div id="mySidenav" class="sidenav">
        <a href="javascript: void(0)" class="closebtn" onclick="closeNav()">&times;</a>
        <a href="#">About</a>
        <a href="#">Home</a>
        <a href="#">Services</a>
        <a href="#">Contact</a>
      </div>   */}
      {/* <h2>Okurio nav</h2> */}
      {/* <span className="seeall-nav" onclick="openNav()">&#9776;</span> */}
      <div className="hero-container">
          <div>
            <h1 className="hero-text">Okurio</h1>
          </div>
          <div className="hero-quote">
            <p>Okurio is a simple project management tool optimized for small teams.</p>
          </div>
          <div>
            <input className="hero-button" type="submit" value="Register" />
          </div>
      </div>
    </div>
    <div className="home-page2">
      <div className="home-page2-container">
      </div>
    </div>
    <div className="home-page3">
      <div className="home-page3-container">
        <div className="item">
          <h2>Media</h2>
          <p>Lorem ipsum, asdf klu rhiukjksd f .</p>
          <p>ASDfasdhf asklfa dfjha f.</p>
        </div>
        <div className="item">
          <h2>Media</h2>
          <p>Lorem ipsum, asdf klu rhiukjksd f .</p>
          <p>ASDfasdhf asklfa dfjha f.</p>
        </div>
        <div className="item">
          <h2>Media</h2>
          <p>Lorem ipsum, asdf klu rhiukjksd f .</p>
          <p>ASDfasdhf asklfa dfjha f.</p>
        </div>
      </div>
    </div>
    {/* <div className="home-page4">
      <div className="home-page4-container">
      </div>
    </div> */}
    </div>
  )
}

export default Home;
