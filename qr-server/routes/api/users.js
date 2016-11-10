var express = require('express');
var router = express.Router();
var dbService = require('../../services/firebase/dbService');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var testData = dbService.createUser();
  var data = guid();
  res.send({
    guid : data,
    test: testData
  });
});

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}



//router.post('/')

module.exports = router;
