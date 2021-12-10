//로그인 및 아이디/비밀번호 찾기
module.exports = function () {
    const bcrypt = require('bcrypt');
    var db = require('../db_config.js');
    var express = require('express');
    var router = express.Router();
    router.use(express.json());

    // 로그인 기능 (LoginScreen.js)
    router.post('/login', function (req, res) {
        console.log(req.body);
        var userID = req.body.userID;
        var userPassword = req.body.userPassword;
        var deviceToken = req.body.deviceToken;
        global_id = req.body.userID;
        db.query(`SELECT * FROM user WHERE user.user_id=?`, [userID], function (error, result) {
            //console.log(result[0]);

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
                        db.query(`UPDATE user SET deviceToken = ? WHERE user_id = ?`,
                            [deviceToken, userID], function (error, result) {
                                if (error) throw error;
                                console.log("디바이스 토큰값 저장 완료");
                            });
                        const data = {
                            status: 'success',
                            userID: result[0].user_id,
                            userMbti: result[0].mbti,
                            userAge: result[0].age,
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

    // 아이디 찾기
    router.post('/findID', function (req, res) {
        var userName = req.body.userName;
        var userPhone = req.body.userPhone;
        db.query(`SELECT user_id FROM user WHERE name = ? AND phone = ?`, [userName, userPhone], function (error, result) {
            if (error) throw error;
            else {
                console.log(result);
                if (result.length === 0) {
                    data = {
                        userID: '',
                        status: 'failed',
                    }
                    console.log(data);
                    res.send(data);
                }
                else {
                    console.log(result[0]);
                    var userID = result[0].user_id;
                    data = {
                        userID: userID,
                        status: 'success',
                    }
                    console.log(data);
                    res.send(data);
                }
            }
        })
    });

    // 비밀번호 찾기
    router.post('/passwordUpdate', function (req, res) {
        var userID = req.body.userID;
        var userPassword = req.body.userPassword;
        const encryptedPassowrd = bcrypt.hashSync(userPassword, 10)
        console.log(encryptedPassowrd);
        db.query(`UPDATE user SET password = ? WHERE user_id = ?`, [encryptedPassowrd, userID], function (error, result) {
            if (error) throw error;
            else {
                console.log("비밀번호가 변경되었습니다.");
                data = {
                    status: 'success',
                }
                res.send(data);
            }
        })
    })



    return router;
}
