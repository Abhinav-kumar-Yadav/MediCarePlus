const express = require("express");
const router = express.Router();
const transporter = require("../utils/mailer.js");
const path = require("path");

router.post("/sendMessage",(req,res)=>{
    
    // const {emai} = req.body;
    console.log(req.body.email);
    transporter.sendMail({
        from:  `"Website Contact Form" <${process.env.ADMIN_EMAIL}>`,
        to: process.env.ADMIN_EMAIL,
        subject: req.body.subject,
        text: req.body.message,
        replyTo:req.body.email
    },
(err, info) => {
      if (err) {
        console.error("Error while sending mail:", err);
        return res.status(500).send("Failed to send message");
      }
      console.log("Message sent:", info.response);
      res.send("Message sent successfully!");
    });
    console.log("message sended");
})

module.exports=router;