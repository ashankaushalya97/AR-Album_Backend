var mysqlConn = require('../db/mysqlconn');
var {UserRepository} = require("../repository/UserRepository");

var UserService = function () {
    this.userRepository = new UserRepository();
    console.log(this.userRepository);
};

UserService.prototype.loginUser = function (userData) {
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
        this.userRepository.findBy('user',connection, cols).then(result => {
            if (result !== null) {

                result.password = null;
                if (result.status === 1) {
                    resolve(result);
                } else {
                    resolve({
                        code: '40001' // code for user have no access to the system
                    })
                }
            } else {

                resolve({
                    code: '40002' // code for username or password invalid
                })
            }
        });
    })
};

UserService.prototype.registerUser = function (userData)  {
    return new Promise((resolve, reject) => {
        var connection = mysqlConn.pool();

        var cols = [{
            name: 'username',
            value: userData.username,
            isStringData: true
        }, {
            name: 'password',
            value: userData.password,
            isStringData: true
        }];
        console.log(this);

        this.userRepository.insert('user',connection, cols).then(result => {
            if (result !== null) {

                if (result.password) {
                    result.password = null;
                }
                resolve(result);
            } else {

                resolve({
                    code: 40003     // code for error with user registration
                })
            }
        });


    })
};

UserService.prototype.getAllUsers = function () {
    return new Promise((resolve, reject) => {
        var connection = mysqlConn.pool();

        this.userRepository.findAll('user',connection).then(result => {
            if (result === null) {
                resolve({
                    code: 40004     // code to user not found
                })
            }else{
                resolve(result);
            }
        });

    })
};

UserService.prototype.updateUser = function (userData,userId) {
    return new Promise((resolve, reject) => {
        var connection = mysqlConn.pool();

        var cols = [{
            name: 'username',
            value: userData.username,
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

        this.userRepository.update('user',connection, cols, updateConds).then(updateResult => {
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
UserService.prototype.deleteUser = function (userId) {
    return new Promise((resolve, reject) => {
        var connection = mysqlConn.pool();

        var updateConds = [{
            name: 'id',
            value: userId,
            isStringData: false,
            condition: '='
        }];

        this.userRepository.delete('user',connection, updateConds).then(updateResult => {
            if (updateResult === null) {
                return updateResult;
            } else {
                return {
                    code: 40005     //  code for user update fail
                }
            }
        });

    })
};

exports.UserService = UserService;
