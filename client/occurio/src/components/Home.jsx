import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
    <div className="home-page">
      <div className="hero-container">
          <div>
            <h1 className="hero-text">Okurio</h1>
          </div>
          <div className="hero-quote">
            <p>Okurio is a simple project management tool optimized for small teams.</p>
          </div>
          <div>
            <Link className="hero-button" to={'/register'}>Register</Link>
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
          <div className="quote-img">
          </div>
          <h2>Tony L.</h2>
          <div className="lineup"></div>
          <p><i>"I don't know what else to say. Just what I was looking for.
            After using Okcurio my business skyrocketed!"</i></p>
          <h4>- Startup Founder/CEO</h4>
        </div>
        <div className="item">
          <div className="quote-img2">
          </div>
          <h2>Melissa J.</h2>
          <div className="lineup"></div>
          <p><i>"The very best. This is simply unbelievable! Thank you for making it painless, pleasant and most of all hassle free!
            We've seen amazing results already."</i></p>
          <h4>- CTO </h4>
        </div>
        <div className="item">
          <div className="quote-img3">
          </div>
          <h2>Dana J.</h2>
          <div className="lineup"></div>
          <p><i>"Okcurio is awesome! Okcurio has got everything I need. I love your system.
            It's all good. "</i></p>
          <h4>Sr. Project Mgr.</h4>
        </div>
      </div>
        <div className="logo-container">
          <div className="logo-t-head">As seen in:</div>
          <div className="logo-t-wrap">
            <div className="logo-t" id="t1"></div>
            <div className="logo-t" id="t2"></div>
            <div className="logo-t" id="t3"></div>
            <div className="logo-t" id="t4"></div>
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
