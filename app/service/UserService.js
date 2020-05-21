var mysqlConn = require('../db/mysqlconn');
var {UserRepository} = require("../repository/UserRepository");

var UserService = function () {
    this.userRepository = new UserRepository();
    console.log(this.userRepository);
};

UserService.prototype.loginUser = function (userData) {
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
    var result = this.userRepository.findBy('user',connection, cols);

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

UserService.prototype.registerUser = function (userData)  {
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

    var result = this.userRepository.insert('user',connection, cols);

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

UserService.prototype.getAllUsers = function () {
    var connection = mysqlConn.pool();

    var result = this.userRepository.findAll('user',connection);
    if (result === null) {
        return {
            code: 40004     // code to user not found
        }
    }else{
        return result;
    }

};

UserService.prototype.updateUser = function (userData,userId) {
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

    var updateResult = this.userRepository.update('user',connection, cols, updateConds);

    if (updateResult === null) {
        return updateResult;
    } else {
        return {
            code: 40005     //  code for user update fail
        }
    }
};
UserService.prototype.deleteUser = function (userId) {
    var connection = mysqlConn.pool();

    var updateConds = [{
        name: 'id',
        value: userId,
        isStringData: false,
        condition: '='
    }];

    var updateResult = this.userRepository.delete('user',connection, updateConds);

    if (updateResult === null) {
        return updateResult;
    } else {
        return {
            code: 40005     //  code for user update fail
        }
    }
};

exports.UserService = UserService;
