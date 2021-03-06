import React from "react";
import { Grid, Col, Row, Jumbotron, Button } from "react-bootstrap";

const NoMatch = () => (
    <Grid>
        <Row>
            <Col xs={12}>
                <div style={{ marginBottom: 100 }} />
                <Jumbotron className="text-center">
                    <h3>Got lost in the Hidden Temple</h3>
                    <h1>404 Page Not Found</h1>
                    <br/>
                    <a href="/"><Button bsStyle="danger"><img src="https://panel.talonro.com/images/items/small/12324.gif" alt="wing" />Butterfly Wing</Button></a>
                </Jumbotron>
            </Col>
        </Row>
    </Grid>
);

export default NoMatch;