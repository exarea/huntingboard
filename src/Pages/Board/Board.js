import React from 'react';
import "./Board.css";
import { Grid, Row, Col, Panel, Button } from "react-bootstrap";
import firebase from "../../utils/firebase";
import itemList from "../../data/itemList.json"

class Board extends React.Component {

    constructor() {
        super()
        this.state = {
            itemList: itemList,
            huntingRequestList: [],
            submitted: false,
            date: new Date().toDateString(),
            user: "",
            IGN: "",
            farmer: "",
            payout: "",
            item: "",
            quantity: "",
            status: "",
            statusColor: "",
            accepted: false,
            itemSent: "",
            payoutSent: "",
        };
        this.acceptRequest = this.acceptRequest.bind(this);
        this.itemSent = this.itemSent.bind(this);

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
                    user: huntingRequest[info].user,
                    poster: huntingRequest[info].poster,
                    farmer: huntingRequest[info].farmer,
                    payout: huntingRequest[info].payout,
                    item: huntingRequest[info].item,
                    quantity: huntingRequest[info].quantity,
                    status: huntingRequest[info].status,
                    accepted: huntingRequest[info].accepted,
                    itemSent: huntingRequest[info].itemSent,
                    payoutSent: huntingRequest[info].payoutSent,
                    statusColor: huntingRequest[info].statusColor
                });
            };
            // console.log(newState)
            this.setState({ huntingRequestList: newState });
        });

    };

    acceptRequest(huntingRequestList) {
        console.log("this is the id" + huntingRequestList);
        firebase.database().ref("huntingRequest/" + huntingRequestList).update({
            farmer: this.props.user,
            accepted: true,
            status: "In Progress",
            statusColor: "warning"
        });
    };

    itemSent(huntingRequestList) {
        console.log("this is the id" + huntingRequestList);
        firebase.database().ref("huntingRequest/" + huntingRequestList).update({
            itemSent: true,
            status: "Items Sent"
        });
    };

    payoutSent(huntingRequestList) {
        console.log("this is the id" + huntingRequestList);
        firebase.database().ref("huntingRequest/" + huntingRequestList).update({
            payoutSent: true,
            status: "Complete",
            statusColor: "primary"
        });
    };

    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    {this.state.huntingRequestList.map((huntingRequestList, index) => (
                        <Col md={3} key={index} id={huntingRequestList.id}>
                            <Panel bsStyle={huntingRequestList.statusColor}>
                                <Panel.Heading>
                                    <Panel.Title>
                                        <div className="text-left">{huntingRequestList.item}</div>
                                    </Panel.Title>
                                </Panel.Heading>

                                <Panel.Body>
                                    <Row>
                                        <Col xs={12}>
                                            <p className="text-center">{huntingRequestList.date}</p>
                                            <p className="text-center">{huntingRequestList.status}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={6} className="text-left">
                                            <p>Payee:<br />{huntingRequestList.poster}</p>
                                        </Col>
                                        <Col xs={6} className="text-right">
                                            <p>Accepted By:<br />{huntingRequestList.farmer}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <p className="text-center">Item: {huntingRequestList.item}</p>

                                            {/* {this.state.itemList.map((itemList, index) => (

                                                <img src={itemList.image} key={index} alt="item" />
                                                ))} */}

                                            <p className="text-center">Quantity: {huntingRequestList.quantity}</p>
                                            <p className="text-center">Payout: {huntingRequestList.payout}</p>
                                        </Col>
                                    </Row>
                                </Panel.Body>
                                <Panel.Footer className="text-center">
                                    {
                                        huntingRequestList.user === this.props.user ?
                                            <span></span>
                                            :
                                            <span>
                                                {
                                                    huntingRequestList.accepted === true ?
                                                        <Button disabled>Accepted</Button>
                                                        :
                                                        <Button onClick={() => this.acceptRequest(huntingRequestList.id)}>Accept</Button>
                                                }
                                            </span>
                                    }

                                    {
                                        huntingRequestList.user === this.props.user ?
                                            <span></span>
                                            :
                                            <span>
                                                {
                                                    huntingRequestList.farmer === this.props.user && huntingRequestList.accepted === true && huntingRequestList.itemSent === false ?
                                                        <Button onClick={() => this.itemSent(huntingRequestList.id)}>Send Items</Button>
                                                        :
                                                        <Button disabled>Items Sent</Button>
                                                }
                                            </span>

                                    }

                                    {
                                        huntingRequestList.payoutSent === false && huntingRequestList.user === this.props.user ?
                                            <span>
                                                {

                                                    huntingRequestList.user === this.props.user && huntingRequestList.itemSent === true ?
                                                        <Button onClick={() => this.payoutSent(huntingRequestList.id)}>Send Payment</Button>
                                                        :
                                                        <Button disabled>Payment Sent</Button>
                                                }
                                            </span>
                                            :
                                            <span></span>
                                    }

                                    {/* <Button>something</Button> */}
                                </Panel.Footer>
                            </Panel>
                        </Col>
                    ))}
                </Row>
            </Grid>
        );
    };
};

export default Board
