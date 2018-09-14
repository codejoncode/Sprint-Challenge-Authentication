import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Signin from "./components/Signin";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Jokes App</h1>
        </header>
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={Signin} />
      </div>
    );
  }
}

export default App;
