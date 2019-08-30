const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const axios = require('axios');

router.post('/', function(req,res){
    let dev = res.app.get("env") === 'development' ? true: false;
    $name = req.body.name;
    $email = req.body.email;
    $message = req.body.message;
    $recaptcha = req.body.recaptcha;
  
    const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_KEY}&response=${$recaptcha}`;
  
    axios.post(verifyURL).then(function(response){
      if(response.data.success){
        
        let mailerConfig = {    
          host: process.env.MAILER_HOST,  
          secure: false,
          port: process.env.MAILER_PORT,
          auth: {
              user: process.env.AUTH_USER,
              pass: process.env.AUTH_PASS
          },
          tls:{
            rejectUnauthorized: false
          }
        };
        let transporter = nodemailer.createTransport(mailerConfig);
      
        let mailOptions = {
            from: mailerConfig.auth.user,
            to: process.env.MAILER_TO,
            subject: `${mailerConfig.auth.user} new e-mail`,
            text: `From: ${$name} \nEmail: ${$email} \nMessage: \n\n${$message}\n`
        };
      
        transporter.sendMail(mailOptions, function (error) {
            if (error) {
                res.send(error);
            } else {
                res.send('good');
            }
        });
      }else{
          res.send("error");
      }
    });
    
  });

  module.exports = router;