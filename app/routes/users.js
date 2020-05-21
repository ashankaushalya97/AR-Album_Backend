
var express = require('express');
var {UserService} = require("../service/UserService");
var router = express.Router();

/* GET users listing. */
router.post('', (req, res) => {
  var userService = new UserService();
  var userData = req.body;

  var result = userService.registerUser(userData);
  res.send(result);

});

router.post('/login', (req, res) => {
  var userService = new UserService();
  var userData = req.body;

  var result = userService.loginUser(userData);
  res.status(201);
  res.send(result);

});


router.get('',(req,res) => {
      var userService = new UserService();

      var result = userService.getAllUsers();
      res.status(200);
      res.send(result);
}
);

router.put('/:id',(req,res) => {
  var userService = new UserService();
  var userData = req.body;

  console.log("REQ PARAM :::::::::::::::: ",req.params.id);
  var result = userService.updateUser(userData,req.params.id);
  res.status(204);
  res.send(result);

});

router.delete('/:id',(req,res) => {
  var userService = new UserService();

  console.log("REQ PARAM :::::::::::::::: ",req.params.id);
  var result = userService.deleteUser(req.params.id);
  res.status(204);
  res.send(result);

});

module.exports = router;



