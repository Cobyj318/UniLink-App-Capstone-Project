<<<<<<< Updated upstream
import logo from './logo.svg';
import './App.css';
// Routing for React - pages
import React from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
=======
import * as React from 'react';
import MainContainer from './Navigation/MainContainer';
import { addDoc, collection } from "@firebase/firestore"
import { firestore, db } from "./src/firebase_init/firebase"
import { ref, onValue } from 'firebase/database'
import SplashScreen from './Navigation/Screens/SplashScreen';
import LogInContainer from './Navigation/LogInContainer';

/*
For copying in other pages
import handleSubmit from './src/firebase_init/handlesubmit';
import { useRef } from 'react';
*/
>>>>>>> Stashed changes


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

