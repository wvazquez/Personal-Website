var express = require('express');
var router = express.Router();
const config = require('../config');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {nav: config.nav});
});

module.exports = router;
