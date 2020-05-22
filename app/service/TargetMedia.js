var mysqlConn = require("../db/mysqlconn");

var {TargetMediaRepository} = require("../repository/TargetMediaRepository");

var TargetMedia = function () {
    this._targetMediaRepository = new TargetMediaRepository();
};

TargetMedia.prototype.findByAlbumId = function (albumId) {
    var connection = mysqlConn.pool();

    var cols = [{
        name: 'album_id',
        value: albumId,
        isStringData: false
    }];

    var result = this._targetMediaRepository.findBy("media", connection, cols);

    return result;
};

exports.TargetMedia = TargetMedia;
