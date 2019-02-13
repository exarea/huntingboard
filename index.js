const express = require("express");
const bodyparser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express()

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.post("/api/form", (req, res) => {
    nodemailer.createTestAccount((error, account) => {
        const htmlEmail = 
            `
                <div>
                    <h3>Mosjoandy's SQI Hunting Board Notification</h3>
                    <p>Your quest has been accepted by ${req.body.farmer}.</p>
                    <p>When the quest is marked completed, the user will send zeny to your specified in-game name during registration.</p>
                    <p>Thank you for using Mosjoandy's SQI Hunting Board!"</p>
                    <br/>
                    <p>Sincerely,</p>
                    <h3>Mosjoandy</p>
                </div>
            `;

        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            auth: {
                user: "u6f2vix2lrevxqvh@ethereal.email",
                pass: "bMR6mrXjDXBsAK7zqX"
            }
        });

        let mailOptions = {
            from: "noreply@mosjoandy.com",
            to: "u6f2vix2lrevxqvh@ethereal.email",
            replyTo: "noreply@mosjoandy.com",
            subject: "TalonRO SQI Hunting Quest Acceptance",
            text: "Your SQI Hunting Quest has been accepted by " + req.body.farmer + ".",
            html: htmlEmail
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error)
            };
            console.log("Message sent: %s", info.message)
            console.log("Message URL: %s", nodemailer.getTestMessageUrl(info)
            );

        });
    });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log("Server listening on Port" + PORT)
});