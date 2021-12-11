module.exports = function () {
    var db = require('../db_config.js');
    var express = require('express');
    var router = express.Router();
    router.use(express.json());

    // 금융상품 추천
    // 주식상품 추천
    router.get(`/allSavingList`, function (req, res) {
        db.query(`SELECT * FROM saving_product`, function (error, result) {
            if (error) throw error;
            else {
                if (result.length === 0) console.log("주식상품이 없습니다.");
                else {
                    //console.log(result);
                    res.send(result)
                }
            }
        })
    })

    // 내 주식상품 추천
    router.get(`/mySavingList`, function (req, res) {
        db.query(`SELECT mbti FROM user WHERE user_id = ?`, [global_id], function (error1, mbti) {
            if (error1) throw error1;
            else {
                var userMbti = mbti[0].mbti.substr(1, 1);
                db.query(`SELECT * FROM saving_product WHERE mbti = ?`, [userMbti], function (error2, result) {
                    if (error2) throw error2;
                    else {
                        //console.log(result);
                        res.send(result);
                    }
                })
            }
        })
    })

    // 펀드상품 추천
    router.get(`/allFundList`, function (req, res) {
        console.log("금융상품 글로벌아이디", global_id);
        db.query(`SELECT * FROM fund_product`, function (error, result) {
            if (error) throw error;
            else {
                if (result.length === 0) console.log("펀드상품이 없습니다.");
                else {
                    //console.log(result);
                    res.send(result);
                }
            }
        })
    })

    // 내 펀드상품 추천
    router.get(`/myFundList`, function (req, res) {
        global_id = req.query.userID;
        db.query(`SELECT mbti FROM user WHERE user_id = ?`, [global_id], function (error1, mbti) {
            if (error1) throw error1;
            else {
                var userMbti = mbti[0].mbti.substr(0, 1);
                console.log(userMbti);
                db.query(`SELECT * FROM fund_product WHERE mbti = ?`, [userMbti], function (error2, result) {
                    if (error2) throw error2;
                    else {
                        //console.log(result);
                        res.send(result);
                    }
                })
            }
        })
    })

    // 연금상품 추천
    router.get(`/allPensionList`, function (req, res) {
        db.query(`SELECT * FROM pension_product`, function (error, result) {
            if (error) throw error;
            else {
                if (result.length === 0) console.log("연금상품이 없습니다.");
                else {
                    //console.log(result);
                    res.send(result);
                }
            }
        })
    })

    // 내 연금상품 추천
    router.get(`/myPensionList`, function (req, res) {
        db.query(`SELECT mbti FROM user WHERE user_id = ?`, [global_id], function (error1, mbti) {
            if (error1) throw error1;
            else {
                var userMbti = mbti[0].mbti.substr(0, 1);
                db.query(`SELECT * FROM pension_product WHERE mbti = ?`, [userMbti], function (error2, result) {
                    if (error2) throw error2;
                    else {
                        //console.log(result);
                        res.send(result);
                    }
                })
            }
        })
    })
    
    // 대출상품 추천 (나에게 맞는 상품 찾기 없음)
    router.get(`/allLoanList`, function (req, res) {
        db.query(`SELECT * FROM loan_product`, function (error, result) {
            if (error) throw error;
            else {
                if (result.length === 0) console.log("대출상품이 없습니다.");
                else {
                    //console.log(result);
                    res.send(result);
                }
            }
        })
    })

    return router;
}