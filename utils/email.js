require("dotenv").config()
const nodemailer = require('nodemailer');
const ejs = require('ejs');
// const htmlToText = require('html-to-text');


const sendEmail = async (options)=>{
   
   // let testAccount = await nodemailer.createTestAccount();

   const transporter = nodemailer.createTransport({
   	  service:'Gmail',
   	  auth:{
   	  	user:process.env.REAL_EMAIL,
   	  	pass:process.env.REAL_PASSWORD
   	  }
   })

   const mailOptions = {
   	from: "techhjork@gmail.com",
   	to:options.email,
   	subject:options.subject,
   	text:"<h1>this is clicked</h1>"
   }

   await transporter.sendMail(mailOptions)
  
   // console.log("Message sent: %s", info.messageId);
   // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = sendEmail;
