import React from 'react';
import "./Board.css";
import { Grid, Row, Col, Panel, Button, Modal, PanelGroup, Glyphicon } from "react-bootstrap";
import firebase from "../../utils/firebase";
import axios from "axios";

class Board extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            show1: false,
            show2: false,

            huntingRequestList: [],

            admin: "",
            email: "",
            questUserID: "",
            toggleList: false,
            toggleBoxes: true,
        };
        this.handleShow1 = this.handleShow1.bind(this);
        this.handleClose1 = this.handleClose1.bind(this);

        this.handleShow2 = this.handleShow2.bind(this);
        this.handleClose2 = this.handleClose2.bind(this);

        this.acceptRequest = this.acceptRequest.bind(this);
        this.itemSent = this.itemSent.bind(this);
        this.payoutSent = this.payoutSent.bind(this);
        this.cancelRequest = this.cancelRequest.bind(this);
        this.destroyRequest = this.destroyRequest.bind(this);

        this.toggleList = this.toggleList.bind(this);
        this.toggleBoxes = this.toggleBoxes.bind(this);
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
            for (let data in huntingRequest) {
                newState.push({
                    id: data,
                    date: huntingRequest[data].date,
                    userID: huntingRequest[data].userID,
                    poster: huntingRequest[data].poster,
                    farmer: huntingRequest[data].farmer,
                    payout: huntingRequest[data].payout,
                    item: huntingRequest[data].item,
                    itemImage: huntingRequest[data].itemImage,
                    itemLink: huntingRequest[data].itemLink,
                    quantity: huntingRequest[data].quantity,
                    status: huntingRequest[data].status,
                    accepted: huntingRequest[data].accepted,
                    itemSent: huntingRequest[data].itemSent,
                    payoutSent: huntingRequest[data].payoutSent,
                    statusColor: huntingRequest[data].statusColor
                });
            };
            // console.log(newState)
            // Set new state of huntingRequestList with array of objects
            this.setState({ huntingRequestList: newState });
        });

    };

    componentWillUnmount() {
        // Unmount firebase listener for the huntingRequest
        firebase.database().ref('huntingRequest').off();
    }

    toggleList() {
        this.setState({
            toggleList: true,
            toggleBoxes: false
        });
    };

    toggleBoxes() {
        this.setState({
            toggleList: false,
            toggleBoxes: true
        });
    };

    destroyRequest(huntingRequestList) {
        // console.log("this is the id of the item being DESTROYED" + huntingRequestList);
        firebase.database().ref("huntingRequest/" + huntingRequestList).remove()
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

    handleClose1() {
        // Modal close function
        this.setState({
            show1: false,
        });
    };

    handleShow1(huntingRequestList) {
        // Modal show function
        this.setState({
            id: huntingRequestList.id,
            show1: true
        });
    };

    handleClose2() {
        // Modal close function
        this.setState({
            show2: false,
        });
    };

    handleShow2(huntingRequestList) {
        // Modal show function
        this.setState({
            id: huntingRequestList.id,
            show2: true
        });
    };

    async acceptRequest(huntingRequestList) {
        // Pass huntingRequestList argument, make reference and update specific object
        // console.log("this is the id of the item accepted" + huntingRequestList);
        // firebase.database().ref("huntingRequest/" + huntingRequestList).update({
        //     // update states accordingly and push firebase
        //     farmer: this.props.ign,
        //     accepted: true,
        //     status: "In Progress",
        //     statusColor: "warning"
        // });
        var getuserID = [];
        // var usersAll = [];
        
        firebase.database().ref("huntingRequest/").on("value").then( function (snapshot) {
            getuserID = (snapshot.val())

        }, function(error) {
            return console.log(error);
        });

        console.log("owner of quest: " + getuserID[huntingRequestList].userID);
        // const questOwner = getuserID[huntingRequestList].userID

        // var usersAll = [];
        // firebase.database().ref("users/").on("value", function (snapshot) {
        //     return usersAll = (snapshot.val())
        //     // console.log("firebase user reference: " + snapshot.val().email)
        //     // const questOwnerEmail = snapshot.val().email
        // });
        // console.log(usersAll[questOwner])
        // API Call to backend for email notification
        // const farmer = this.props.ign;
        // const email = questOwnerEmail
        // const acceptance = await axios.post("/api/acceptQuest", { farmer, email })

    };

    itemSent(huntingRequestList) {
        // Pass huntingRequestList argument, make reference to specific object
        // console.log("this is the id of the item sent" + huntingRequestList);
        firebase.database().ref("huntingRequest/" + huntingRequestList).update({
            // update states accordingly and push firebase
            itemSent: true,
            status: "Items Sent"
        });
    };

    payoutSent(huntingRequestList) {
        // Pass huntingRequestList argument, make reference to specific object
        // console.log("this is the id of the payout sent" + huntingRequestList);
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
                        <Panel>
                            <Panel.Heading bsStyle="primary" className="text-right">
                                <Button onClick={this.toggleList}>
                                    <Glyphicon style={{ fontSize: 15 }} glyph="th-list" />
                                </Button>

                                <Button onClick={this.toggleBoxes}>
                                    <Glyphicon style={{ fontSize: 15 }} glyph="th-large" />
                                </Button>

                            </Panel.Heading>
                            <br />
                            <Panel.Body>
                                {this.state.toggleList === true ?
                                    <PanelGroup accordian="true" id="accordian">
                                        {/* Show the entire array of huntingRequestList BACKWARDS */
                                            this.state.huntingRequestList.slice(0).reverse().map((huntingRequestList, index) => (
                                                <Panel
                                                    eventKey={index}
                                                    key={index}
                                                    id={huntingRequestList.id}
                                                    bsStyle={(huntingRequestList.statusColor)}>
                                                    <Panel.Heading>
                                                        <Panel.Title toggle>
                                                            <Row>
                                                                <Col xs={8}>
                                                                    <img src={huntingRequestList.itemImage} alt="item thumb" />{" "}{huntingRequestList.item}
                                                                </Col>
                                                                <Col xs={3} className="text-right">
                                                                    {huntingRequestList.payout}
                                                                </Col>
                                                                <Col xs={1}>
                                                                    {/* if the logged in user owns the quest, has button to cancel quest*/
                                                                        huntingRequestList.userID === this.props.userID && huntingRequestList.status !== "Closed" ?
                                                                            <Button
                                                                                className="text-right"
                                                                                bsStyle="danger"
                                                                                bsSize="xsmall"
                                                                                onClick={() => { this.handleShow1(huntingRequestList) }}>
                                                                                {" "}X{" "}
                                                                            </Button>
                                                                            :
                                                                            null
                                                                    }
                                                                    <Modal show={this.state.show1} onHide={this.handleClose1}>
                                                                        <Modal.Header closeButton>
                                                                            <Modal.Title id="contained-modal-title-sm">Cancel Request</Modal.Title>
                                                                        </Modal.Header>
                                                                        <Modal.Body>
                                                                            <Row>
                                                                                <Col xs={12} className="text-center">
                                                                                    <div>Confirm cancellation of your request</div>
                                                                                    <br />
                                                                                    <div>
                                                                                        <Button
                                                                                            bsStyle="danger"
                                                                                            bsSize="large"
                                                                                            onClick={() => {
                                                                                                this.cancelRequest(this.state.id)
                                                                                                this.handleClose1()
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
                                                    <Panel.Body collapsible={true}>
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
                                                                    <a href={huntingRequestList.itemLink} target="_blank" rel="noopener noreferrer">{huntingRequestList.item}</a>
                                                                </p>
                                                                <p>Quantity: <b>{huntingRequestList.quantity}</b></p>
                                                                <p>Payout: <b>{huntingRequestList.payout}</b></p>
                                                            </Col>
                                                        </Row>
                                                        {/* Begin button display area  */}
                                                        <Panel.Footer className="text-center">
                                                            {/* if the quest owner cancels the quest */
                                                                huntingRequestList.status === "Closed" ?
                                                                    <div>
                                                                        {
                                                                            this.props.admin === true ?
                                                                                <Button
                                                                                    onClick={() => { this.destroyRequest(huntingRequestList.id) }}
                                                                                    bsStyle="danger">
                                                                                    Destroy</Button>
                                                                                :
                                                                                <span>Closed</span>
                                                                        }
                                                                    </div>
                                                                    :
                                                                    <div>
                                                                        {/* if the quest is incomplete, show all the other buttons */
                                                                            huntingRequestList.status === "Complete" ?
                                                                                <div>
                                                                                    {
                                                                                        this.props.admin === true ?
                                                                                            <Button
                                                                                                onClick={() => { this.destroyRequest(huntingRequestList.id) }}
                                                                                                bsStyle="danger">
                                                                                                Destroy</Button>
                                                                                            :
                                                                                            <span>Completed</span>
                                                                                    }
                                                                                </div>
                                                                                :
                                                                                <div>
                                                                                    {/* if the logged in user owns the quest, show send-payment button */
                                                                                        huntingRequestList.userID === this.props.userID ?
                                                                                            <div>
                                                                                                {/* if the logged in user owns the quest AND itemSent status is false, show send payment button*/
                                                                                                    huntingRequestList.userID === this.props.userID && huntingRequestList.itemSent === true ?

                                                                                                        <Button onClick={() => this.payoutSent(huntingRequestList.id)}>Send Payment</Button>
                                                                                                        :
                                                                                                        <Button disabled>Send Payment</Button>}
                                                                                            </div>
                                                                                            :
                                                                                            null
                                                                                    }


                                                                                    {/* if the logged in user is NOT quest ownwer, show accept button */
                                                                                        huntingRequestList.userID !== this.props.userID ?
                                                                                            <span>
                                                                                                {/* if the quest has not been accepted, show accept quest button */
                                                                                                    huntingRequestList.accepted === false ?
                                                                                                        <div>
                                                                                                            <Modal show={this.state.show2} onHide={this.handleClose2}>
                                                                                                                <Modal.Header closeButton>
                                                                                                                    <Modal.Title id="contained-modal-title-sm">Accept Request</Modal.Title>
                                                                                                                </Modal.Header>
                                                                                                                <Modal.Body>
                                                                                                                    <Row>
                                                                                                                        <Col xs={12} className="text-center">
                                                                                                                            <div>Confirm accepting of this request</div>
                                                                                                                            <br />
                                                                                                                            <div>
                                                                                                                                <Button
                                                                                                                                    bsStyle="success"
                                                                                                                                    bsSize="large"
                                                                                                                                    onClick={() => {
                                                                                                                                        this.acceptRequest(this.state.id)
                                                                                                                                        this.handleClose2()
                                                                                                                                    }}>
                                                                                                                                    Accept this quest
                                                                                                                        </Button>
                                                                                                                            </div>
                                                                                                                        </Col>
                                                                                                                    </Row>
                                                                                                                </Modal.Body>
                                                                                                            </Modal>
                                                                                                            <Button onClick={() => { this.handleShow2(huntingRequestList) }}>Accept</Button>
                                                                                                            {/* <Button onClick={() => this.acceptRequest(huntingRequestList.id)}>Accept</Button> */}
                                                                                                        </div>
                                                                                                        :
                                                                                                        <span>
                                                                                                            {/* if the logged in user is the farmer, show that they have accepted the quest */
                                                                                                                huntingRequestList.farmer === this.props.userID ?
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
                                                                                        huntingRequestList.farmer === this.props.ign && huntingRequestList.accepted === true && huntingRequestList.itemSent === false ?
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
                                                    </Panel.Body>
                                                </Panel>
                                            ))}
                                    </PanelGroup>
                                    :
                                    null
                                }

                                {this.state.toggleBoxes === true ?
                                    <div>
                                        {/* Show the entire arry of huntingRequestList BACKWARDS */
                                            this.state.huntingRequestList.slice(0).reverse().map((huntingRequestList, index) => (
                                                <Col md={4} key={index} id={huntingRequestList.id}>
                                                    <Panel bsStyle={(huntingRequestList.statusColor)}>
                                                        <Panel.Heading style={{ height: 75 }}>
                                                            <Panel.Title >
                                                                <Row>
                                                                    <Col xs={10}>
                                                                        <img src={huntingRequestList.itemImage} alt="item thumb" />{" "}{huntingRequestList.item}
                                                                    </Col>

                                                                    <Col xs={1}>
                                                                        {/* if the logged in user owns the quest, has button to cancel quest*/
                                                                            huntingRequestList.userID === this.props.userID && huntingRequestList.status !== "Closed" ?
                                                                                <Button
                                                                                    bsStyle="danger"
                                                                                    bsSize="xsmall"
                                                                                    onClick={() => { this.handleShow1(huntingRequestList) }}>
                                                                                    {" "}X{" "}
                                                                                </Button>
                                                                                :
                                                                                null
                                                                        }
                                                                        <Modal show={this.state.show1} onHide={this.handleClose1}>
                                                                            <Modal.Header closeButton>
                                                                                <Modal.Title id="contained-modal-title-sm">Cancel Request</Modal.Title>
                                                                            </Modal.Header>
                                                                            <Modal.Body>
                                                                                <Row>
                                                                                    <Col xs={12} className="text-center">
                                                                                        <div>Confirm cancellation of your request</div>
                                                                                        <br />
                                                                                        <div>
                                                                                            <Button
                                                                                                bsStyle="danger"
                                                                                                bsSize="large"
                                                                                                onClick={() => {
                                                                                                    this.cancelRequest(this.state.id)
                                                                                                    this.handleClose1()
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
                                                                        <a href={huntingRequestList.itemLink} target="_blank" rel="noopener noreferrer">{huntingRequestList.item}</a>
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
                                                                    <div>
                                                                        {
                                                                            this.props.admin === true ?
                                                                                <Button
                                                                                    onClick={() => { this.destroyRequest(huntingRequestList.id) }}
                                                                                    bsStyle="danger">
                                                                                    Destroy</Button>
                                                                                :
                                                                                <span>Closed</span>
                                                                        }
                                                                    </div>
                                                                    :
                                                                    <div>
                                                                        {/* if the quest is incomplete, show all the other buttons */
                                                                            huntingRequestList.status === "Complete" ?
                                                                                <div>
                                                                                    {
                                                                                        this.props.admin === true ?
                                                                                            <Button
                                                                                                onClick={() => { this.destroyRequest(huntingRequestList.id) }}
                                                                                                bsStyle="danger">
                                                                                                Destroy</Button>
                                                                                            :
                                                                                            <span>Completed</span>
                                                                                    }
                                                                                </div>
                                                                                :
                                                                                <div>
                                                                                    {/* if the logged in user owns the quest, show send-payment button */
                                                                                        huntingRequestList.userID === this.props.userID ?
                                                                                            <div>
                                                                                                {/* if the logged in user owns the quest AND itemSent status is false, show send payment button*/
                                                                                                    huntingRequestList.userID === this.props.userID && huntingRequestList.itemSent === true ?

                                                                                                        <Button onClick={() => this.payoutSent(huntingRequestList.id)}>Send Payment</Button>
                                                                                                        :
                                                                                                        <Button disabled>Send Payment</Button>}
                                                                                            </div>
                                                                                            :
                                                                                            null
                                                                                    }


                                                                                    {/* if the logged in user is NOT quest ownwer, show accept button */
                                                                                        huntingRequestList.userID !== this.props.userID ?
                                                                                            <span>
                                                                                                {/* if the quest has not been accepted, show accept quest button */
                                                                                                    huntingRequestList.accepted === false ?
                                                                                                        <div>
                                                                                                            <Modal show={this.state.show2} onHide={this.handleClose2}>
                                                                                                                <Modal.Header closeButton>
                                                                                                                    <Modal.Title id="contained-modal-title-sm">Accept Request</Modal.Title>
                                                                                                                </Modal.Header>
                                                                                                                <Modal.Body>
                                                                                                                    <Row>
                                                                                                                        <Col xs={12} className="text-center">
                                                                                                                            <div>Confirm accepting of this request</div>
                                                                                                                            <br />
                                                                                                                            <div>
                                                                                                                                <Button
                                                                                                                                    bsStyle="success"
                                                                                                                                    bsSize="large"
                                                                                                                                    onClick={() => {
                                                                                                                                        this.acceptRequest(this.state.id)
                                                                                                                                        this.handleClose2()
                                                                                                                                    }}>
                                                                                                                                    Accept this quest
                                                                                                                        </Button>
                                                                                                                            </div>
                                                                                                                        </Col>
                                                                                                                    </Row>
                                                                                                                </Modal.Body>
                                                                                                            </Modal>
                                                                                                            <Button onClick={() => { this.handleShow2(huntingRequestList) }}>Accept</Button>
                                                                                                            {/* <Button onClick={() => this.acceptRequest(huntingRequestList.id)}>Accept</Button> */}
                                                                                                        </div>
                                                                                                        :
                                                                                                        <span>
                                                                                                            {/* if the logged in user is the farmer, show that they have accepted the quest */
                                                                                                                huntingRequestList.farmer === this.props.ign ?
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
                                                                                        huntingRequestList.farmer === this.props.ign && huntingRequestList.accepted === true && huntingRequestList.itemSent === false ?
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
                                            ))
                                        }
                                    </div>
                                    :
                                    null
                                }
                            </Panel.Body>
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        );
    };
};

export default Board

