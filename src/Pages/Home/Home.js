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
      email: '',
      password: '',
      error: null,

      user: null,
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
        console.log("user exists = " + this.state.userExists)
        console.log("userid = " + this.state.userid);

        firebase.database().ref("users/" + this.state.userid).on("child_added", function(snapshot) {
          console.log(snapshot.key);
        });

        // firebase.database().ref("users").once("value").then(function(snapshot) {
        //   console.log(snapshot)
        // })

        setTimeout(() => {
          this.setState({ show: false });
        }, 3000);
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
              <RequestModal user={this.state.user} userID={this.state.userID} />
              <Board user={this.state.user} userID={this.state.userID} />
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