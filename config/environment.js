const environments = {
  development: {
    mysql: {
      username: 'root',
      password: 'guswns12',
      database: 'node_api_codlab',
      host:'183.109.83.141',
      port:5070
    }
  },

  test: {//NODE_ENV를 실행환경에서 설정해주면 test가 실행이된다. 
    mysql: {
      username: 'root',
      password: 'guswns12',
      database: 'node_api_codlab',
      host:'183.109.83.141',
      port: 5070
    }
  },

  production: {

  }
}

const nodeEnv = process.env.NODE_ENV || 'development';

module.exports = environments[nodeEnv];
