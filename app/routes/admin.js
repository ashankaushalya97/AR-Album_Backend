
var express = require('express');
var {AdminService} = require("../service/AdminService");
var router = express.Router();

/* GET users listing. */
router.post('', (req, res) => {
    var adminService = new AdminService();
    var userData = req.body;

    console.log("REQ DATA :::::::::::::::::::::: "+userData);
    var result = adminService.registerUser(userData);
    res.send(result);

});

router.post('/login', (req, res) => {
    var adminService = new AdminService();
    var userData = req.body;

    var result = adminService.loginAdmin(userData);
    res.status(200);
    res.send(result);

});


router.get('',(req,res) => {
        var adminService = new AdminService();

        var result = adminService.getAllUsers();
        res.status(200);
        res.send(result);
        res.send("result");
    }
);

router.put('/:id',(req,res) => {
    var adminService = new AdminService();
    var userData = req.body;

    console.log("REQ PARAM :::::::::::::::: ",req.params.id);
    var result = adminService.updateUser(userData,req.params.id);
    res.status(204);
    res.send(result);

});

router.delete('/:id',(req,res) => {
    var adminService = new AdminService();

    console.log("REQ PARAM :::::::::::::::: ",req.params.id);
    var result = adminService.deleteUser(req.params.id);
    res.status(204);
    res.send(result);

});

module.exports = router;



