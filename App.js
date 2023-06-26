import logo from './logo.svg';
import './App.css';
// Routing for React - pages
import React from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";


const App = () => {
    
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Home
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
          <Link to="/">Home</Link>
          <Link to="/">CreatePost</Link>
      </header>
          
    </div>
  );
}

const Home = () => {
    return <div>
    <h1>Home</h1>
    </div>
};

const CreatePost = () => {
    return <div>
    <h1>CreatePost</h1>
    </div>
};

export default App;

