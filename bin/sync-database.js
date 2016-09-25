const models = require('../models');

module.exports = () => {
  return models.sequelize.sync({force:true});//false로 해놓으면 데이터가 다 날라가기 때문에 true로 바꿔서 테스트를 진행해야한다.
}
