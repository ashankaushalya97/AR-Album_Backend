var {TargetMedia} = require("../service/TargetMedia");


var express = require('express');
var router = express.Router();

router.get('', (req, res) => {
    var _tm = new TargetMedia();
    var albumId = req.query.albumId;

    _tm.findByAlbumId(albumId).then(resp => {
        res.send(resp);
    });

});

module.exports = router;
