import React, { Component } from 'react';
import './Nav.css';
import { Navbar, Button } from "react-bootstrap";

class Nav extends Component {
    render() {
        return (
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
                        Signed in as: <Navbar.Link href="#">User Name Goes here</Navbar.Link>
                    </Navbar.Text>
                    <Navbar.Text pullRight>Display something for user</Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Nav