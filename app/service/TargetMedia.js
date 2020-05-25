var mysqlConn = require("../db/mysqlconn");

var {TargetMediaRepository} = require("../repository/TargetMediaRepository");

var TargetMedia = function () {
    this._targetMediaRepository = new TargetMediaRepository();
};

TargetMedia.prototype.findByAlbumId = function (albumId) {
    return new Promise((resolve, reject) => {
        var connection = mysqlConn.pool();

        var cols = [{
            name: 'album_id',
            value: albumId,
            isStringData: false
        }];

        this._targetMediaRepository.findBy("media", connection, cols).then(result => {
            resolve(result);
        });
    })
};

exports.TargetMedia = TargetMedia;
