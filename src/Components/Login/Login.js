import React from 'react';
import { Grid, Row, Col, Modal, Label, Button, FormGroup, InputGroup, Form, FormControl, Glyphicon, Popover, OverlayTrigger } from "react-bootstrap";
import firebase from "../../utils/firebase"

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            email: "",
            password: "",
            error: null,
            spinnerShow: false,

            user: "",
            userExists: false,
            userid: "",
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
                console.log(user);
                this.setState({ user: user.displayName });
                this.setState({ userExists: true })
                this.setState({ userid: user.uid });
                console.log(this.state.user + " + " + this.state.userExists + " + " + this.state.userid)
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
            </div>
        );

    };
};

export default Login