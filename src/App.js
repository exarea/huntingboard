import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Button } from "react-bootstrap";
import './App.css';
import Nav from "./Components/Nav";
import { auth, provider } from "./utils/firebase";

import Board from "./Pages/Board/Board";

class App extends Component {

  constructor() {
    super();
    this.state = {
      user: null,
      userExists: false,
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
        this.setState({ userExists: false })
        this.setState({ userID: "" });
        this.setState({ userPhoto: "" });
      });
  };

  login() {
    auth.signInWithPopup(provider)
      .then((result) => {
        console.log(result.user);
        var user = result.user;
        this.setState({ user: user.displayName });
        this.setState({ userExists: true })
        this.setState({ userID: user.uid });
        this.setState({ userPhoto: user.photoURL });
      });
  };

  render() {
    return (
      <Router>
        <div>
          <Nav photoURL={this.state.userPhoto}>
            {this.state.user ?
              <Button bsStyle="primary" onClick={this.logout}>Log Out</Button>
              :
              <Button bsStyle="primary" onClick={this.login}>Login</Button>
            }
          </Nav>
          {/* <Switch>
            {this.state.userExists === true ?
              <Route exact path="/" render={() => <Board />} />
              :
              <Route exact path="/" render={() => <Button bsStyle="primary" onClick={this.login}>Login</Button>} />
            }
          </Switch> */}
          <Switch>
              <Route exact path="/" render={() => <Board />} />
          </Switch>
        </div>
      </Router>
    );
  };
};

export default App;
