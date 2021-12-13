module.exports = function () {
    var db = require('../db_config.js');
    var config = require('../config.js');
    var express = require('express');
    var router = express.Router();
    const nodemailer = require('nodemailer');
    router.use(express.json());

    // 상담사 매칭 서비스
    router.post(`/requestMatching`, function (req, res) {
        var userID = req.body.userID;
        var counselorName = req.body.counselorName;
        var counselor_id = req.body.counselor_id;
        db.query(`SELECT phone, total_point FROM user WHERE user_id = ?`, [userID], function (error, result) {
            if (error) throw error;
            else {
                db.query(`select email from AssetCounselor where counselor_id = ? 
                        union select email from FinancialCounselor where counselor_id = ?`, [counselor_id, counselor_id], function (err, email) {
                    if (err) throw err;
                    else {
                        var toemail = email[0].email;
                        var phone = result[0].phone;
                        var point = result[0].total_point;
                        if (point > 500) {
                            var text = '편히가계 사용자가 ' + counselorName + ' 상담사님 에게 상담 매칭을 신청했습니다.' + '\n\n' + '사용자의 연락처 : ' + phone + '\n\n' + '빠른 시일내 연락 바랍니다. 감사합니다.' + '\n' + '편히가계 드림.';
                            point = point - 500;
                            db.query(`Update user SET total_point = ? WHERE user_id = ?`, [point, userID], function (error1, result1) {
                                if (error1) throw error1;
                                else {
                                    db.query(`insert into point(user_id, diff, description) values(?, 500, '상담사 매칭 결제')`, [userID], function (error2, result2) {
                                        if (error2) throw error2;
                                        else {
                                            let transporter = nodemailer.createTransport({
                                                service: 'gmail',
                                                host: 'smtp.gmail.com',
                                                port: 587,
                                                secure: false,
                                                auth: {
                                                    user: config.email,
                                                    pass: config.password,
                                                },
                                            });
                                            let info = transporter.sendMail({
                                                from: `"Pyeonhee" <${config.email}>`,
                                                to: toemail,
                                                subject: 'Counselor Matching!',
                                                text: text,
                                                //html: `<b>${text}</b>`,
                                            });

                                            console.log('이메일 전송');
                                            res.status(200).json({
                                                status: 'success',
                                                code: 200,
                                                message: 'Sent Auth Email',
                                            });
                                        }
                                    })
                                }
                            })
                        }
                        else {
                            data = {
                                status: 'lowBalance'
                            };
                            res.send(data);
                        }
                    }
                })

            }
        })
    })

    //금융 상담사 정렬
    router.get('/FinancialProduct', function (req, res) {
        db.query(`SELECT * FROM FinancialCounselor ORDER BY like_count DESC`, function (error, result) {
            if (error) throw error;
            else {
                console.log(result);
                res.send(result);
            }
        })
    });

    //자산 상담사 정렬 
    router.get('/AssetManagement', function (req, res) {
        db.query(`SELECT * FROM AssetCounselor ORDER BY like_count DESC`, function (error, result) {
            if (error) throw error;
            else {
                console.log(result);
                res.send(result);
            }
        })
    });

    //상담사 카테고리 별로
    router.post('/FinancialProduct/Category', function (req, res) {
        var category = req.body.categoryName;

        db.query(`SELECT * FROM FinancialCounselor WHERE part =? ORDER BY like_count DESC`, [category], function (error, result) {
            if (error) throw error;
            else {
                console.log(result);
                res.send(result);
            }
        })
    });

    // 좋아요 여부 확인
    router.post('/FinancialConsultLike', function (req, res) {
        console.log(req.body);
        var userID = req.body.userID;
        var counselorID = req.body.counselorID;
        db.query(`SELECT EXISTS (SELECT * FROM FinancialconsultLike WHERE user_id = ? and counselor_id = ? and like_check = 1 limit 1) as success`,
            [userID, counselorID], function (error, result) {
                if (error) throw error;
                else {
                    console.log(result[0].success, "존재하면 1 없으면 0");
                    if (result[0].success == 1) {
                        db.query(`DELETE FROM FinancialconsultLike WHERE user_id =? AND counselor_id = ?`, [userID, counselorID], function(error1, result1){
                            if (error1) throw error1;
                            else{
                                db.query(`SELECT like_count FROM FinancialCounselor WHERE counselor_id = ?`, [counselorID], function(error3, result3){
                                    if(error3) throw error3;
                                    else{
                                        var count = result3[0].like_count - 1;
                                        db.query(`UPDATE FinancialCounselor SET like_count = ? WHERE counselor_id = ?`, [count, counselorID], function(error4, result4){
                                            if(error4) throw error4;
                                            else{
                                                console.log("좋아요를 취소했습니다.");
                                                const data = {
                                                    status: false,
                                                }
                                                res.send(data);
                                            }
                                        })
                                    }
                                
                                })
                                
                            }
                        })
                    }
                    else {
                        db.query(`INSERT INTO FinancialconsultLike(user_id, counselor_id) VALUES(? ,?);`, [userID, counselorID], function(error2, result2){
                            if(error2) throw error2;
                            else{
                                db.query(`SELECT like_count FROM FinancialCounselor WHERE counselor_id = ?`, [counselorID], function(error3, result3){
                                    if(error3) throw error3;
                                    else{
                                        var count = result3[0].like_count + 1;
                                        db.query(`UPDATE FinancialCounselor SET like_count = ? WHERE counselor_id = ?`, [count, counselorID], function(error4, result4){
                                            if(error4) throw error4;
                                            else{
                                                console.log("좋아요를 눌렀습니다.");
                                                const data = {
                                                    status: true,
                                                }
                                                res.send(data);
                                            }
                                        })
                                    }
                                
                                })
                            }
                        })
                        
                    }
                }
            });
    });

    router.post('/AssetConsultLike', function (req, res) {
        //console.log(req.body);
        var userID = req.body.userID;
        var counselorID = req.body.counselorID;
        db.query(`SELECT EXISTS (SELECT * FROM AssetconsultLike WHERE user_id = ? and counselor_id = ? and like_check = 1 limit 1) as success`,
            [userID, counselorID], function (error, result) {
                if (error) throw error;
                else {
                    if (result[0].success == 1) {
                        db.query(`DELETE FROM AssetconsultLike WHERE user_id =? AND counselor_id = ?`, [userID, counselorID], function(error1, result1){
                            if (error1) throw error1;
                            else{
                                db.query(`SELECT like_count FROM AssetCounselor WHERE counselor_id = ?`, [counselorID], function(error3, result3){
                                    if(error3) throw error3;
                                    else{
                                        var count = result3[0].like_count - 1;
                                        db.query(`UPDATE AssetCounselor SET like_count = ? WHERE counselor_id = ?`, [count, counselorID], function(error4, result4){
                                            if(error4) throw error4;
                                            else{
                                                const data = {
                                                    status: false,
                                                }
                                                res.send(data);
                                            }
                                        })
                                    }
                                
                                })
                                
                            }
                        })
                    }
                    else {
                        db.query(`INSERT INTO AssetconsultLike(user_id, counselor_id) VALUES(?, ?);`, [userID, counselorID], function(error2, result2){
                            if(error2) throw error2;
                            else{
                                db.query(`SELECT like_count FROM AssetCounselor WHERE counselor_id = ?`, [counselorID], function(error3, result3){
                                    if(error3) throw error3;
                                    else{
                                        var count = result3[0].like_count + 1;
                                        db.query(`UPDATE AssetCounselor SET like_count = ? WHERE counselor_id = ?`, [count, counselorID], function(error4, result4){
                                            if(error4) throw error4;
                                            else{
                                                const data = {
                                                    status: true,
                                                }
                                                res.send(data);
                                            }
                                        })
                                    }
                                
                                })
                            }
                        })
                        
                    }
                }
            });
    });

    /*
    //상담사 세부정보 받아오기 
    router.get('/FinancialProduct/Detail', function (req, res) {
        var consultNumber = req.query.consultNumber;
        if (consultNumber >= 20000) {
            db.query(`SELECT * FROM AssetCounselor WHERE counselor_id =?`, [consultNumber], function (error, result) {
                if (error) throw error;
                else {
                    console.log(result);
                    res.send(result);
                }
            });
        }
        else {
            db.query(`SELECT * FROM FinancialCounselor WHERE counselor_id =?`, [consultNumber], function (error, result) {
                if (error) throw error;
                else {
                    console.log(result);
                    res.send(result);
                }
            });
        }
    });
    */
    return router;
}
