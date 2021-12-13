//마이페이지 (로그아웃 포함)
module.exports = function () {
    var db = require('../db_config.js');
    var express = require('express');
    var router = express.Router();
    router.use(express.json());

    //마이페이지
    router.get('/myInfo', function (req, res) {
        console.log(req.query.userID);
        var userID = req.query.userID;
        db.query(`SELECT * FROM user WHERE user_id = ?`, [userID], function (error3, result3) {
            if (error3) throw error3;
            else {
                var userMbti = result3[0].mbti;
                var description = '';
                if (userMbti[0] === 'I') description = description + '당신은 계획적으로 사전에 생각하고 소비하기보다 필요에 맞춰서 그때그때 사용하는 편입니다. ';
                else if (userMbti[0] === 'P') description = description + '당신은 소비하기전에 계획했던 범위에서 벗어나지 않도록 사전에 생각하고 사용하는 편입니다. ';

                if (userMbti[1] === 'C') description = description + '수입이 생기면 저금보다 일단 필요한 부분에 있어서 소비하고 현재를 즐기는 것을 선호하시네요. ';
                else if (userMbti[1] === 'H') description = description + '수입이 생기면 당장 필요한 것들을 소비하기보다 미래를 위해 저금을 해 모으는 것을 선호하십니다. ';

                if (userMbti[2] === 'S') description = description + '종종 본인 스스로에게 선물을 해주기도 하고 가끔 좋아하는 음식을 먹으며 스트레스를 푸시네요. ';
                else if (userMbti[2] === 'O') description = description + '종종 친구들에게 해줄 선물들을 고르면서 좋아하는 반응을 보며 즐기시는 편이시네요. ';

                if (userMbti[3] === 'E') description = description + '소비를 크게 차지하는 부분은 쇼핑을 위주로 하기보다 취미나 사람들을 만나고 경험적인 일을 쌓는데 주로 사용하십니다. ';
                else if (userMbti[3] === 'H') description = description + '소비를 크게 차지하는 부분은 취미나 사람들을 만나는데 주로 사용하시기보다 기분전환을 위해 쇼핑을 하시는 것을 좋아하십니다. ';

                const data = {
                    userName: result3[0].name,
                    userTier: result3[0].tier,
                    userStamp: result3[0].total_stamp,
                    userPoint: result3[0].total_point,
                    userMbti: result3[0].mbti,
                    description: description,
                }
                console.log(data);
                res.send(data);
            }
        });
    });

    //로그아웃(디바이스 토큰 삭제)
    router.get('/removeDeviceToken', function (req, res) {
        var userID = req.query.userID;
        db.query(`UPDATE user SET deviceToken = null WHERE user_id = ?`,
            [userID], function (error, result) {
                if (error) throw error;
                const data = {
                    status: 'success',
                }
                res.send(data);
            });
    });

    // 개인정보 수정 정보 불러오기
    router.get('/load', function (req, res) {
        var userID = req.query.userID;
        db.query(`SELECT age, job FROM user WHERE user_id = ?`, [userID], function (error, result) {
            if (error) throw error;
            else {
                if (result.length === 0) {
                    console.log("개인정보가 없습니다.");
                }
                else {
                    data = {
                        userJob: result[0].job,
                        userAge: result[0].age,
                    }
                    console.log(data);
                    res.send(data);
                }
            }
        })
    });

    // 개인정보 수정 비밀번호 확인
    router.post(`/checkPassword`, function (req, res) {
        var userID = req.body.userID;
        var userPassword = req.body.userPassword;
        db.query(`SELECT password FROM user WHERE user.user_id=?`, [userID], function (error, result) {
            if (error) throw error;
            else {
                if (result.length === 0) {
                    const data = {
                        status: 'failed',
                    }
                    console.log(data);
                    res.send(data);
                }
                else {
                    const same = bcrypt.compareSync(userPassword, result[0].password);
                    if (same) {
                        const data = {
                            status: 'success',
                        };
                        console.log(data);
                        res.send(data);
                    }
                    else {
                        const data = {
                            status: 'failed',
                        }
                        console.log(data);
                        res.send(data);
                    }
                }
            }
        });
    });

    // 개인정보 수정
    router.post(`/update`, function (req, res) {
        console.log(req.body);
        var userID = req.body.userID;
        var userAge = parseInt(req.body.userAge);
        var userJob = req.body.userJob;
        db.query(`UPDATE user SET age = ?, job = ? WHERE user_id = ?`, [userAge, userJob, userID], function (error, result) {
            if (error) throw error;
            else {
                data = {
                    status: 'success',
                }
                console.log("개인정보 수정이 완료되었습니다.");
                res.send(data);
            }
        })
    });

    return router;
}