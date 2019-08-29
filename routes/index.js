var express = require('express');
var router = express.Router();
const config = require('../config');
const nodemailer = require('nodemailer');
const axios = require('axios')
require('dotenv').config({});

/* GET home page. */
router.get('/', function(req,res) {
  res.render('comingsoon');
});
router.get('/home', function(req, res, next) {
  var dev = res.app.get("env") === 'development' ? true: false;
  res.render('index', {
                        development: dev,
                        helpers: {
                          multiply : function(a, b) { return a * b; }
                        },
                        nav: config.nav,
                        skills: config.skills,
                        projects: config.projects  
                      });
});

router.get('/projects/:projectID', (req,res)=>{
    const allprojects = config.projects;
    var project = allprojects.find((project, i) => {
      if(project.folder === req.params.projectID){
        return project;
      };
    });
    res.json(project);
});
router.post('/recaptcha', (req,res)=>{
  const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_KEY}&response=${req.body["g-recaptcha-response"]}`;

  axios.post(verifyURL).then(function(response){
    res.json(response.data);
  });
});
router.post('/sendemail', function(req,res){

  $name = req.body.name;
  $email = req.body.email;
  $message = req.body.message;

  
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
      text: 
      `From: ${$name} Email: ${$email} ,
      ${$message}
      `
  };

  transporter.sendMail(mailOptions, function (error) {
      if (error) {
          res.send(error);

      } else {
          res.send('good');
      }
  });
});


module.exports = router;
