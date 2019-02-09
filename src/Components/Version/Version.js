import React from 'react';
import { Modal } from "react-bootstrap";

class Version extends React.Component {
    constructor() {
        super()
        this.state = {
            show: false,
        };
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    };

    handleClose() {
        // Modal close function
        this.setState({
            show: false,
        });
    };

    handleShow() {
        // Modal show function
        this.setState({
            show: true
        });
    };

    render() {
        return (
            <div>
                <a id="updateLink" onClick={this.handleShow}>Updates</a>
                <Modal show={this.state.show} onHide={this.handleClose} id="versionModal">
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Current Version: 1.0
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Version 1.0: Official release, account registrations open!</p>
                        <p>Version 0.1: Beta release, basic functionality, firebase connections</p>
                    </Modal.Body>
                </Modal>
            </div>
        );
    };
};
export default Version