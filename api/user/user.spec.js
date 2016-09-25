//스펙이라는 이름을 가진애들은 테스트 코드다

//특정기능에 대한 성능을 확인할 수 있기 때문에 명칭을 다음과 같이 사용한다.
const should = require('should'); //노드에서 제공해주는 밸리데이터
const request = require('supertest');
const app = require('../../app');
const syncDatabase = require('../../bin/sync-database');
const models = require('../../models');

describe.skip('GET /users', () => { //GET users를 테스트 하기 위한 테스트 환경
    // body...

    it('should return 200 status code', (done) => {
        //should.equal(true, true);//두 값이 같으면 성공
        //(true).should.be.equal(true);
        request(app)
            .get('/users')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;

                res.body.should.be.instanceOf(Array);
                res.body.should.be.have.length(3);
                res.body.forEach(user => {
                    user.should.have.properties('id', 'name');
                    user.id.should.be.a.Number();
                    user.name.should.be.a.String();
                });
                done();
            });
    });
});

describe('GET /users', () => {
    const users = [{
        name: 'alice2'
    }, {
        name: 'bek2'
    }, {
        name: 'chris2'
    }];

    before('insert 3 users into database', done => {
        models.User.bulkCreate(users).then(() => done());
    })

    it('should return 200 status code', done => {
        request(app)
            .get('/users')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;

                res.body.should.be.instanceOf(Array);
                res.body.should.be.have.length(3);
                res.body.forEach(user => {
                    user.should.have.properties('id', 'name');
                    user.id.should.be.a.Number();
                    user.name.should.be.a.String();
                    console.log(user); //데이터 확인
                });
                done();
            });
    });


});

describe('GET /users/:id', () => {
    it('should return user object', done => {
        request(app)
            .get('/users/2')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                res.body.should.have.properties('id', 'name');
                res.body.id.should.be.a.Number();
                res.body.name.should.be.a.String();
                console.log(res.body);
                done();
            });
    });

    it('should return 400 on invalid id', done => {
        request(app)
            .get('/users/abs')
            .expect(400)
            .end((err, res) => {
                if (err) throw err;
                res.body.should.have.property('error');
                done();
            });
    });

    it('should return 404 on no ', done => {
        request(app)
            .get('/users/4')
            .expect(404)
            .end((err, res) => {
                if (err) throw err;
                res.body.should.have.property('error');
                done();
            });
    });
})

describe('GET /users', () => {

    it('should return 200 status code', done => {
        request(app)
            .get('/users')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;

                res.body.should.be.instanceOf(Array);
                res.body.should.be.have.length(3);
                res.body.forEach(user => {
                    user.should.have.properties('id', 'name');
                    user.id.should.be.a.Number();
                    user.name.should.be.a.String();
                    console.log(user); //데이터 확인
                });
                done();
            });
    });
});

describe('DELETE /users/:id', () => {
    it('should return 204 status code', done => {
        request(app)
            .delete('/users/2')
            .expect(204)
            .end((err, res) => {
                if (err) throw err;
                console.log(res.body);
                done();
            });
    });

    it('should return 400 status code', done => {
        request(app)
            .delete('/users/abc')
            .expect(400)
            .end((err, res) => {
                if (err) throw err;
                res.body.should.have.property('error');
                done();
            });
    });

    it('should return 404 status code', done => {
        request(app)
            .delete('/users/4')
            .expect(404)
            .end((err, res) => {
                if (err) throw err;
                res.body.should.have.property('error');
                done();
            });
    });

    before('sync database', (done) => {
        syncDatabase().then(() => done());
    });
});

describe('GET /users', () => {


    it('should return 200 status code', done => {
        request(app)
            .get('/users')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;

                res.body.should.be.instanceOf(Array);
                //res.body.should.be.have.length(3);
                res.body.forEach(user => {
                    user.should.have.properties('id', 'name');
                    user.id.should.be.a.Number();
                    user.name.should.be.a.String();
                    console.log(user); //데이터 확인
                });
                done();
            });
    });


});

describe.skip('POST /users', () => {
    // body...
    const name = "psfss";
    it('should return 201 status code', (done) => {
        //should.equal(true, true);//두 값이 같으면 성공
        //(true).should.be.equal(true);
        request(app)
            .post('/users')
            .send({
                name: name
            })
            .expect(201)
            .end((err, res) => {
                if (err) throw err;

                res.body.should.have.properties('id', 'name');
                res.body.name.should.be.equal(name);

                done();
            });
    });

    it('should return 400 with empty name ', done => {
        request(app)
            .post('/users')
            .send({
                name: '         '
            })
            .expect(400)
            .end((err, res) => {
                if (err) throw err;
                res.body.should.have.properties('error');
                done();
            });
    })
});
