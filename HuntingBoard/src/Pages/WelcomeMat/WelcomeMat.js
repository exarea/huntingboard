import React from "react";
import { Grid, Row, Col, Jumbotron, Button } from "react-bootstrap";

const WelcomeMat = () => (
    <Grid>
        <Row>
            <Col xl={12}>
                <Jumbotron className='text-center' style={{ marginTop: 100 }}>
                    <Row>
                        <Col md={4}>
                            <p>
                                SQI Hunting Board
                            </p>
                            <p>
                                <Button
                                    bsStyle="primary"
                                    style={{ paddingTop: 25, paddingBottom: 25 }}
                                    href="/huntingboard">
                                    Mosjoandy's SQI Hunting Board
                                </Button>
                            </p>
                        </Col>
                        <Col md={4}>
                            <p>
                                Official TalonRO Links
                            </p>
                            <p>
                                <Button
                                    href="https://www.talonro.com/"
                                    bsStyle="warning"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    TalonRO Website
                                </Button>
                            </p>
                            <p>
                                <Button
                                    href="https://forum.talonro.com"
                                    bsStyle="warning"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    TalonRO Forum
                                </Button>
                            </p>
                            <p>
                                <Button
                                    href="https://wiki.talonro.com/Main_Page"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    TalonRO Wikipedia
                                </Button>
                            </p>

                        </Col>
                        <Col md={4}>
                            <p>
                                Community TalonRO Links
                            </p>
                            <p>
                                <Button
                                    href="http://tcalc.github.io/gmc/"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    TalonRO GMC/Ragnarok Resource
                                </Button>
                            </p>
                            <p>
                                <Button
                                    href="https://share.talonro.com/ItemCraft/index.html"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    TalonRO Item Crafting Finder Tool
                                </Button>
                            </p>
                            <p>
                                <Button
                                    href="https://calc.talonro.com/"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    TalonRO Calculator
                                </Button>
                            </p>
                        </Col>
                    </Row>

                </Jumbotron>
            </Col>
        </Row>
    </Grid>
);

export default WelcomeMat;