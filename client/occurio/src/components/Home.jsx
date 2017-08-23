import React from 'react';

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <h3 className="hero-text">Okurio</h3>
        <h3 className="hero-quote">Okurio is a simple project management tool built for small teams and optimized for stress-free lives.</h3>
        <div className="hero-form">
          <div>
            <input type="text"/>
          </div>
          <div>
            <input className="form" type="submit" value="Enter" />
          </div>
        </div>
      </section>

      <section className="home-information">
        <div className="left">
          {/* <img className="pic-1" src="https://www.petfinder.com/wp-content/uploads/2012/11/91615172-find-a-lump-on-cats-skin-632x475.jpg"/> */}
        </div>
        <div className="right">
          <h2>some text here</h2>
          <p>some smaller text here</p>
          <input className="form" type="submit" value="Enter" />
        </div>
      </section>

      <section className="home-information">
        <div className="left">
          {/* <img className="pic-2" src="https://www.petfinder.com/wp-content/uploads/2012/11/91615172-find-a-lump-on-cats-skin-632x475.jpg"/> */}
        </div>
        <div className="right">
          <h2>some text here</h2>
          <p>some smaller text here</p>
          <input className="form" type="submit" value="Enter" />
        </div>
      </section>
    </div>
  )
}

export default Home;