import React from 'react';
import './Nav.css';
import { Navbar } from "react-bootstrap";

const Nav = (props) => (
    // <Navbar>
    //     <Navbar.Header>
    //         <Navbar.Brand >
    //             <a href="#home">SQI Hunting Board</a>
    //         </Navbar.Brand>
    //         <Button bsStyle="primary">Primary</Button>
    //         <Navbar.Toggle />
    //     </Navbar.Header>
    //     <Navbar.Collapse >
    //         <Navbar.Text pullRight>
    //             Signed in as: {props.user ? 
    //             <img src={props.user.photoURL} alt="Your Profile" />
    //             :
    //             <Navbar.Text>Please Login</Navbar.Text>}
    //         </Navbar.Text>
    //     </Navbar.Collapse>
    // </Navbar>
    <Navbar>
        <Navbar.Header>
            <Navbar.Brand >
                <a href="#home">SQI Hunting Board</a>
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse >
            <Navbar.Text pullRight>
                {props.children}                
            </Navbar.Text>
        </Navbar.Collapse>
    </Navbar>
)

export default Nav