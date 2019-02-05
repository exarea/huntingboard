import React, { Component } from "react";
import Board from "../../Pages/Board/Board";
import RequestModal from "../../Components/RequestModal/RequestModal";
import Registration from "../../Components/Registration/Registration";
import { Grid, Row, Col, Modal, Label, Button, FormGroup, InputGroup, Form, FormControl, Glyphicon, Popover, OverlayTrigger } from "react-bootstrap";
import Nav from "../../Components/Nav";
import firebase from "../../utils/firebase";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: null,

      user: null,
      ign: null,
      userExists: false,
      userID: "",
      userPhoto: "",
      admin: false,
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.spinnyThing = this.spinnyThing.bind(this);
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      spinnerShow: true
    });
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((result) => {
        var user = result.user;
        this.setState({ userExists: true });
        this.setState({ userid: user.uid });

        var that = this;
        firebase.database().ref("users/" + this.state.userid).on("value", function (snapshot) {
          var userIGN = (snapshot.val().ign);
          console.log(userIGN); // WORKS - gives ign from database 
          that.setState({ ign: userIGN }); // WORKS - sets that.state.ign to ign from database 
          console.log(that.state.ign); // WORKS - gives ign from that.state 
        })
        console.log(that); // WORKS - shows object that has state with ign
        console.log(that.state); // FAIL - shows state object, but ign is null now?!

        // var stuff = [];
        // stuff.push(that);
        // console.log(stuff[0]["state"].ign);
        // console.log(this.state.ign) //shows that.state.ign === ""
        // console.log(that.state.ign) //shows null

        // this.setState({ign: that.state })
        // const ign = this.state.ign
        // console.log(ign)
        // console.log(that.state)
        // console.log(this.state.ign) //userIGN not defined



        // var userId = firebase.auth().currentUser.uid;
        // console.log(userId);

        // setTimeout(() => {
        //   this.setState({ show: false });
        // }, 5000);

      })
      .catch((error) => {
        this.setState({ error: error });
      });
  };


  handleClose() {
    // Modal close function
    this.setState({
      show: false,
      submitted: false
    });
  };

  handleShow() {
    // Modal show function
    this.setState({
      show: true
    });
  };

  spinnyThing() {
    this.setState({
      spinnerShow: true
    });
  };


  render() {
    const { email, password, error } = this.state;
    return (
      <div>
        <Nav user={this.state.user}>
          {
            this.state.userExists === true ?
              <Button bsStyle="primary">Poop</Button>
              :
              <Button bsStyle="primary" onClick={this.handleShow}>Login</Button>
          }
        </Nav>
        {
          this.state.userExists === true ?
            <Grid>
              <RequestModal
                user={this.state.user}
                userID={this.state.userID}
                ign={this.state.ign}
              />
              <Board
                user={this.state.user}
                userID={this.state.userID}
                ign={this.state.ign}
              />
            </Grid>
            :
            <Grid>
              <Button onClick={this.handleShow}>Login</Button>
              <Modal show={this.state.show} onHide={this.handleClose}>
                {
                  this.state.userExists === false ?
                    <Modal.Body>
                      <h1>Log in</h1>
                      <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                          <InputGroup>
                            <Label>E-mail:</Label>
                            <FormControl
                              type="text"
                              name="email"
                              placeholder="Email"
                              value={email}
                              onChange={this.handleChange}
                              required
                            />
                          </InputGroup>
                          <br />
                          <InputGroup>
                            <Label>Password:</Label>
                            <FormControl
                              type="password"
                              name="password"
                              placeholder="Password"
                              value={password}
                              onChange={this.handleChange}
                              required
                            />
                          </InputGroup>
                          <br />
                          {
                            error ?
                              (<div>{error.message}</div>)
                              :
                              null
                          }

                          {
                            this.state.spinnerShow === true && error === null ?
                              <img style={{ width: 90, height: 75 }} src={require("../../data/loading.gif")} alt="spins" />
                              :
                              <Button
                                type="submit"
                                value="Submit">
                                Log In
                              </Button>
                          }
                        </FormGroup>
                      </Form>
                    </Modal.Body>
                    :
                    <Modal.Body>
                      <h1>Log in</h1>
                      <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                          <InputGroup>
                            <Label>E-mail:</Label>
                            <FormControl
                              type="text"
                              name="email"
                              placeholder="Email"
                              value={email}
                              onChange={this.handleChange}
                              required
                              disabled
                            />
                          </InputGroup>
                          <br />
                          <InputGroup>
                            <Label>Password:</Label>
                            <FormControl
                              type="password"
                              name="password"
                              placeholder="Password"
                              value={password}
                              onChange={this.handleChange}
                              required
                              disabled
                            />
                          </InputGroup>
                          <br />
                          {
                            error ?
                              (<div>{error.message}</div>)
                              :
                              null
                          }
                          <Button
                            type="submit"
                            value="Submit"
                            disabled>
                            Log in Successful
                                        </Button>

                        </FormGroup>
                      </Form>
                    </Modal.Body>

                }

                <Modal.Footer>
                  <Button onClick={this.handleClose}>Close</Button>
                </Modal.Footer>
              </Modal>
              <Registration />
            </Grid>
        }
      </div>
    );
  }

};

export default Home;