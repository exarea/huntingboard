import React from "react";
import firebase from "../../utils/firebase";
import {Button} from "react-bootstrap";

const logOut = () => {
    firebase.auth().signOut();
    console.log("you've logged out")
};

const LogOut = () => {
    return <Button onClick={logOut} children="Log Out" />;
};

export default LogOut;