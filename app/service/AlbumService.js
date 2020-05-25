var mysqlConn = require('../db/mysqlconn');
var {AlbumRepository} = require("../repository/AlbumRepository");

var AlbumService = function () {
    this.albumRepository = new AlbumRepository();
    console.log(this.albumRepository);
};

AlbumService.prototype.registerAlbum = function (userData) {
    return new Promise((resolve, reject) => {
        var connection = mysqlConn.pool();

        var cols = [{
            name: 'album_name',
            value: userData.username,
            isStringData: true
        }];
        console.log(this);

        this.userRepository.insert('album', connection, cols).then(result => {
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

AlbumService.prototype.getAllAlbums = function () {
    return new Promise((resolve, reject) => {
        var connection = mysqlConn.pool();

        this.userRepository.findAll('album', connection).then(result => {
            if (result === null) {
                resolve({
                    code: 40004     // code to user not found
                })
            } else {
                resolve(result);
            }
        });
    })
};

AlbumService.prototype.updateAlbum = function (userData, userId) {
    return new Promise((resolve, reject) => {
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

        this.userRepository.update('album', connection, cols, updateConds).then(updateResult => {
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
AlbumService.prototype.deleteAlbum = function (albumId) {
    return new Promise((resolve, reject) => {
        var connection = mysqlConn.pool();

        var updateConds = [{
            name: 'id',
            value: albumId,
            isStringData: false,
            condition: '='
        }];

        this.userRepository.delete('album', connection, updateConds).then(updateResult => {
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

exports.AlbumService = AlbumService;
