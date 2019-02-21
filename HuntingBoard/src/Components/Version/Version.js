import React from 'react';
import "./Version.css";
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
                <div>
                    <div>Version 2.2 </div>
                    <span className="updateLink" onClick={this.handleShow}>Updates</span>
                </div>
                <Modal show={this.state.show} onHide={this.handleClose} style={{ top: "50%", left: "50%" }}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Current Version: 2.2
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Version 2.2: email disabled</p>
                        <p>Version 2.1: number automatic formatting, async issues resolved</p>
                        <p>Version 2.0: working email notifications, removed accordian option, admin removal feature</p>
                        <p>Version 1.2: Welcome Mat page, community/official links, warning fixes, server backend</p>
                        <p>Version 1.1: Footer implementation, version list, accept button modal</p>
                        <p>Version 1.0: Official release, account registrations open!</p>
                        <p>Version 0.1: Beta release, basic functionality, firebase connections</p>
                    </Modal.Body>
                </Modal>
            </div>
        );
    };
};

export default Version