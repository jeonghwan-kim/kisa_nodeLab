const Sequelize = require('sequelize');
const config = require('./config/environment');
const sequelize = new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password, {
    host: config.mysql.host,
    port: config.mysql.port,
    pool: {
        max: 5,
        min: 0,
        idle: 10000 //접속 후 얼마나 시간을 줄지
    }
});

const User = sequelize.define('user', {
    name: Sequelize.STRING
});

module.exports = {
    sequelize: sequelize,
    User: User
}
