var express = require('express');
var router = express.Router();
const config = require('../config');
const nodemailer = require('nodemailer');
require('dotenv').config({});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
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

router.post('/sendemail', function(req,res){
  console.log(req.body);
  // res.json(req.body);
  


  //grab data attributes
  //create connection with nodemailer,
  //send mail
  //return success or fail message to front end.

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
    subject: 'Some Subject',
    text: "hey buddy!"
};

transporter.sendMail(mailOptions, function (error) {
    if (error) {
        console.log(error);
        res.send(error);

    } else {
        res.send('good');
    }
});
});


module.exports = router;
