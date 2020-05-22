const {SqlRepository} = require("../data/sqltemplate");
function TargetMediaRepository() {
    this.tabName = 'media';
    this.cols = [{
        name: 'id',
        type: 'int',
        notNull: true,
        isPrimary: true,
        isAutoIncrement: true,
        isFinal: false
    }, {
        name: 'target_img',
        type: 'varbinary(max)',
        notNull: true,
        isPrimary: false,
        isFinal: false
    }, {
        name: 'source_media',
        type: 'varbinary(max)',
        notNull: true,
        isPrimary: false,
        isFinal: false
    }, {
        name: 'album_id',
        type: 'int',
        notNull: true,
        isPrimary: false,
        isFinal: true
    }];

    SqlRepository.call('','media', this.cols, []);
};

TargetMediaRepository.prototype = Object.create(SqlRepository.prototype);
TargetMediaRepository.prototype.constructor = TargetMediaRepository;

exports.TargetMediaRepository = TargetMediaRepository;
