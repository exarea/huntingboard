import React from 'react';
import "./Board.css";
import { Grid, Row, Col, Panel, Button } from "react-bootstrap";
import firebase from "../../utils/firebase";
// import { auth, provider } from "../../utils/firebase.js"

class Board extends React.Component {

    constructor() {
        super()
        this.state = {
            huntingRequestList: []
        };

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
                    accepted: huntingRequest[info].accepted,
                    completed: huntingRequest[info].completed,
                    finalized: huntingRequest[info].finalized
                });
            };
            this.setState({
                huntingRequestList: newState
            });
        });
    };

    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={10}>
                        <Panel bsClass="bg-warning">
                            <Row>
                                <Col xs={9}>
                                    <p className="text-left">Hunting Request</p>
                                </Col>
                                <Col xs={3}>
                                    <p className="text-right">Posted: January 3, 2019 14:00</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6} className="text-left">
                                    <p>Poster: Mosjoandy</p>
                                    <p>Fulfilled: Imp Farmer</p>
                                    <br />
                                    <p>Payout: 3.5m</p>
                                </Col>
                                <Col xs={6} className="text-right">
                                    <p>Item: Crystal Fragment</p>
                                    <p>Quantity: 690</p>
                                    <br />
                                    <p>Status: In Progress</p>
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
                                    <p>something</p>
                                </Col>
                            </Row>
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        )
    }

}

export default Board
