const app = require('../app');
const syncDatabase = require('./sync-database');

app.listen(3000, () => {//디비 연결과 서버 설정
  console.log('Example app listening on port 3000!');

  syncDatabase().then(()=> {
      console.log(Database sync);
  });
});
