var express = require('express');
var router = express.Router();
const config = require('../config');
const sendemail = require('./sendemail');
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

router.use('/sendemail', sendemail)


module.exports = router;
