
var express = require('express');
var {UserService} = require("../service/UserService");
var router = express.Router();

/* GET users listing. */
router.post('', (req, res) => {
  var userService = new UserService();
  var userData = req.body;

  userService.registerUser(userData).then(result => {
    res.send(result);
  });

});

router.post('/login', (req, res) => {
  var userService = new UserService();
  var userData = req.body;

  userService.loginUser(userData).then(result => {
    res.status(201);
    res.send(result);
  });

});


router.get('',(req,res) => {
      var userService = new UserService();

      userService.getAllUsers().then(result => {
        res.status(200);
        res.send(result)
      });

}
);

router.put('/:id',(req,res) => {
  var userService = new UserService();
  var userData = req.body;

  console.log("REQ PARAM :::::::::::::::: ",req.params.id);
  userService.updateUser(userData,req.params.id).then(result => {
    res.status(204);
    res.send(result);
  });

});

router.delete('/:id',(req,res) => {
  var userService = new UserService();

  console.log("REQ PARAM :::::::::::::::: ",req.params.id);
  userService.deleteUser(req.params.id).then(result => {
    res.status(204);
    res.send(result);
  });

});

module.exports = router;



