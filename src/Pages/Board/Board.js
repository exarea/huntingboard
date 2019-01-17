import React from 'react';
import "./Board.css";
import { Grid, Row, Col, Panel, Button } from "react-bootstrap";
import firebase from "../../utils/firebase";
import itemList from "../../data/itemList.json"
// import RequestModal from "../../Components/RequestModal/RequestModal"

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
            accepted: false,
            itemSent: "",
            // finalized: "",
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
                    // finalized: huntingRequest[info].finalized
                });
            };
            // console.log(newState)
            this.setState({ huntingRequestList: newState });
        });

    };

    acceptRequest(huntingRequestList) {
        console.log("this is the id" + huntingRequestList)
        firebase.database().ref("huntingRequest/" + huntingRequestList).update({
            farmer: this.props.user,
            accepted: true,
            status: "In Progress"
        });
    };

    itemSent(huntingRequestList) {
        console.log("this is the id" + huntingRequestList)
        firebase.database().ref("huntingRequest/" + huntingRequestList).update({
            itemSent: true,
            status: "Items Sent"
        });
    };



    // acceptButton(huntingRequestList) {
    //     console.log("accept button"+huntingRequestList)
    // };

    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    {this.state.huntingRequestList.map((huntingRequestList, index) => (
                        <Col md={5} key={index} id={huntingRequestList.id}>
                            <Panel bsStyle="success">
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
                                            <br />
                                            <br />
                                            <p>Status: {huntingRequestList.status}</p>
                                        </Col>
                                    </Row>
                                </Panel.Body>
                                <Panel.Footer>
                                    {
                                        huntingRequestList.user === this.props.user ?
                                            <Button disabled>Accept</Button>
                                            :
                                            <span>
                                                {
                                                    huntingRequestList.accepted === true ?
                                                        <Button disabled>Accept</Button>
                                                        :
                                                        <Button onClick={() => this.acceptRequest(huntingRequestList.id)}>Accept</Button>
                                                }
                                            </span>
                                    }

                                    {
                                        huntingRequestList.user === this.props.user ?
                                            <Button disabled>Items Sent</Button>
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

                                    {/* <Button>Payment Sent</Button>
                                    <Button>something</Button> */}
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
