var mysqlConn = require('../db/mysqlconn');
var {AdminRepository} = require("../repository/AdminRepository");

var AdminService = function () {
    this.adminRepository = new AdminRepository();
    // console.log(this.adminRepository);
};

AdminService.prototype.loginAdmin = function (userData) {
    return new Promise((resolve, reject) => {
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
        this.adminRepository.findBy('testingHi', connection, cols).then(result => {
            console.log("RESULT :::::::::::::::::::::::::::::: ", result);
            if (result !== null) {
                if (result) {
                    resolve({
                        username: result[0].username,
                        email: result[0].email,
                        id: result[0].id
                    });
                } else {
                    resolve({
                        code: '40001' // code for user have no access to the system
                    })
                }
            } else {

                resolve( {
                    code: '40002' // code for username or password invalid
                })
            }
        });
    })
};

AdminService.prototype.registerUser = function (userData) {
    return new Promise((resolve, reject) => {
        var connection = mysqlConn.pool();

        var cols = [{
            name: 'username',
            value: userData.username,
            isStringData: true
        }, {
            name: 'email',
            value: userData.email,
            isStringData: true
        }, {
            name: 'password',
            value: userData.password,
            isStringData: true
        }];
        console.log(this);

        this.adminRepository.insert('admin', connection, cols).then(result => {
            if (result !== null) {

                if (result.password) {
                    result.password = null;
                }
                resolve(result);
            } else {

                resolve ({
                    code: 40003     // code for error with user registration
                })
            }
        });
    })

};

AdminService.prototype.updateUser = function (userData, userId) {
    return new Promise((resolve, reject) => {
        var connection = mysqlConn.pool();

        var cols = [{
            name: 'username',
            value: userData.username,
            isStringData: true
        }, {
            name: 'email',
            value: userData.email,
            isStringData: true
        }, {
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

        this.userRepository.update('admin', connection, cols, updateConds).then(updateResult => {
            if (updateResult === null) {
                resolve (updateResult);
            } else {
                resolve ({
                    code: 40005     //  code for user update fail
                })
            }
        });
    })
};
AdminService.prototype.deleteUser = function (userId) {
    return new Promise((resolve, reject) => {
        var connection = mysqlConn.pool();

        var updateConds = [{
            name: 'id',
            value: userId,
            isStringData: false,
            condition: '='
        }];

        this.userRepository.delete('admin', connection, updateConds).then(updateResult => {
            if (updateResult === null) {
                resolve(updateResult);
            } else {
                resolve({
                    code: 40005     //  code for user update fail
                })
            }
        });
    })
};

exports.AdminService = AdminService;
