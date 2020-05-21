const {SqlRepository} = require("../data/sqltemplate");
function UserRepository() {
    this.tabName = 'admin';
    this.cols = [{
        name: 'id',
        type: 'int',
        notNull: true,
        isPrimary: true,
        isAutoIncrement: true,
        isFinal: false
    },{
        name: 'username',
        type: 'VARCHAR(255)',
        notNull: true,
        isPrimary: false,
        isFinal: false
    }, {
        name: 'password',
        type: 'VARCHAR(255)',
        notNull: true,
        isPrimary: false,
        isFinal: false
    }];

    SqlRepository.call('','user', this.cols, []);
};

UserRepository.prototype = Object.create(SqlRepository.prototype);
UserRepository.prototype.constructor = UserRepository;

exports.UserRepository = UserRepository;
