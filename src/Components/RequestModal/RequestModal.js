import React from 'react';
import "./RequestModal.css";
import { Grid, Modal, Row, Col, Panel, Button, Label, FormGroup, InputGroup, FormControl } from "react-bootstrap";
import firebase from "../../utils/firebase";

class RequestModal extends React.Component {
    constructor() {
        super()
        this.state = {
            show: false,
            user: "",
            submitted: false,
            date: new Date().toDateString(),
            IGN: "",
            farmer: "",
            payout: "",
            item: "",
            quantity: "",
            status: "",
            accepted: false,
            itemSent: false,
            // finalized: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    };

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit(event) {
        event.preventDefault();

        // console.log("date: " + this.state.date);
        // console.log("poster: " + this.state.poster);
        // console.log("farmer: Open");
        // console.log("payout: " + this.state.payout + "zeny");
        // console.log("item: " + this.state.item);
        // console.log("quantity: " + this.state.quantity);
        // console.log("status: " + this.state.status);

        const huntingRequest = firebase.database().ref("huntingRequest");
        const info = {
            date: this.state.date,
            user: this.props.user,
            poster: this.state.poster,
            farmer: "Open",
            payout: this.state.payout + "zeny",
            item: this.state.item,
            itemSent: false,
            quantity: this.state.quantity,
            status: "Open",
            accepted: false
        };
        huntingRequest.push(info);

        this.setState({ submitted: true });
        event.target.reset();
    };

    handleClose() {
        this.setState({ show: false });
    };

    handleShow() {
        this.setState({ show: true });
    };

    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={10}>

                        <Panel>
                            <Panel.Heading>
                                Making a new hunting request
                            </Panel.Heading>
                            <Panel.Body>
                                <p>To create a new hunting request, fill out the forms correctly with exactly what you want. </p>
                            </Panel.Body>
                            <Panel.Footer>
                                <Button onClick={this.handleShow}>New Hunting Request</Button>
                            </Panel.Footer>
                        </Panel>

                        <Modal show={this.state.show} onHide={this.handleClose}>
                            <Modal.Body>
                                <form onSubmit={this.handleSubmit}>
                                    <FormGroup>
                                        <h3>
                                            Date: {this.state.date}
                                        </h3>
                                        <InputGroup>
                                            <Label>Character IGN: </Label>
                                            <FormControl
                                                type="text"
                                                className="form-control"
                                                name="poster"
                                                maxLength="24"
                                                placeholder="Mosjoandy"
                                                onChange={this.handleChange} required
                                            />
                                        </InputGroup>

                                        <InputGroup>
                                            <Label>Payout: </Label>
                                            <FormControl
                                                type="number"
                                                className="form-control"
                                                name="payout"
                                                min="1"
                                                max="100000000"
                                                placeholder="3550000"
                                                onChange={this.handleChange} required
                                            />
                                        </InputGroup>

                                        <InputGroup>
                                            <Label>Item: </Label>
                                            <FormControl
                                                type="text"
                                                className="form-control"
                                                name="item"
                                                maxLength="20"
                                                placeholder="Strange Steel Piece"
                                                onChange={this.handleChange} required
                                            />
                                        </InputGroup>

                                        <InputGroup>
                                            <Label>Quantity: </Label>
                                            <FormControl
                                                type="number"
                                                className="form-control"
                                                name="quantity"
                                                min="1"
                                                max="2000"
                                                maxLength="4"
                                                placeholder="690"
                                                onChange={this.handleChange} required
                                            />
                                        </InputGroup>

                                    </FormGroup>

                                    <Button
                                        type="submit"
                                        value="Submit"
                                        onClick={this.handleClose}
                                    >New Request</Button>
                                </form>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button onClick={this.handleClose}>Close</Button>
                            </Modal.Footer>

                        </Modal>
                    </Col>
                </Row>
            </Grid>
        );
    };
};

export default RequestModal
