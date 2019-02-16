import React from 'react';
import './Footer.css';
import { Grid, Row, Col } from "react-bootstrap";
import Version from "../Version/Version";

const Footer = () => (

    <div id="footer" className="text-center bg-light">
        <Grid>
            <Row>
                <Col xs={4}>
                    <div>Community{" "}<a href="https://talonro.com/" target="_blank" rel="noopener noreferrer">TalonRO</a>{" "}Site</div>
        
                    {/* <img src={require("../../data/talonro-logo.png")} alt="talonRO logo"/> */}
                </Col>
                <Col xs={4}>
                    © 2019 Mosjoandy
            </Col>
                <Col xs={4}>
                    <div><Version /></div>
                   
                </Col>
            </Row>
        </Grid>
    </div>
)

export default Footer