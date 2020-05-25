
var express = require('express');
var {AdminService} = require("../service/AdminService");
var router = express.Router();

/* GET users listing. */
router.post('', (req, res) => {
    var adminService = new AdminService();
    var userData = req.body;

    console.log("REQ DATA :::::::::::::::::::::: "+userData);
    adminService.registerUser(userData).then(result => {
        res.send(result);
    });

});

router.post('/login', (req, res) => {
    var adminService = new AdminService();
    var userData = req.body;

    adminService.loginAdmin(userData).then(result => {
        res.status(200);
        res.send(result)
    });

});


router.get('',(req,res) => {
        var adminService = new AdminService();

        adminService.getAllUsers().then(result => {
            res.status(200);
            res.send(result);
            res.send("result");
        });
    }
);

router.put('/:id',(req,res) => {
    var adminService = new AdminService();
    var userData = req.body;

    console.log("REQ PARAM :::::::::::::::: ",req.params.id);
    adminService.updateUser(userData,req.params.id).then(result => {
        res.status(204);
        res.send(result);
    });


});

router.delete('/:id',(req,res) => {
    var adminService = new AdminService();

    console.log("REQ PARAM :::::::::::::::: ",req.params.id);
    adminService.deleteUser(req.params.id).then(result => {
        res.status(204);
        res.send(result);
    });


});

module.exports = router;



