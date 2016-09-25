const Sequelize = require('sequelize');
const sequelize = new Sequelize('node_api_codlab', 'root', 'guswns12', {
    host: '183.109.83.141',
    port: 5070,
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
