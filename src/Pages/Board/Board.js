import React from 'react';
import "./Board.css";
import { Grid, Row, Col, Panel, Button } from "react-bootstrap";
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
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label >Today's Date: {this.state.date}</label>
                                        <br />

                                        <label >Character IGN: </label>
                                        <input type="text" className="form-control" name="poster" onChange={this.handleChange} required />

                                        <label >Payout: </label>
                                        <input type="number" className="form-control" name="payout" min="1" max="100000000" onChange={this.handleChange} required />

                                        <label >Item: </label>
                                        <input type="text" className="form-control" name="item" onChange={this.handleChange} required />

                                        <label >Quantity: </label>
                                        <input type="number" className="form-control" name="quantity" min="1" max="2000" onChange={this.handleChange} required />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn"
                                        value="Submit"
                                    >New Request</button>
                                </form>

                            ) : (
                                    <div className="text-center">Submitted</div>
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
                                        <Col xs={9}>
                                            <div className="text-left">Hunting Request</div>
                                        </Col>
                                        <Col xs={3}>
                                            <div className="text-right">Posted: {huntingRequestList.date}</div>
                                        </Col>
                                    </Panel.Title>
                                </Panel.Heading>

                                <Panel.Body>
                                    <Row>
                                        <Col xs={6} className="text-left">
                                            <p>Poster: {huntingRequestList.poster}</p>
                                            <p>Fulfilled: {huntingRequestList.farmer}</p>
                                            <br />
                                            <p>Payout: {huntingRequestList.payout}</p>
                                        </Col>
                                        <Col xs={6} className="text-right">
                                            <p>Item: {huntingRequestList.item}</p>
                                            <p>Quantity: {huntingRequestList.quantity}</p>
                                            <br />
                                            <p>Status: {huntingRequestList.status}</p>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs={3} className="text-center">
                                            <Button>Accept</Button>
                                        </Col>
                                        <Col xs={3} className="text-center">
                                            <Button>Items Sent</Button>
                                        </Col>
                                        <Col xs={3} className="text-center">
                                            <Button>Payment Sent</Button>
                                        </Col>
                                        <Col xs={3} className="text-center">
                                            <Button>something</Button>
                                        </Col>
                                    </Row>
                                </Panel.Body>
                            </Panel>

                        )}

                    </Col>
                </Row>
            </Grid>
        )
    }

}

export default Board
