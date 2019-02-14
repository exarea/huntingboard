const express = require("express");
const bodyparser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express()

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

//Accept Quest API Email Notification
app.post("/api/acceptQuest", (req, res) => {
    const questOwnerEmail = req.body.email
    const htmlEmail =
        `
            <div>
                <h2>Mosjoandy's SQI Hunting Board Notification</h2>
                <p>Your quest has been accepted by </p>
                <h3>${req.body.farmer}</h3>
                <p>The player will send the items to your specified in-game name.</p>
                <br/>
                <p>Log into the hunting board <a href="http://www.mosjoandy.com/huntingboard" target="_blank" rel="noopener noreferrer">here</a>
                <p>Thank you for using Mosjoandy's SQI Hunting Board!"</p>
                <br/>
                <p>Best,</p>
                <h3>Mosjoandy</p>
            </div>
        `;
    // var mailerUser = process.env.REACT_APP_NODEMAILER_USER;
    // var passUser = process.env.REACT_APP_NODEMAILER_PASSWORD
    // console.log(process.env);

    const transporter = nodemailer.createTransport({
        service: "gmail",

        auth: {
            user: "mosjoandy@gmail.com",
            pass: "Dee1234!"
        }
    });

    const mailOptions = {
        from: "noreply@mosjoandy.com",
        to: questOwnerEmail,
        replyTo: "noreply@mosjoandy.com",
        subject: "TalonRO SQI Hunting Quest Acceptance",
        text: "Your SQI Hunting Quest has been accepted by " + req.body.farmer + ".",
        html: htmlEmail
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error)
        } else {
            console.log("Message sent!")
        };
    });
});

//Items Sent API Email Notification
app.post("/api/sentItems", (req, res) => {
    const questOwnerEmail = req.body.email
    const htmlEmail =
        `
            <div>
                <h2>Mosjoandy's SQI Hunting Board Notification</h2>
                <p>Your quest has completed and items sent by </p>
                <h3>${req.body.farmer}</h3>
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
            user: "mosjoandy@gmail.com",
            pass: "Dee1234!"
        }
    });

    const mailOptions = {
        from: "noreply@mosjoandy.com",
        to: questOwnerEmail,
        replyTo: "noreply@mosjoandy.com",
        subject: "TalonRO SQI Hunting Items Sent",
        text: "Your SQI Hunting Quest items have been sent by " + req.body.farmer + ".",
        html: htmlEmail
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error)
        } else {
            console.log("Message sent!")
        };
    });
});

//Payment Sent API Email Notification
app.post("/api/sentPayment", (req, res) => {
    const questOwnerEmail = req.body.email
    const htmlEmail =
        `
            <div>
                <h2>Mosjoandy's SQI Hunting Board Notification</h2>
                <p>Your payment has arrived from </p>
                <h3>${req.body.payee}</h3>
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
        port: 465,
        auth: {
            user: "mosjoandy@gmail.com",
            pass: "Dee1234!"
        }
    });

    const mailOptions = {
        from: "noreply@mosjoandy.com",
        to: questOwnerEmail,
        replyTo: "noreply@mosjoandy.com",
        subject: "TalonRO SQI Hunting Payment Sent",
        text: "Your payment have been sent by " + req.body.payee + ".",
        html: htmlEmail
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error)
        } else {
            console.log("Message sent!")
        };
    });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log("Server listening on Port" + PORT)
});