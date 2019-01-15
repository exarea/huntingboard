import React from 'react';
import "./Board.css";
import { Grid, Row, Col, Panel, Button } from "react-bootstrap";
import firebase from "../../utils/firebase";
// import RequestModal from "../../Components/RequestModal/RequestModal"

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
            status: "",
            accepted: false,
            // completed: "",
            // finalized: "",
        };
        this.acceptRequest = this.acceptRequest.bind(this);
        // this.acceptButton = this.acceptButton.bind(this);

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
                    // completed: huntingRequest[info].completed,
                    // finalized: huntingRequest[info].finalized
                });
            };
          console.log(newState)
            this.setState({ huntingRequestList: newState });
            
        });
        
    };

    acceptRequest() {
        console.log(this.props.user)
        firebase.database().ref("huntingRequest/").update({ 
            farmer: this.props.user,
            accepted: true
        });
        console.log(this.state.accepted)
        // acceptButton() 
    };

    // acceptButton() {
    //     console.log()
    // };

    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    {this.state.huntingRequestList.map((huntingRequestList) =>
                        <Col md={5} key={huntingRequestList.id}>
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
                                            <br /><br />
                                            <p>Status: {huntingRequestList.status}</p>
                                        </Col>
                                    </Row>
                                </Panel.Body>
                                <Panel.Footer> 
                                    <Button onClick={this.acceptRequest}>Accept</Button>
                                    <Button>Items Sent</Button>
                                    <Button>Payment Sent</Button>
                                    <Button>something</Button>
                                </Panel.Footer>
                            </Panel>
                        </Col>
                    )}
                </Row>
            </Grid>
        );
    };
};

export default Board
