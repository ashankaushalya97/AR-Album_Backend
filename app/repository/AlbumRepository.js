const {SqlRepository} = require("../data/sqltemplate");
function AlbumRepository() {
    this.tabName = 'album';
    this.cols = [{
        name: 'id',
        type: 'int',
        notNull: true,
        isPrimary: true,
        isAutoIncrement: true,
        isFinal: false
    },{
        name: 'album_name',
        type: 'VARCHAR(255)',
        notNull: true,
        isPrimary: false,
        isFinal: false
    }];

    SqlRepository.call('','album', this.cols, []);
};

AlbumRepository.prototype = Object.create(SqlRepository.prototype);
AlbumRepository.prototype.constructor = AlbumRepository;

exports.AlbumRepository = AlbumRepository;
