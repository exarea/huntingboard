import React from 'react';
import "./RequestModal.css";
import { Grid, Modal, Row, Col, Panel, Button, Label, FormGroup, InputGroup, Form, FormControl, Glyphicon, Popover, OverlayTrigger } from "react-bootstrap";
import firebase from "../../utils/firebase";
import itemList from "../../data/itemList.json"

class RequestModal extends React.Component {
    constructor() {
        super()
        this.state = {
            show: false,

            user: "",

            submitted: false,

            date: new Date().toDateString(),
            poster: "",
            farmer: "",
            payout: "",
            item: "",
            itemList: itemList,
            itemImage: "",
            itemLink: "",
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

        // Run forloop to go through itemList json
        for (var i = 0; i < itemList.length; i++) {
            // if the item user is trying to create exists in the json, pull data
            if (this.state.item === itemList[i].value) {
                // console.log("item found inside the loop - it is: " + itemList[i].image)
                // Set items found to new variables
                var itemImage = itemList[i].image
                var itemLink = itemList[i].link
            };
        };

        // Make reference to firebase huntingRequest and make new object
        const huntingRequest = firebase.database().ref("huntingRequest");
        // Data submitted by the user
        const data = {
            date: this.state.date,
            user: this.props.user,
            poster: this.state.poster,
            farmer: "Open",
            payout: this.state.payout + " zeny",
            item: this.state.item,
            // item from forloop accessing itemList json shown here
            itemImage: itemImage,
            itemLink: itemLink,
            itemSent: false,
            quantity: this.state.quantity,
            status: "Open",
            statusColor: "success",
            accepted: false,
            payoutSent: false
        };
        // Push new object to firebase
        huntingRequest.push(data);

        // Change state of submission
        this.setState({
            submitted: true
        });
        // Reset form
        event.target.reset();
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


    render() {
        // Popover data in modal form
        const IGNPopOver = (
            <Popover id="popover-trigger-hover-focus">
                Spell your name <strong>exactly</strong> as it is In-Game. This will ensure a farmer will send the items to the proper character.
            </Popover>
        );

        const payoutPopOver = (
            <Popover id="popover-trigger-hover-focus">
                Specify the <strong>exact amount</strong> in the designated format with commas. (#,###,### or ###,###)
            </Popover>
        );

        const itemPopOver = (
            <Popover id="popover-trigger-hover-focus">
                Select a SQI Upgrade Ingredient from the list.
            </Popover>
        );

        const quantityPopOver = (
            <Popover id="popover-trigger-hover-focus">
                Specify the exact amount in the designated format with commas. (#,### or ###)
            </Popover>
        );

        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={9}>

                        <Panel>
                            <Panel.Heading>
                                Making a new hunting request
                            </Panel.Heading>
                            <Panel.Body>
                                <p>To create a new hunting request, complete the form and submit! </p>
                            </Panel.Body>
                            <Panel.Footer>
                                <Button onClick={this.handleShow}>New Hunting Request</Button>
                            </Panel.Footer>
                        </Panel>

                        <Modal show={this.state.show} onHide={this.handleClose}>
                            {/* if submission is false, show forms with fields that can be filled out */
                                this.state.submitted === false ?
                                    <Modal.Body>
                                        <Form onSubmit={this.handleSubmit} inline>
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
                                                        required />
                                                </InputGroup>
                                                <p className="text-muted">Please spell your IGN correctly
                                            <OverlayTrigger
                                                        trigger={['hover', 'focus']}
                                                        placement="bottom"
                                                        overlay={IGNPopOver}>
                                                        <Glyphicon style={{ fontSize: 15, marginLeft: 5 }} glyph="question-sign" />
                                                    </OverlayTrigger>
                                                </p>

                                                <InputGroup>
                                                    <Label>Payout: </Label>
                                                    <FormControl
                                                        type="text"
                                                        className="form-control"
                                                        name="payout"
                                                        placeholder="3,550,000"
                                                        onChange={this.handleChange}
                                                        required
                                                        pattern="^\$?(?=.)(?:[1-9]\d{0,2}(?:,?\d{3})*)?$" />
                                                </InputGroup>
                                                <p className="text-muted">e.g.: 4,500,000 or 750,000
                                            <OverlayTrigger
                                                        trigger={['hover', 'focus']}
                                                        placement="bottom"
                                                        overlay={payoutPopOver}>
                                                        <Glyphicon style={{ fontSize: 15, marginLeft: 5 }} glyph="question-sign" />
                                                    </OverlayTrigger>
                                                </p>

                                                <InputGroup>
                                                    <Label>Item: </Label><br />
                                                    <FormControl
                                                        componentClass="select"
                                                        className="form-control"
                                                        name="item"
                                                        onChange={this.handleChange}
                                                        required>
                                                        {this.state.itemList.map((itemList, index) => (
                                                            <option key={index} value={itemList.value}>{itemList.value}</option>
                                                        ))}
                                                    </FormControl>
                                                </InputGroup>
                                                <p className="text-muted">e.g.: Strange Steel Piece
                                            <OverlayTrigger
                                                        trigger={['hover', 'focus']}
                                                        placement="bottom"
                                                        overlay={itemPopOver}>
                                                        <Glyphicon style={{ fontSize: 15, marginLeft: 5 }} glyph="question-sign" />
                                                    </OverlayTrigger>
                                                </p>

                                                <InputGroup>
                                                    <Label>Quantity: </Label>
                                                    <FormControl
                                                        type="text"
                                                        className="form-control"
                                                        name="quantity"
                                                        maxLength="5"
                                                        placeholder="1,200"
                                                        onChange={this.handleChange}
                                                        required
                                                        pattern="^\$?(?=.)(?:[1-9]\d{0,2}(?:,?\d{3})*)?$" />
                                                </InputGroup>
                                                <p className="text-muted">e.g.: 1400
                                            <OverlayTrigger
                                                        trigger={['hover', 'focus']}
                                                        placement="bottom"
                                                        overlay={quantityPopOver}>
                                                        <Glyphicon style={{ fontSize: 15, marginLeft: 5 }} glyph="question-sign" />
                                                    </OverlayTrigger>
                                                </p>

                                                <Button
                                                    type="submit"
                                                    value="Submit">
                                                    New Request
                                            </Button>

                                            </FormGroup>

                                        </Form>
                                    </Modal.Body>
                                    :
                                    // if form is filled out and submission is true, show the data the user submitted in disabled form
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
                            {/* Button for submission */}
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
