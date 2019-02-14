const express = require("express");
const bodyparser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express()

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.post("/api/acceptQuest", (req, res) => {
    const questOwnerEmail = req.body.email
    const htmlEmail =
        `
            <div>
                <h2>Mosjoandy's SQI Hunting Board Notification</h2>
                <p>Your quest has been accepted by </p>
                <h3>${req.body.farmer}</h3>
                <p>When the quest is marked completed, the user will send zeny to your specified in-game name during registration.</p>
                <p>Thank you for using Mosjoandy's SQI Hunting Board!"</p>
                <br/>
                <p>Sincerely,</p>
                <h3>Mosjoandy</p>
            </div>
        `;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        // host: "smtp.ethereal.email",
        // port: 587,
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

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log("Server listening on Port" + PORT)
});