const express = require("express");
const bodyparser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express()

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.post("/api/form", (req, res) => {
    console.log(req.body);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log("Server listening on Port" + PORT)
});