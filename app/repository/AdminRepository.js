const {SqlRepository} = require("../data/sqltemplate");
function AdminRepository() {
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
        name: 'email',
        type: 'VARCHAR(255)',
        notNull: true,
        isPrimary: false,
        isFinal: false
    }, {
        name: 'password',
        type: 'VARCHAR(255)',
        notNull: true,
        isPrimary: false,
        isFinal: true
    }];

    SqlRepository.call('','testingHi', this.cols, []);
};

AdminRepository.prototype = Object.create(SqlRepository.prototype);
AdminRepository.prototype.constructor = AdminRepository;

exports.AdminRepository = AdminRepository;
