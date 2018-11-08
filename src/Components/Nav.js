import React from 'react';
import './Nav.css';
import { Navbar, Button } from "react-bootstrap";

const Nav = (props) => (
    <Navbar>
        <Navbar.Header>
            <Navbar.Brand >
                <a href="#home">Cooldowns</a>
            </Navbar.Brand>
            <Button bsStyle="primary">Primary</Button>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse >
            <Navbar.Text pullRight>
                Signed in as: {props.user ? 
                <img src={props.user.photoURL} alt="Your Profile" />
                :
                <Navbar.Text>POOP YOU AIN'T</Navbar.Text>}
            </Navbar.Text>
            <Navbar.Text pullRight>Display something for user</Navbar.Text>
        </Navbar.Collapse>
    </Navbar>
)

export default Nav