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

  test: {
    mysql: {
      username: 'root',
      password: 'guswns12',
      database: 'node_api_codelab_test',
      host:'183.109.83.141',
      port: 5070
    }
  },

  production: {

  }
}

const nodeEnv = process.env.NODE_ENV || 'development';

module.exports = environments[nodeEnv];
