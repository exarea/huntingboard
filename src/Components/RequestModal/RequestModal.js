import React from 'react';
import "./RequestModal.css";
import { Grid, Modal, Row, Col, Panel, Button, Label, FormGroup, InputGroup, FormControl } from "react-bootstrap";
import firebase from "../../utils/firebase";
import itemList from "../../data/itemList.json"

class RequestModal extends React.Component {
    constructor() {
        super()
        this.state = {
            itemList: itemList,
            itemImage: "",
            itemLink: "",
            show: false,
            user: "",
            submitted: false,
            date: new Date().toDateString(),
            poster: "",
            farmer: "",
            payout: "",
            item: "",
            quantity: "",
            status: "",
            statusColor: "",
            accepted: false,
            itemSent: false,
            payoutSent: false
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

        for (var i = 0; i < itemList.length; i++) {

            if (this.state.item === itemList[i].value) {
                // console.log("item found inside the loop - it is: " + itemList[i].image)
                var itemImage = itemList[i].image
                var itemLink = itemList[i].link
            };
        };

        const huntingRequest = firebase.database().ref("huntingRequest");
        const info = {
            date: this.state.date,
            user: this.props.user,
            poster: this.state.poster,
            farmer: "Open",
            payout: this.state.payout + " zeny",
            item: this.state.item,
            itemImage: itemImage,
            itemLink: itemLink,
            itemSent: false,
            quantity: this.state.quantity,
            status: "Open",
            statusColor: "success",
            accepted: false,
            payoutSent: false
        };
        huntingRequest.push(info);

        this.setState({
            submitted: true
        });
        event.target.reset();
    };

    handleClose() {
        this.setState({
            show: false,
            submitted: false
        });
    };

    handleShow() {
        this.setState({
            show: true
        });
    };


    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={9}>

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
                            {this.state.submitted === false ?
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
                                                    onChange={this.handleChange}
                                                    required
                                                />
                                            </InputGroup>
                                            <p className="text-muted">Please spell your IGN correctly</p>
                                            <InputGroup>
                                                <Label>Payout: </Label>
                                                <FormControl
                                                    type="text"
                                                    className="form-control"
                                                    name="payout"
                                                    placeholder="3,550,000"
                                                    onChange={this.handleChange}
                                                    required
                                                    pattern="^\$?(?=.)(?:[1-9]\d{0,2}(?:,?\d{3})*)?$"
                                                />
                                            </InputGroup>
                                            <p className="text-muted">e.g.: 4,500,000 or 750,000</p>
                                            <InputGroup>
                                                <Label>Item: </Label><br />
                                                <select
                                                    className="form-control"
                                                    name="item"
                                                    onChange={this.handleChange}
                                                    required
                                                >
                                                    {this.state.itemList.map((itemList, index) => (
                                                        <option key={index} value={itemList.value}>{itemList.value}</option>
                                                    ))}
                                                </select>
                                            </InputGroup>
                                            <p className="text-muted">e.g.: Strange Steel Piece</p>
                                            <InputGroup>
                                                <Label>Quantity: </Label>
                                                <FormControl
                                                    type="text"
                                                    className="form-control"
                                                    name="quantity"
                                                    maxLength="4"
                                                    placeholder="1200"
                                                    onChange={this.handleChange}
                                                    required
                                                    pattern="[0-9]{1,4}"
                                                />
                                            </InputGroup>
                                            <p className="text-muted">e.g.: 1400</p>
                                        </FormGroup>

                                        <Button
                                            type="submit"
                                            value="Submit"
                                        >New Request</Button>
                                    </form>
                                </Modal.Body>
                                :
                                <Modal.Body>
                                    <form onSubmit={this.handleSubmit}>
                                        <FormGroup>
                                            <h3>
                                                Date: {this.state.date}
                                            </h3>
                                            <InputGroup>
                                                <Label>Character IGN: </Label>
                                                <FormControl
                                                    placeholder={this.state.poster}
                                                    disabled
                                                />
                                            </InputGroup>

                                            <InputGroup>
                                                <Label>Payout: </Label>
                                                <FormControl
                                                    placeholder={this.state.payout}
                                                    disabled
                                                />
                                            </InputGroup>

                                            <InputGroup>
                                                <Label>Item: </Label>
                                                <FormControl
                                                    placeholder={this.state.item}
                                                    disabled
                                                />
                                            </InputGroup>

                                            <InputGroup>
                                                <Label>Quantity: </Label>
                                                <FormControl
                                                    placeholder={this.state.quantity}
                                                    disabled
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                        <Button
                                            bsStyle="success"
                                            disabled
                                        >Submitted</Button>
                                    </form>
                                </Modal.Body>
                            }
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
