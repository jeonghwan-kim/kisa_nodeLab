"use strict";
const models = require('../../models');
//비지니스 로직을 담당한다.
let users = [{
    id: 1,
    name: 'alice'
}, {
    id: 2,
    name: 'bek'
}, {
    id: 3,
    name: 'chris'
}];

exports.index = (req, res) => {
    models.User.findAll().then(users => {
        res.json(users);
    })
};

exports.show = (req, res) => {
    //id
    const id = parseInt(req.params.id, 10);
    if (!id) { //id 값을 이상한 값을 보내주면 인트형으로 변환하는 과정에서 NaN(Not a Number)가 들어간다.
        return res.status(400).json({
            error: "Invalid id"
        }); //Bad Request  함수chain기법을 사용
    }

    models.User.findOne({
        where: {
            id: id
        }
    }).then(user => {
        if (!user) {
            return res.status(404).json({
                error: 'No user'
            });
        }
        res.json(user);
    })

    //users
    // const user = users.filter(user => user.id===id).pop();//순회하면서 배열에 담긴 객체를 하나씩 가지고온다.
    //
    // //filter를 사용하면 배열을 가지고오게되는데 배열의 0번째는 id가 동일한 user가 들어갈것이다.
    //
    // //유저를 찾지 못하면 undefiend
    // if(!user){//undefiend
    //   res.status(404).json({error:'No user'});
    //   return;
    // }

    //resposne

};

exports.destroy = (req, res) => {
    //id
    const id = parseInt(req.params.id, 10);
    if (!id) { //id 값을 이상한 값을 보내주면 인트형으로 변환하는 과정에서 NaN(Not a Number)가 들어간다.
        return res.status(400).json({
            error: "Invalid id"
        }); //Bad Request  함수chain기법을 사용
    }

    models.User.destroy({
        where: {
            id: id
        }
    }).then((result) => {
        console.log(result); //삭제 된 데이터의 카운트를 가지고 온다.
        parseInt(result, 10)>0?res.status(204).json({count:result}):res.status(404).json({error:'No user'});
    });

    //index
    // const userIndex=users.findIndex(function(user){
    //   return user.id===id;
    // });

    // if(userIndex===-1){
    //   return res.status(404).json({error:'No user'});
    // }

    //remove
    //users.splice(userIndex,1);//Index 부터 몇개를 삭제할것인지.

    //response
};


exports.create = (req, res) => {
    const name = req.body.name.trim() || false;
    if (!name) {
        return res.status(400)
            .json({
                error: 'Invalid name'
            });
    }

    //  const id = users.reduce((maxId, user) => {
    //    return user.id > maxId ? user.id : maxId;
    //  }, 0) + 1;
    //
    //  const newUser = {
    //    id: id,
    //    name: name
    //  };
    //
    //  users.push(newUser);

    models.User.create({
        name: name
    }).then(newUser => {
        res.status(201).json(newUser);
    });
};

exports.update = (req, res) => {
    const name = req.body.name.trim() || false;
    if (!name) {
        return res.status(400).json({
            error: "Invalid name"
        }); //이름값이 들어오지 않으면 유효하지 않는 이름이라는 에러가나온다.
    }

    const id = parseInt(req.params.id, 10);

    if (!id) { //name과 마찬가지
        return res.status(400).json({
            error: "Invalid id"
        });
    }

    models.User.update({
        name: name
    }, {
        where: {
            id: id
        },
        returning: true
    }).then(result => {
        res.status(203).json({
            success: "update complete"
        }); //수정된 status와 result수정된데이터를 보내줌
    });
}
