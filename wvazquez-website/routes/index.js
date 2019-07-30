var express = require('express');
var router = express.Router();
const config = require('../config');

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
})


module.exports = router;
