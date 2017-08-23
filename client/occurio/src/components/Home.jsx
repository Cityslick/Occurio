import React from 'react';

const Home = () => {
  return (
    <div>
    <div className="home-page">
      <div className="hero-container">
          <div>
            <h1 className="hero-text">Okurio</h1>
          </div>
          <div className="hero-quote">
            <p>Okurio is a simple project management tool - optimized for stress free lives.</p>
          </div>
          <div>
            <input className="form" type="text" placeholder="Let's get started!" />
            <button className="form" type="submit">Send</button>
          </div>
      </div>
    </div>
    <div className="home-page2"></div>
    <div className="home-page3"></div>
    </div>
  )
}

export default Home;