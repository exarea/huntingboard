import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import firebase from "../../utils/firebase";

class Verify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resendVerificationEmail: false
        }
        this.resend = this.resend.bind(this);
    };

    resend() {
        firebase.auth().currentUser.sendEmailVerification().then(function () {
            console.log("Verification Email Resent");
        }, function (error) {
            console.log(error);
        });
        this.setState({
            resendVerificationEmail: true
        });
    };

    render() {
        return (
            <div>
                {
                    this.state.resendVerificationEmail === true ?
                        <div>
                            <h3>Verification Email Resent</h3>
                        </div>
                        :
                        <div>
                            <h3>Please verify your email.</h3>
                            <Button bsStyle="warning" onClick={this.resend}>Resend Verification</Button>
                        </div>
                }
            </div>
        );
    };
};

export default Verify