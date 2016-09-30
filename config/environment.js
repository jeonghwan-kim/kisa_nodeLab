const environments = {
  development: {
    mysql: {
      username: 'root',
      password: 'root',
      database: 'node_api_codelab_dev',
      host:'127.0.0.1',
      port: 3306
    }
  },

  test: {//NODE_ENV를 실행환경에서 설정해주면 test가 실행이된다.
    mysql: {
      username: 'root',
      password: 'root',
      database: 'node_api_codelab_test',
      host:'127.0.0.1',
      port: 3306
    }
  },

  production: {

  }
}

const nodeEnv = process.env.NODE_ENV || 'development';

module.exports = environments[nodeEnv];
