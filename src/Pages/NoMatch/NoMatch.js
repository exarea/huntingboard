import React from "react";
import { Grid, Col, Row, Jumbotron, Button } from "react-bootstrap";

const NoMatch = () => (
    <Grid>
        <Row>
            <Col xs={12}>
                <div style={{ marginBottom: 100 }} />
                <Jumbotron className="text-center">
                    <h3>You seem to be lost...</h3>
                    <h1>404 Page Not Found</h1>
                    <br/>
                    <a href="/"><Button bsStyle="danger"><img src="http://file5.ratemyserver.net/items/small/602.gif" alt="wing" />Butterfly Wing</Button></a>
                </Jumbotron>
            </Col>
        </Row>
    </Grid>
);

export default NoMatch;