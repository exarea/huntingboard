import React, { Component } from "react";
import Board from "../../Pages/Board/Board";
import Footer from "../../Components/Footer/Footer";
import RequestModal from "../../Components/RequestModal/RequestModal";
import Registration from "../../Components/Registration/Registration";
import Verify from "../../Components/Verify/Verify";
// import Logout from "../../Components/Logout/Logout";
import { Grid, Modal, Jumbotron, Col, Row, Label, Button, FormGroup, InputGroup, Form, FormControl } from "react-bootstrap";
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
      verified: false,
      userExists: false,
      userID: "",
      userPhoto: "",
      admin: false,
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.logOut = this.logOut.bind(this);
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
        this.setState({
          userID: user.uid,
          verified: user.emailVerified,
        });
        // console.log("email verified? " + this.state.verified);

        var that = this;
        firebase.database().ref("users/" + this.state.userID).on("value", function (snapshot) {
          var userIGN = (snapshot.val().ign);
          var admin = (snapshot.val().admin);
          var userEmail = (snapshot.val().email);
          // console.log(snapshot.val());
          that.setState({
            ign: userIGN,
            email: userEmail,
            admin: admin,
            spinnerShow: false,
            userExists: true,
            show: false,
            error: null,
          }); 
        });
      })
      .catch((error) => {
        this.setState({ error: error });
      });
  };

  logOut() {
    firebase.auth().signOut();
    this.setState({
      userExists: false,
      ign: "",
      email: "",
      admin: ""
    });
    console.log("you've logged out");
  };

  handleClose() {
    // Modal close function
    this.setState({
      show: false,
    });
  };

  handleShow() {
    // Modal show function
    this.setState({
      show: true
    });
  };

  render() {
    const { email, password, error } = this.state;
    return (
      <div>
        <Nav>
          {
            this.state.userExists === true ?
              <Button bsStyle="primary" onClick={this.logOut}>Logout</Button>
              :
              <Button bsStyle="primary" onClick={this.handleShow}>Login</Button>
          }
        </Nav>
        {
          this.state.userExists === true ?
            <div>
              {
                this.state.verified === false ?
                  <Grid>
                    <Row>
                      <Col xs={12}>
                        <Jumbotron className="text-center">
                          <Verify />
                          <br />
                          <Button
                            bsStyle="warning"
                            onClick={this.logOut}
                          >
                            Re-login
                          </Button>
                        </Jumbotron>
                      </Col>
                    </Row>
                  </Grid>
                  :
                  <Grid>
                    <RequestModal
                      user={this.state.user}
                      userID={this.state.userID}
                      ign={this.state.ign}
                      email={this.state.email}
                    />
                    <Board
                      user={this.state.user}
                      userID={this.state.userID}
                      ign={this.state.ign}
                      admin={this.state.admin}
                      email={this.state.email}
                    />
                  </Grid>
              }
            </div>
            :
            <Grid>
              {/* <Button onClick={this.handleShow}>Login</Button> */}
              <Registration />
              <Modal show={this.state.show} onHide={this.handleClose} backdrop="static" keyboard={false}>
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
                              placeholder="your@email.com"
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

                {this.state.error === null ?

                  null
                  :
                  <Modal.Footer>
                    <Button onClick={this.handleClose}>Close</Button>
                  </Modal.Footer>
                }

              </Modal>
              {/* <Registration /> */}
            </Grid>
        }
        <Footer />
      </div>
    );
  };
};

export default Home;