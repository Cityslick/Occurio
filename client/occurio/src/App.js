import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// AXIOS
import axios from 'axios';

// HEADER/FOOTER/HOME
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './components/Home.jsx';

// LOGIN/REGISTER
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';

// PROJECTS
import ProjectCreate from './components/ProjectCreate.jsx';
import ProjectView from './components/ProjectView.jsx';
import ViewUserProjects from './components/ViewUserProjects.jsx';

// TASKS
import Task from './components/Task.jsx';

// USERS
import UserProfile from './components/UserProfile.jsx';
import UserProfileAll from './components/UserProfileAll.jsx';



class App extends Component {
  constructor() {
    super();
    this.state = {
        auth: false,
        user: null,
        currentPage: 'home',
        currentMovieId: null,
        movieData: null,
    }
    // AUTH
    this.setPage = this.setPage.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleRegisterSubmit= this.handleRegisterSubmit.bind(this);
    this.logOut =  this.logOut.bind(this);

    // USERS/PROJECTS
    this.handleMovieSubmit = this.handleMovieSubmit.bind(this);

    this.handleMovieEditSubmit = this.handleMovieEditSubmit.bind(this);

    this.selectEditedMovie = this.selectEditedMovie.bind(this);
    
    // handledeleteproject
    this.handleDeleteProject = this.handleDeleteProject.bind(this);
    
    // handle
    this.handleMovieSubmit = this.handleMovieSubmit.bind(this);

    this.handleMovieEditSubmit = this.handleMovieEditSubmit.bind(this);

    this.selectEditedMovie = this.selectEditedMovie.bind(this);

    // this.handleDeleteMovie = this.handleDeleteMovie.bind(this);

  }

    setPage(page) {
        this.setState({
            currentPage: page,
        })
    }

    decideWhichPage() {
        switch(this.state.currentPage) {
            case 'home':
                return <Home />;
                // break;
            case 'login':
                if (!this.state.auth) {
                    return <Login handleLoginSubmit={this.handleLoginSubmit} />;
                } else return <Home />;
                // break;
          case 'register':
            if (!this.state.auth) {
                return <Register handleRegisterSubmit={this.handleRegisterSubmit} />;
            } else return <Home />;

          case 'userprofile':
            return (
                <UserProfile
                movieData={this.state.movieData}
                userData={this.state.user}
                handleMovieSubmit={this.handleMovieSubmit}
                handleMovieEditSubmit={this.handleMovieEditSubmit}
                selectEditedMovie={this.selectEditedMovie}
                handleDeleteProject={this.handleDeleteMovie}
                currentMovieId={this.state.currentMovieId}/>)
                ;
          default:
            break;
        }
    }
   handleLoginSubmit(e, username, password) {
        e.preventDefault();
        axios.post('/auth/login', {
            username,
            password,
        }).then(res => {
            console.log(res.data.user);
            this.setState({
                auth: res.data.auth,
                user: res.data.user,
                currentPage: 'home',
            });
        }).catch(err => console.log(err));
     }


    handleRegisterSubmit(e, username, password, email) {
        console.log(e);
        e.preventDefault();
        axios.post('/auth', {
            username,
            password,
            email,
        }).then(res => {
            this.setState({
                auth: res.data.auth,
                user: res.data.user,
                currentPage: 'home',
            });
        }).catch(err => console.log(err));
    }


    logOut() {
        axios.get('/auth/logout')
        .then(res => {
            console.log(res);
            this.setState({
                auth: false,
                currentPage: 'home',
                user:null,
            });
        }).catch(err => console.log(err));
    }
    componentDidMount() {
    axios.get('/movies')
      .then(res => {
        this.setState({
          movieData: res.data.data,
        });
      }).catch(err => console.log(err));
    }

    handleMovieSubmit(e, title, description, genre,director) {
        e.preventDefault();
        axios.post('/movies', {
            title,
            description,
            genre,
            director,
        }).then(res => {
            this.resetMovies();
        }).catch(err => console.log(err));
    }

    handleMovieEditSubmit(e, title, description, genre,director) {
        e.preventDefault();
        axios.put(`/movies/${this.state.currentMovieId}`, {
            title,
            description,
            genre,
            director,
        }).then(res => {
            this.resetMovies();
        }).catch(err => console.log(err));
    }

  handleDeleteProject(id) {
    axios.delete(`/movies/${id}`,{
        id,
    }).then(res => {
        console.log("reset");
        this.resetMovies();
    }).catch(err => console.log(err));
  }

  selectEditedMovie(id) {
    this.setState({
      currentMovieId: id,
    })
  }

  // EXTRA FEATURES
  // THESE ARE NAMED BEFORE ADDING

  // RENDER

  resetMovies() {
      axios.get('/movies')
      .then(res => {
          this.setState({
              movieData: res.data.data,
              currentMovieId: null,
          })
      }).catch(err => console.log(err));
  }
  
  render() {
    return (
      <div className="App">
        <Header />
        <Task />
        {/* <Login /> */}
        <Register />
        {/* <ProjectCreate /> */}
        {/* <ProjectView /> */}
        {/* <UserProfile /> */}
        {/* <UserProfileAll /> */}
        {/* <ViewUserProjects /> */}
        {/* <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div> */}
        <Footer />
      </div>
    );
  }
}

export default App;
