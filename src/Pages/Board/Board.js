import React from 'react';
import "./Board.css";
import { Grid, Row, Col, Panel, Button, Modal } from "react-bootstrap";
import firebase from "../../utils/firebase";
import itemList from "../../data/itemList.json"

class Board extends React.Component {

    constructor() {
        super()
        this.state = {
            itemList: itemList,
            itemImage: "",
            itemLink: "",
            show: false,
            huntingRequestList: [],
            id: "",
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
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.acceptRequest = this.acceptRequest.bind(this);
        this.itemSent = this.itemSent.bind(this);
        this.payoutSent = this.payoutSent.bind(this);
        this.cancelRequest = this.cancelRequest.bind(this);
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

    cancelRequest(huntingRequestList) {
        // Pass huntingRequestList argument, make reference and update specific object
        // console.log("this is the id of the item closed" + huntingRequestList);
        firebase.database().ref("huntingRequest/" + huntingRequestList).update({
            // update states accordingly and push firebase
            status: "Closed",
            statusColor: "danger"
        });
    };

    handleClose() {
        // Modal close function
        this.setState({
            show: false,
        });
    };

    handleShow(huntingRequestList) {
        // Modal show function
        this.setState({
            id: huntingRequestList.id,
            show: true
        });
    };

    acceptRequest(huntingRequestList) {
        // Pass huntingRequestList argument, make reference and update specific object
        console.log("this is the id of the item accepted" + huntingRequestList);
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
        console.log("this is the id of the item sent" + huntingRequestList);
        firebase.database().ref("huntingRequest/" + huntingRequestList).update({
            // update states accordingly and push firebase
            itemSent: true,
            status: "Items Sent"
        });
    };

    payoutSent(huntingRequestList) {
        // Pass huntingRequestList argument, make reference to specific object
        console.log("this is the id of the payout sent" + huntingRequestList);
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
                        {/* Show the entire arry of huntingRequestList BACKWARDS */
                            this.state.huntingRequestList.slice(0).reverse().map((huntingRequestList, index) => (
                                <Col md={4} key={index} id={huntingRequestList.id}>
                                    <Panel bsStyle={(huntingRequestList.statusColor)}>
                                        <Panel.Heading>
                                            <Panel.Title>
                                                <Row>
                                                    <Col xs={10}>
                                                        <img src={huntingRequestList.itemImage} alt="item thumb" />{" "}{huntingRequestList.item}
                                                    </Col>

                                                    <Col xs={1}>
                                                        {/* if the logged in user owns the quest, has button to cancel quest*/
                                                            huntingRequestList.user === this.props.user && huntingRequestList.status !== "Closed" ?
                                                                <Button
                                                                    bsStyle="danger"
                                                                    bsSize="xsmall"
                                                                    onClick={() => { this.handleShow(huntingRequestList) }}>
                                                                    X
                                                                </Button>
                                                                :
                                                                null
                                                        }
                                                        <Modal show={this.state.show} onHide={this.handleClose}>
                                                            <Modal.Header closeButton>
                                                                <Modal.Title id="contained-modal-title-sm">Cancel Request</Modal.Title>
                                                            </Modal.Header>
                                                            <Modal.Body>
                                                                <Row>
                                                                    <Col xs={12} className="text-center">
                                                                        <div>Confirm cancellation of your request{this.state.id}</div>
                                                                        <br />
                                                                        <div>
                                                                            <Button
                                                                                bsStyle="danger"
                                                                                bsSize="large"
                                                                                onClick={() => {
                                                                                    this.cancelRequest(this.state.id)
                                                                                    this.handleClose()
                                                                                }}>
                                                                                Cancel My Request
                                                                            </Button>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </Modal.Body>
                                                        </Modal>
                                                    </Col>
                                                </Row>
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
                                            {/* if the quest owner cancels the quest */
                                                huntingRequestList.status === "Closed" ?
                                                    <span>Closed</span>
                                                    :
                                                    <div>
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
                                                                            null
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
                                                                                                    null
                                                                                            }
                                                                                        </span>
                                                                                }
                                                                            </span>
                                                                            :
                                                                            null
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
                                                                            null
                                                                    }
                                                                </div>
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
