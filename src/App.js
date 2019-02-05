import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { Grid, Button } from "react-bootstrap";
import './App.css';
// import Nav from "./Components/Nav";
import { auth, googleProvider } from "./utils/firebase";

import Home from "./Pages/Home/Home";
import NoMatch from "./Pages/NoMatch/NoMatch";
// import Board from "./Pages/Board/Board";
// import RequestModal from "./Components/RequestModal/RequestModal";
// import Registration from "./Components/Registration/Registration";
// import Login from "./Components/Login/Login";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: null,

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
      auth.signOut().then(() => {
        this.setState({ user: null });
        this.setState({ userExists: false })
        this.setState({ userID: "" });
        this.setState({ userPhoto: "" });
      });
    };

    login() {
      auth.signInWithPopup(googleProvider).then((result) => {
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
          <Switch>
            <Route exact path ="/" render={() => <Home/> } /> 
            <Route component={NoMatch} />
          </Switch>
          {/* <Nav user={this.state.user}>
            {
              this.state.user ?
                <Button bsStyle="primary" onClick={this.logout}>Log Out</Button>
                :
                <Button bsStyle="primary" onClick={this.login}>Login</Button>
            }
          </Nav>

          {
            this.state.userExists === true ?
              <Grid>
                <RequestModal user={this.state.user} userID={this.state.userID} />
                <Board user={this.state.user} userID={this.state.userID} />
              </Grid>
              :
              <Grid>
                <Login action={this.handleSubmit} />
                <Registration />
              </Grid>
          } */}

          {/* <Switch>
            <Route exact path="/" render={() => */}

          {/* } />
          </Switch> */}

          {/* <Switch>
            <Route exact path="/" render={() =>
              <Grid>
                <RequestModal user={this.state.user}/>
                <Board user={this.state.user}/>
              </Grid>
            } />
          </Switch> */}
        </div>
      </Router>
    );
  };
};

export default App;
