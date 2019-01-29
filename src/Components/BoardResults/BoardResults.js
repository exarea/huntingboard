import React from 'react';
import "./Board.css";
import { Grid, Row, Col, Panel, Button, Modal, PanelGroup } from "react-bootstrap";
import firebase from "../../utils/firebase";
import itemList from "../../data/itemList.json"

<PanelGroup accordian="true" id="accordian">
    {/* Show the entire arry of huntingRequestList BACKWARDS */
        this.state.huntingRequestList.slice(0).reverse().map((huntingRequestList, index) => (
            <Panel eventKey={index} key={index} id={huntingRequestList.id} bsStyle={(huntingRequestList.statusColor)}>
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
                                    huntingRequestList.user === this.props.user && huntingRequestList.status !== "Closed" ?
                                        <Button
                                            className="text-right"
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
                                                <div>Confirm cancellation of your request</div>
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
                                <a href={huntingRequestList.itemLink}>{huntingRequestList.item}</a>
                            </p>
                            <p>Quantity: <b>{huntingRequestList.quantity}</b></p>
                            <p>Payout: <b>{huntingRequestList.payout}</b></p>
                        </Col>
                    </Row>
                    {/* Begin button display area  */}
                    <Panel.Footer className="text-center">
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
                </Panel.Body>


            </Panel>
        ))}
</PanelGroup>