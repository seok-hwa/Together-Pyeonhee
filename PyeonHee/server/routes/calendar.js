module.exports = function () {
    var db = require('../config_db.js');
    var express = require('express');
    var router = express.Router();
    router.use(express.json());

    // 캘린더 데이터
    router.get(`/calendar`, function (req, res) {
        console.log(req.query.userID)
        var userID = req.query.userID;
        db.query(`SELECT tran_date, inout_type,  sum(tran_amt) as daily_amount FROM real_expense 
                WHERE user_id = ? AND inout_type = '출금' GROUP BY tran_date; `, [userID], function (error1, result1) {
            if (error1) throw error1;
            else if (result1 != 0) {
                // console.log(result1);
                db.query(`SELECT tran_date, inout_type, sum(tran_amt) as daily_amount FROM real_expense 
                        WHERE user_id = ? AND inout_type = '입금' GROUP BY tran_date; `, [userID], function (error2, result2) {
                    if (error2) throw error2;
                    // console.log(result2);
                    data = {
                        in: result2,
                        out: result1
                    };
                    console.log(data);
                    res.send(data);
                });
            }
        })
    });


    // 캘린더 클릭시
    router.get(`/calendar/click`, function (req, res) {
        console.log(req.query.userID);
        console.log(req.query.today);
        var userID = req.query.userID;
        var today = req.query.today;
        db.query(`SELECT print_content,tran_type, inout_type, tran_amt FROM real_expense WHERE user_id = ?  AND tran_date = ?;`, [userID, today], function (error, result) {
            console.log(result);
            if (error) throw error;
            else if (result != 0) {
                console.log(result);
                res.send(result);
            }
            else {
                res.send([]);
            }
        });
    });


    return router;
}