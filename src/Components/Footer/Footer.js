import React from 'react';
import './Footer.css';
import { Row, Col } from "react-bootstrap";
import Version from "../Version/Version";

// import {Navbar} from "react-bootstrap";

const Footer = () => (
    // <Navbar sticky="bottom">
    //     <Navbar.Header>
    //         <Navbar.Brand >
    //             SQI Hunting Board
    //         </Navbar.Brand>
    //         <Navbar.Toggle />
    //     </Navbar.Header>
    //     <Navbar.Collapse >
    //         <Navbar.Text>
    //         Footer
    //         </Navbar.Text>
    //     </Navbar.Collapse>
    // </Navbar>

    <div id="footer" className="text-center bg-light">
        <Row>
            <Col xs={4}>
                Test Poops left
            </Col>
            <Col xs={4}>
                © 2014 Mosjoandy
            </Col>
            <Col xs={4}>
                Version 1.0 <span><Version /></span>
            </Col>
        </Row>
    </div>
)

export default Footer