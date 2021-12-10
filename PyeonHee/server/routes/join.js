//회원가입 및 설문조사
module.exports = function () {
    var db = require('../config_db.js');
    var express = require('express');
    var router = express.Router();
    router.use(express.json());

    // 회원가입 기능 (JoinScreen.js)
    router.post('/signUp', function (req, res) {
        console.log(req.body)
        var userID = req.body.userID;
        var userPassword = req.body.userPassword;
        var userName = req.body.userName;
        var userPhone = req.body.userPhone;
        // user table null 값 여부 변경 후 수정 예정
        const encryptedPassowrd = bcrypt.hashSync(userPassword, 10)
        console.log(encryptedPassowrd);
        db.query(`SELECT * FROM user WHERE user.user_id=?`, [userID], function (error1, check) {
            console.log(check);
            if (error1) throw error1;
            else {
                if (check.length === 0) {
                    db.query(`insert into user(user_id, password, name, phone)
                                values (?, ?, ?, ?)`, [userID, encryptedPassowrd, userName, userPhone], function (error2, result) {
                        console.log(result);
                        if (error2) throw error2;
                        else {
                            db.query(`insert into daily_data(user_id, available_money, daily_spent_money, rest_money)
                                    values(?, 0, 0, 0)`, [userID], function (error2, check) {
                                const data = {
                                    status: 'success',
                                }
                                console.log(data);
                                res.send(data);
                            });

                        }
                    });
                }
                else {
                    const data = {
                        status: 'failed',
                    }
                    console.log(data);
                    res.send(data);
                }
            }
        });
    });


    // mbti진행
    router.get('/getMbti', function (req, res) {
        var userID = req.query.userID;
        db.query(`SELECT mbti FROM user WHERE user_id = ?`, [userID], function (error, result) {
            if (error) throw error;
            else {
                if (result[0].mbti != null) {
                    const data = {
                        status: 'true',
                    }
                    res.send(data);
                }
                else {
                    const data = {
                        status: 'false',
                    }
                    res.send(data);
                }
            }
        });
    });


    // 설문조사 진행후 MBTI 제시
    router.post('/submitMbti', function (req, res) {
        console.log('여기부터', req.body)
        var userID = req.body.userID;
        var userAge = req.body.userAge;
        var mbti_type = '';
        var first_type = req.body.mbti1Score;
        var second_type = req.body.mbti2Score;
        var third_type = req.body.mbti3Score;
        var fourth_type = req.body.mbti4Score;
        var userIncome = req.body.userMonthlyIncome;
        var userJob = req.body.userJob;
        var description = '';

        if (first_type > 50) {
            mbti_type = mbti_type + 'I';
            description = description + '당신은 계획적으로 사전에 생각하고 소비하기보다 필요에 맞춰서 그때그때 사용하는 편입니다. ';
        } else {
            mbti_type = mbti_type + 'P';
            description = description + '당신은 소비하기전에 계획했던 범위에서 벗어나지 않도록 사전에 생각하고 사용하는 편입니다. ';
        }

        if (second_type < 50) {
            mbti_type = mbti_type + 'C';
            description = description + '수입이 생기면 저금보다 일단 필요한 부분에 있어서 소비하고 현재를 즐기는 것을 선호하시네요. ';
        } else {
            mbti_type = mbti_type + 'H';
            description = description + '수입이 생기면 당장 필요한 것들을 소비하기보다 미래를 위해 저금을 해 모으는 것을 선호하십니다. ';
        }

        if (third_type < 50) {
            mbti_type = mbti_type + 'S';
            description = description + '종종 본인 스스로에게 선물을 해주기도 하고 가끔 좋아하는 음식을 먹으며 스트레스를 푸시네요. ';
        } else {
            mbti_type = mbti_type + 'O';
            description = description + '종종 친구들에게 해줄 선물들을 고르면서 좋아하는 반응을 보며 즐기시는 편이시네요. ';
        }

        if (fourth_type > 50) {
            mbti_type = mbti_type + 'E';
            description = description + '소비를 크게 차지하는 부분은 쇼핑을 위주로 하기보다 취미나 사람들을 만나고 경험적인 일을 쌓는데 주로 사용하십니다. ';
        } else {
            mbti_type = mbti_type + 'M';
            description = description + '소비를 크게 차지하는 부분은 취미나 사람들을 만나는데 주로 사용하시기보다 기분전환을 위해 쇼핑을 하시는 것을 좋아하십니다. ';
        }

        console.log(mbti_type);
        console.log(description);

        db.query(`UPDATE user SET mbti = ? 
                WHERE user.user_id = ?`, [mbti_type, userID], function (error, result1) {
            if (error) throw error;
            console.log(result1);
        });
        db.query(`UPDATE user SET age = ? 
                WHERE user.user_id = ?`, [userAge, userID], function (error, result2) {
            if (error) throw error;
            console.log(result2);
        });
        db.query(`UPDATE user SET income = ? 
                WHERE user.user_id = ?`, [userIncome, userID], function (error, result3) {
            if (error) throw error;
            console.log(result3);
        });
        db.query(`UPDATE user SET job = ? 
                WHERE user.user_id = ?`, [userJob, userID], function (error, result4) {
            if (error) throw error;
            console.log(result4);
        });
        const data = {
            status: true,
            mbtiType: mbti_type,
            description: description
        };
        console.log(data);
        res.send(data);
    });

    return router;
}
