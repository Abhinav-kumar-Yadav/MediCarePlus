const nodemailer = require("nodemailer");
require("dotenv").config


let transporter = nodemailer.createTransport({
    service : "gmail",
    auth:{
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASS
    }
})

module.exports=transporter;