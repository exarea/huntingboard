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
            itemImage: "",
            itemLink: "",
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
        this.payoutSent = this.payoutSent.bind(this);
    };

    componentDidMount() {
        // Access firebase, referencing item huntingRequest
        const huntingRequest = firebase.database().ref('huntingRequest');
        // Pull the snapshot from the huntingRequest
        huntingRequest.on('value', (snapshot) => {
            let huntingRequest = snapshot.val();
            // Make a temporary array to push info into
            let newState = [];

            // Run forloop pushing objects into empty array
            for (let info in huntingRequest) {
                newState.push({
                    id: info,
                    date: huntingRequest[info].date,
                    user: huntingRequest[info].user,
                    poster: huntingRequest[info].poster,
                    farmer: huntingRequest[info].farmer,
                    payout: huntingRequest[info].payout,
                    item: huntingRequest[info].item,
                    itemImage: huntingRequest[info].itemImage,
                    itemLink: huntingRequest[info].itemLink,
                    quantity: huntingRequest[info].quantity,
                    status: huntingRequest[info].status,
                    accepted: huntingRequest[info].accepted,
                    itemSent: huntingRequest[info].itemSent,
                    payoutSent: huntingRequest[info].payoutSent,
                    statusColor: huntingRequest[info].statusColor
                });
            };
            // console.log(newState)
            // Set new state of huntingRequestList with array of objects
            this.setState({ huntingRequestList: newState });
        });

    };

    acceptRequest(huntingRequestList) {
        // Pass huntingRequestList argument, make reference and update specific object
        firebase.database().ref("huntingRequest/" + huntingRequestList).update({
            // update states accordingly and push firebase
            farmer: this.props.user,
            accepted: true,
            status: "In Progress",
            statusColor: "warning"
        });
    };

    itemSent(huntingRequestList) {
        // Pass huntingRequestList argument, make reference to specific object
        firebase.database().ref("huntingRequest/" + huntingRequestList).update({
            // update states accordingly and push firebase
            itemSent: true,
            status: "Items Sent"
        });
    };

    payoutSent(huntingRequestList) {
        // Pass huntingRequestList argument, make reference to specific object
        firebase.database().ref("huntingRequest/" + huntingRequestList).update({
            // update states accordingly and push firebase
            payoutSent: true,
            status: "Complete",
            statusColor: "primary"
        });
    };

    render() {
        return (
            <Grid style={{ fontSize: 15 }}>
                <Row className="show-grid">
                    <Col md={9}>
                        {/* Show the entire arry of huntingRequestList  */
                            this.state.huntingRequestList.map((huntingRequestList, index) => (
                                <Col md={4} key={index} id={huntingRequestList.id}>
                                    <Panel bsStyle={(huntingRequestList.statusColor)}>
                                        <Panel.Heading>
                                            <Panel.Title>
                                                <img src={huntingRequestList.itemImage} alt="item thumb" />{" "}{huntingRequestList.item}
                                            </Panel.Title>
                                        </Panel.Heading>

                                        <Panel.Body style={{ height: 300 }}>
                                            <Row>
                                                <Col xs={12} className="text-center">
                                                    <div>
                                                        <p>{huntingRequestList.date}</p>
                                                        <h4>{huntingRequestList.status}</h4>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={6} className="text-left">
                                                    <p>Payee:<br /><b>{huntingRequestList.poster}</b></p>
                                                </Col>
                                                <Col xs={6} className="text-right">
                                                    <p>Accepted By:<br /><b>{huntingRequestList.farmer}</b></p>
                                                </Col>
                                            </Row>
                                            <br />
                                            <Row>
                                                <Col xs={12} className="text-center">
                                                    <p>Item:{" "}
                                                        <img src={huntingRequestList.itemImage} alt="item thumb" />{" "}
                                                        <a href={huntingRequestList.itemLink}>{huntingRequestList.item}</a>
                                                    </p>
                                                    <p>Quantity: <b>{huntingRequestList.quantity}</b></p>
                                                    <p>Payout: <b>{huntingRequestList.payout}</b></p>
                                                </Col>
                                            </Row>
                                        </Panel.Body>
                                        {/* Begin button display area  */}
                                        <Panel.Footer style={{ height: 55 }} className="text-center">
                                            {/* if the quest is incomplete, show all the other buttons */
                                                huntingRequestList.status === "Complete" ?
                                                    <span>Completed</span>
                                                    :
                                                    <div>
                                                        {/* if the logged in user owns the quest, show send-payment button */
                                                            huntingRequestList.user === this.props.user ?
                                                                <div>
                                                                    {/* if the logged in user owns the quest AND itemSent status is false, show send payment button*/
                                                                        huntingRequestList.user === this.props.user && huntingRequestList.itemSent === true ?

                                                                            <Button onClick={() => this.payoutSent(huntingRequestList.id)}>Send Payment</Button>
                                                                            :
                                                                            <Button disabled>Send Payment</Button>}
                                                                </div>
                                                                :
                                                                <span> </span>
                                                        }


                                                        {/* if the logged in user is NOT quest ownwer, show accept button */
                                                            huntingRequestList.user !== this.props.user ?
                                                                <span>
                                                                    {/* if the quest has not been accepted, show accept quest button */
                                                                        huntingRequestList.accepted === false ?
                                                                            <Button onClick={() => this.acceptRequest(huntingRequestList.id)}>Accept</Button>
                                                                            :
                                                                            <span>
                                                                                {/* if the logged in user is the farmer, show that they have accepted the quest */
                                                                                    huntingRequestList.farmer === this.props.user ?
                                                                                        <Button disabled>Accepted</Button>
                                                                                        :
                                                                                        <span> </span>
                                                                                }
                                                                            </span>
                                                                    }
                                                                </span>
                                                                :
                                                                <span> </span>
                                                        }

                                                        {/* if the logged in user is the farmer, AND quest has been accepted, AND items haven't been sent, show send items button */
                                                            huntingRequestList.farmer === this.props.user && huntingRequestList.accepted === true && huntingRequestList.itemSent === false ?
                                                                <span>
                                                                    {/* if the logged in user accepted the quest, show the send items button */
                                                                        huntingRequestList.accepted === false ?

                                                                            <Button disabled>Items Sent</Button>
                                                                            :
                                                                            <Button onClick={() => this.itemSent(huntingRequestList.id)}>Send Items</Button>
                                                                    }
                                                                </span>
                                                                :
                                                                <span> </span>
                                                        }
                                                    </div>
                                            }
                                        </Panel.Footer>
                                    </Panel>
                                </Col>
                            ))}
                    </Col>
                </Row>
            </Grid>
        );
    };
};

export default Board
