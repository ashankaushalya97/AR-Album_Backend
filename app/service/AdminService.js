var mysqlConn = require('../db/mysqlconn');
var {AdminRepository} = require("../repository/AdminRepository");

var AdminService = function () {
    this.adminRepository = new AdminRepository();
    // console.log(this.adminRepository);
};

AdminService.prototype.loginAdmin = function (userData) {
    var connection = mysqlConn.pool();
    var cols = [{
        name: 'username',
        condition: '=',
        value: userData.username,
        isStringData: true,
        nextCond: 'AND'
    }, {
        name: 'password',
        condition: '=',
        value: userData.password,
        isStringData: true
    }];
    var result = this.adminRepository.findBy('admin',connection, cols);
    console.log("RESULT :::::::::::::::::::::::::::::: ",result);
    if (result !== null) {
            
        result.password = null;
        if (result.status === 1) {
            return result;
        } else {
            return {
                code: '40001' // code for user have no access to the system
            }
        }
    } else {

        return {
            code: '40002' // code for username or password invalid
        }
    }
};

AdminService.prototype.registerUser = function (userData)  {
    var connection = mysqlConn.pool();

    var cols = [{
        name: 'username',
        value: userData.username,
        isStringData: true
    }, {
        name: 'email',
        value: userData.email,
        isStringData: true
    },{
        name: 'password',
        value: userData.password,
        isStringData: true
    }];
    console.log(this);

    var result = this.adminRepository.insert('admin',connection, cols);

    if (result !== null) {

        if (result.password) {
            result.password = null;
        }
        return result;
    } else {

        return {
            code: 40003     // code for error with user registration
        }
    }

};

AdminService.prototype.updateUser = function (userData,userId) {
    var connection = mysqlConn.pool();

    var cols = [{
        name: 'username',
        value: userData.username,
        isStringData: true
    }, {
        name: 'email',
        value: userData.email,
        isStringData: true
    },{
        name: 'password',
        value: userData.password,
        isStringData: true
    }];

    var updateConds = [{
        name: 'id',
        value: userId,
        isStringData: false,
        condition: '='
    }];

    var updateResult = this.userRepository.update('admin',connection, cols, updateConds);

    if (updateResult === null) {
        return updateResult;
    } else {
        return {
            code: 40005     //  code for user update fail
        }
    }
};
AdminService.prototype.deleteUser = function (userId) {
    var connection = mysqlConn.pool();

    var updateConds = [{
        name: 'id',
        value: userId,
        isStringData: false,
        condition: '='
    }];

    var updateResult = this.userRepository.delete('admin',connection, updateConds);

    if (updateResult === null) {
        return updateResult;
    } else {
        return {
            code: 40005     //  code for user update fail
        }
    }
};

exports.AdminService = AdminService;
