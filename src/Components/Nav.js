import React from 'react';
import './Nav.css';
import { Navbar, Button } from "react-bootstrap";

const Nav = (props) => (
    <Navbar>
        <Navbar.Header>
            <Navbar.Brand >
                SQI Hunting Board
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse >
            <Navbar.Text pullRight>
                <Button style={{ marginRight: 5 }} href="/Help" target="_blank" >Help</Button>
                {props.children}
            </Navbar.Text>
        </Navbar.Collapse>
    </Navbar>
)

export default Nav