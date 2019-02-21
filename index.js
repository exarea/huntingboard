const express = require("express");
const bodyparser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express()
require('dotenv').config()

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

//Accept Quest API Email Notification
app.post("/api/acceptQuest", (req, res) => {
    const htmlEmail =
        `
            <div>
                <h2>Mosjoandy's SQI Hunting Board Notification</h2>
                <p>Your quest has been accepted by </p>
                <h3>${req.body.farmer}</h3>
                <p><strong>Item:</strong> ${req.body.item}</p>
                <p><strong>Quantity:</strong> ${req.body.quantity}</p>
                <br/>
                <p>The player will send the items to your specified in-game name.</p>
                <br/>
                <p>Log into the hunting board <a href="http://www.mosjoandy.com/huntingboard" target="_blank" rel="noopener noreferrer">here</a>
                <p>Thank you for using Mosjoandy's SQI Hunting Board!"</p>
                <br/>
                <p>Best,</p>
                <h3>Mosjoandy</p>
            </div>
        `;
    const transporter = nodemailer.createTransport({
        service: "gmail",

        auth: {
            user: process.env.REACT_APP_NODEMAILER_USER,
            pass: process.env.REACT_APP_NODEMAILER_PASSWORD
        }
    });

    const mailOptions = {
        from: "noreply@mosjoandy.com",
        to: req.body.email,
        replyTo: "noreply@mosjoandy.com",
        subject: "TalonRO SQI Hunting Quest Notification: " + req.body.item,
        text: "Your SQI Hunting Quest has been accepted by " + req.body.farmer + ".",
        html: htmlEmail
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        } else {
            console.log("Message sent!");
        };
    });
});

//Items Sent API Email Notification
app.post("/api/sentItems", (req, res) => {
    const htmlEmail =
        `
            <div>
                <h2>Mosjoandy's SQI Hunting Board Notification</h2>
                <p>Your quest has completed and items sent by </p>
                <h3>${req.body.farmer}</h3>
                <p><strong>Item:</strong> ${req.body.item}</p>
                <p><strong>Quantity:</strong> ${req.body.quantity}</p>
                <br/>
                <p>Please send the agreed zeny payout to ${req.body.farmer}</p>
                <br/>
                <p>Log into the hunting board <a href="http://www.mosjoandy.com/huntingboard" target="_blank" rel="noopener noreferrer">here</a>
                <p>Thank you for using Mosjoandy's SQI Hunting Board!"</p>
                <br/>
                <p>Best,</p>
                <h3>Mosjoandy</p>
            </div>
        `;

    const transporter = nodemailer.createTransport({
        service: "gmail",

        auth: {
            user: process.env.REACT_APP_NODEMAILER_USER,
            pass: process.env.REACT_APP_NODEMAILER_PASSWORD
        }
    });

    const mailOptions = {
        from: "noreply@mosjoandy.com",
        to: req.body.email,
        replyTo: "noreply@mosjoandy.com",
        subject: "TalonRO SQI Hunting Quest Notification: " + req.body.item,
        text: "Your SQI Hunting Quest items have been sent by " + req.body.farmer + ".",
        html: htmlEmail
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        } else {
            console.log("Message sent!");
        };
    });
});

//Payment Sent API Email Notification
app.post("/api/sentPayment", (req, res) => {
    const htmlEmail =
        `
            <div>
                <h2>Mosjoandy's SQI Hunting Board Notification</h2>
                <p>Your payment has arrived from </p>
                <h3>${req.body.payee}</h3>
                <p><strong>Item:</strong> ${req.body.item}</p>
                <p><strong>Quantity:</strong> ${req.body.quantity}</p>
                <br/>
                <p>Log into the hunting board <a href="http://www.mosjoandy.com/huntingboard" target="_blank" rel="noopener noreferrer">here</a>
                <p>Thank you for using Mosjoandy's SQI Hunting Board!"</p>
                <br/>
                <p>Best,</p>
                <h3>Mosjoandy</p>
            </div>
        `;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.REACT_APP_NODEMAILER_USER,
            pass: process.env.REACT_APP_NODEMAILER_PASSWORD
        }
    });

    const mailOptions = {
        from: "noreply@mosjoandy.com",
        to: req.body.email,
        replyTo: "noreply@mosjoandy.com",
        subject: "TalonRO SQI Hunting Quest Notification: " + req.body.item,
        text: "Your payment have been sent by " + req.body.payee + ".",
        html: htmlEmail
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        } else {
            console.log("Message sent!");
        };
    });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log("Server listening on Port" + PORT);
});