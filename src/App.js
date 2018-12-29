import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import './App.css';
import Nav from "./Components/Nav";
import { auth, provider } from "./utils/firebase";

class App extends Component {

  constructor() {
    super();
    this.state = {
      user: null,
      userID: "",
      userPhoto: "",
      admin: false,
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  };

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({ user: null });
      });
  };

  login() {
    auth.signInWithPopup(provider)
      .then((result) => {
        console.log(result.user);
        var user = result.user;
        this.setState({ user: user.displayName });
        this.setState({ userID: user.uid });
        this.setState({ userPhoto: user.photoURL });

      });
  };

  // user={this.state.user} userphoto={this.state.userPhoto}
  render() {
    return (
      <Nav user={this.state.user}>
        {this.state.user ?
          <div>
            <img src={this.state.userPhoto} alt="blah blah"></img>
            <Button bsStyle="primary" onClick={this.logout}>Log Out</Button>
          </div>
          :
          <Button bsStyle="primary" onClick={this.login}>Login</Button>
        }
      </Nav>
    );
  };
};

export default App;
