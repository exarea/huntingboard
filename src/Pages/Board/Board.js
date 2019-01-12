import React from 'react';
import "./Board.css";
import { Grid, Row, Col, Panel, Button, Label, FormGroup, InputGroup, FormControl } from "react-bootstrap";
import firebase from "../../utils/firebase";

class Board extends React.Component {

    constructor() {
        super()
        this.state = {
            huntingRequestList: [],
            submitted: false,
            date: new Date().toDateString(),
            IGN: "",
            farmer: "",
            payout: "",
            item: "",
            quantity: "",
            status: ""
            // accepted: "",
            // completed: "",
            // finalized: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount() {
        const huntingRequest = firebase.database().ref('huntingRequest');

        huntingRequest.on('value', (snapshot) => {
            let huntingRequest = snapshot.val();
            let newState = [];

            for (let info in huntingRequest) {
                newState.push({
                    id: info,
                    date: huntingRequest[info].date,
                    poster: huntingRequest[info].poster,
                    farmer: huntingRequest[info].farmer,
                    payout: huntingRequest[info].payout,
                    item: huntingRequest[info].item,
                    quantity: huntingRequest[info].quantity,
                    status: huntingRequest[info].status,
                    // accepted: huntingRequest[info].accepted,
                    // completed: huntingRequest[info].completed,
                    // finalized: huntingRequest[info].finalized
                });
            };
            this.setState({ huntingRequestList: newState });
        });
    };

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit(event) {
        event.preventDefault();

        console.log("date: " + this.state.date);
        console.log("poster: " + this.state.poster);
        console.log("farmer: Open");
        console.log("payout: " + this.state.payout + "zeny");
        console.log("item: " + this.state.item);
        console.log("quantity: " + this.state.quantity);
        console.log("status: " + this.state.status);

        const huntingRequest = firebase.database().ref("huntingRequest");
        const info = {
            date: this.state.date,
            poster: this.state.poster,
            farmer: "Open",
            payout: this.state.payout + "zeny",
            item: this.state.item,
            quantity: this.state.quantity,
            status: "Open"
        };
        huntingRequest.push(info);

        this.setState({ submitted: true });
        event.target.reset();
    };

    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={10}>
                        <Panel bsClass="bg-white">
                            {!this.state.submitted ? (
                                <Panel>
                                    <Panel.Body>
                                        <form onSubmit={this.handleSubmit}>
                                            <FormGroup>
                                                <h3>
                                                    Today's Date: {this.state.date}
                                                </h3>
                                                <InputGroup>
                                                    <Label>Character IGN: </Label>
                                                    <FormControl type="text" className="form-control" name="poster" size="20" placeholder="Mosjoandy" onChange={this.handleChange} required />
                                                </InputGroup>
                                                <InputGroup>
                                                    <Label>Payout: </Label>
                                                    <FormControl type="number" className="form-control" name="payout" min="1" max="100000000" size="9" placeholder="3550000" onChange={this.handleChange} required />
                                                </InputGroup>
                                                <InputGroup>
                                                    <Label>Item: </Label>
                                                    <FormControl type="text" className="form-control" name="item" size="20" placeholder="Strange Steel Piece" onChange={this.handleChange} required />
                                                </InputGroup>
                                                <InputGroup>
                                                    <Label>Quantity: </Label>
                                                    <FormControl type="number" className="form-control" name="quantity" min="1" max="4" size="4" placeholder="690" onChange={this.handleChange} required />
                                                </InputGroup>
                                            </FormGroup>
                                            <Button
                                                type="submit"
                                                className="btn"
                                                value="Submit"
                                            >New Request</Button>
                                        </form>
                                    </Panel.Body>
                                </Panel>
                            ) : (
                                    <Panel>
                                        <Panel.Body>
                                            <p className="text-center">Submitted</p>
                                        </Panel.Body>
                                    </Panel>
                                )}
                        </Panel>
                    </Col>
                </Row>

                <Row className="show-grid">
                    <Col xs={10}>
                        {this.state.huntingRequestList.map((huntingRequestList) =>
                            <Panel bsStyle="success" key={huntingRequestList.id}>
                                <Panel.Heading>
                                    <Panel.Title>
                                        <div className="text-left">Hunting Request: {huntingRequestList.item}</div>
                                    </Panel.Title>
                                </Panel.Heading>

                                <Panel.Body>
                                    <Row>
                                        <Col xs={6} className="text-left">
                                            <p>Posted: {huntingRequestList.date}</p>
                                            <p>Poster: {huntingRequestList.poster}</p>
                                            <p>Fulfilled: {huntingRequestList.farmer}</p>
                                            <br />
                                            <p>Payout: {huntingRequestList.payout}</p>
                                        </Col>
                                        <Col xs={6} className="text-right">
                                            <p>Item: {huntingRequestList.item}</p>
                                            <p>Quantity: {huntingRequestList.quantity}</p>
                                            <br /><br />
                                            <p>Status: {huntingRequestList.status}</p>
                                        </Col>
                                    </Row>
                                </Panel.Body>
                                <Panel.Footer>
                                    <Button>Accept</Button>
                                    <Button>Items Sent</Button>
                                    <Button>Payment Sent</Button>
                                    <Button>something</Button>
                                </Panel.Footer>
                            </Panel>

                        )}

                    </Col>
                </Row>
            </Grid>
        )
    }

}

// <Panel.Footer>
// <Col xs={3} className="text-center">
//     <Button>Accept</Button>
// </Col>
// <Col xs={3} className="text-center">
//     <Button>Items Sent</Button>
// </Col>
// <Col xs={3} className="text-center">
//     <Button>Payment Sent</Button>
// </Col>
// <Col xs={3} className="text-center">
//     <Button>something</Button>
// </Col>
// </Panel.Footer>
export default Board
