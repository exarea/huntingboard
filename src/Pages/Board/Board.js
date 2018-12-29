import React from 'react';
import "./Board.css";
import { Grid, Row, Col } from "react-bootstrap";

class Board extends React.Component {
    render() {
        return (
            <Grid>
                <Row className="show-grid" bsClass="text-center">
                    <Col xs={12} center>
                        <p>poop centered</p>
                    </Col>
                </Row>
            </Grid>
        )
    }

}

export default Board
