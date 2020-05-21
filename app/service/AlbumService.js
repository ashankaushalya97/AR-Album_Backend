var mysqlConn = require('../db/mysqlconn');
var {AlbumRepository} = require("../repository/AlbumRepository");

var AlbumService = function () {
    this.albumRepository = new AlbumRepository();
    console.log(this.albumRepository);
};

AlbumService.prototype.registerAlbum = function (userData)  {
    var connection = mysqlConn.pool();

    var cols = [{
        name: 'album_name',
        value: userData.username,
        isStringData: true
    }];
    console.log(this);

    var result = this.userRepository.insert('album',connection, cols);

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

AlbumService.prototype.getAllAlbums = function () {
    var connection = mysqlConn.pool();

    var result = this.userRepository.findAll('album',connection);
    if (result === null) {
        return {
            code: 40004     // code to user not found
        }
    }else{
        return result;
    }

};

AlbumService.prototype.updateAlbum = function (userData,userId) {
    var connection = mysqlConn.pool();

    var cols = [{
        name: 'album_name',
        value: userData.username,
        isStringData: true
    }];

    var updateConds = [{
        name: 'id',
        value: userId,
        isStringData: false,
        condition: '='
    }];

    var updateResult = this.userRepository.update('album',connection, cols, updateConds);

    if (updateResult === null) {
        return updateResult;
    } else {
        return {
            code: 40005     //  code for user update fail
        }
    }
};
AlbumService.prototype.deleteAlbum = function (albumId) {
    var connection = mysqlConn.pool();

    var updateConds = [{
        name: 'id',
        value: albumId,
        isStringData: false,
        condition: '='
    }];

    var updateResult = this.userRepository.delete('album',connection, updateConds);

    if (updateResult === null) {
        return updateResult;
    } else {
        return {
            code: 40005     //  code for user update fail
        }
    }
};

exports.AlbumService = AlbumService;
